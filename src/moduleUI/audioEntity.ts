import resources from "./UIresources"

const camera = Camera.instance

class audioPage {
    entity: Entity
    audioSource: AudioSource
    constructor(pageNumber: number) {
        this.entity = new Entity()
        this.entity.addComponent(new Transform({
			position: new Vector3(0, 0, 0)
        }))
        engine.addEntity(this.entity)
        this.audioSource = resources.audio[pageNumber]
        this.entity.addComponent(this.audioSource)
        this.audioSource.volume = 1
        this.audioSource.playing = false
        this.audioSource.loop = false
    }
    update(dt: number) {
        //log(camera.position)
        this.entity.getComponent(Transform).position.copyFrom(camera.position)
        this.entity.getComponent(Transform).position.x -= 8
        this.entity.getComponent(Transform).position.y -= 3
        this.entity.getComponent(Transform).position.z -= 2
    }
    act() {
        engine.addSystem(this)
        this.audioSource.playing = true
    }
    deact() {
        engine.removeSystem(this)
        this.audioSource.playing = false
    }
}

export const audioPages =[
	new audioPage(0),
	new audioPage(1),
	new audioPage(2),
	new audioPage(3),
	new audioPage(4),
	new audioPage(5),
	new audioPage(6),
	new audioPage(7),
	new audioPage(8),
	new audioPage(9)
]

/*
audioPages[0].act()

setTimeout(() => {
	audioPages[0].deact()
}, 30000)
*/