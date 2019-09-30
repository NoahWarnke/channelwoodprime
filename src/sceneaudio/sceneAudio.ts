import resources from "./audioResources"

const camera = Camera.instance

export class AudioAmbient {
    entity: Entity
    audioSource: AudioSource
    constructor() {
        this.entity = new Entity()
        this.entity.addComponent(new Transform({
            position: new Vector3(0, 0, 0)
        }))
        engine.addEntity(this.entity)
        this.audioSource = resources.audio.dayAmbient
        this.entity.addComponent(this.audioSource)
        this.audioSource.volume = 1
        this.audioSource.playing = true
        this.audioSource.loop = true
        engine.addSystem(this)
    }
    update(dt: number) {
        this.entity.getComponent(Transform).position.copyFrom(camera.position)
        //audio adjustment
        this.entity.getComponent(Transform).position.x -= 8
        this.entity.getComponent(Transform).position.y -= 3
        this.entity.getComponent(Transform).position.z -= 2
    }
}

export class AudioWindmill {
    entity: Entity
    audioSource: AudioSource
    constructor() {
        this.entity = new Entity()
        this.entity.addComponent(new Transform({
            position: new Vector3(11, 4, 12)
        }))
        engine.addEntity(this.entity)
        this.audioSource = resources.audio.windMill
        this.entity.addComponent(this.audioSource)
        this.audioSource.volume = .6
        this.audioSource.playing = true
        this.audioSource.loop = true

        //audio adjustment
        this.entity.getComponent(Transform).position.x -= 8
        this.entity.getComponent(Transform).position.y -= 3
        this.entity.getComponent(Transform).position.z -= 2
    }
}
