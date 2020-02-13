import { sendNFT } from './loot'
import { NotificationSystem } from './uiNotifications'

export type Props = {
  visible?: boolean
  collectPointId: string
  campaignId: string
  onOpen?: Actions
  onTreasure?: Actions
}

const errorMessageCanvas = new UICanvas()
errorMessageCanvas.visible = true
const message = new UIText(errorMessageCanvas)
export const uiSystem = new NotificationSystem(message)
engine.addSystem(uiSystem)

export default class Crate implements IScript<Props> {
  openClip = new AudioClip('f5291efe-2cbd-4882-9485-25bd2d0b8fb0/sounds/open.mp3')

  active: Record<string, boolean> = {}

  init() {}

  toggle(entity: Entity, value: boolean, playSound = true) {
    if (this.active[entity.name] === value || this.active[entity.name] == true)
      return

    if (playSound) {
      const source = new AudioSource(this.openClip)
      entity.addComponentOrReplace(source)
      source.playing = true
    }

    const animator = entity.getComponent(Animator)
    const openClip = animator.getClip('open')

    openClip.stop()

    openClip.play()

    this.active[entity.name] = value
  }

  spawn(host: Entity, props: Props, channel: IChannel) {
    const door = new Entity(host.name + '-button')
    door.setParent(host)

    const animator = new Animator()
    const openClip = new AnimationState('open', { looping: false })
    animator.addClip(openClip)
    door.addComponent(animator)
    openClip.stop()

    door.addComponent(new GLTFShape('f5291efe-2cbd-4882-9485-25bd2d0b8fb0/models/TreasureHunt_Chest.glb'))

    if (!props.visible) {
      door.getComponent(GLTFShape).visible = false
    }

    door.addComponent(
      new OnPointerDown(
        () => {
          const newValue = !this.active[door.name]
          this.toggle(door, newValue)
          if (newValue) {
            sendNFT(props, channel)
            channel.sendActions(props.onOpen)
          }

          sendNFT(props, channel)
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'OPEN',
          distance: 6
        }
      )
    )

    this.active[door.name] = false

    // UI
    message.vAlign = 'center'
    message.hAlign = 'center'
    message.hTextAlign = 'center'
    message.adaptWidth = true
    message.fontSize = 25
    message.color = Color4.FromHexString(`#F6F6F6DD`)
    message.visible = false

    channel.handleAction('show', ({ sender }) => {
      if (sender === channel.id) {
        door.getComponent(GLTFShape).visible = true
      }
    })
    channel.handleAction('hide', ({ sender }) => {
      if (sender === channel.id) {
        door.getComponent(GLTFShape).visible = false
      }
    })
  }
}
