export class NotificationSystem implements ISystem {
  text: UIText
  timer: number = 0
  constructor(text: UIText) {
    this.text = text
    this.timer = 0
  }
  update(dt: number) {
    if (this.timer > 0) {
      //log('UI Showing ', dt)
      this.text.visible = true
      this.timer -= dt
      if (this.timer <= 0) {
        this.text.visible = false
      }
    }
  }

  setMessage(message: string, duration: number) {
    this.text.value = message
    this.timer = duration
  }
}
