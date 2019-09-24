export class SingleParticle {
    isAlive: boolean = false
    LIFE: number = 1
    countLife: number
    scalesize: number = 0.02
    size: number = 0
    speed = 1
    velocity: Vector3 = new Vector3(0, 0.0075, 0)
    acceleration: Vector3 = Vector3.Zero()

    entity: Entity
    transform: Transform
    constructor(shape: Shape, material: Material) { //INITIATE PARTICLE
        this.isAlive = false

        this.entity = new Entity()
        this.entity.addComponent(shape)
        this.entity.addComponent(material)

        this.entity.addComponent(new Transform({
            position: Vector3.Zero(),
            scale: Vector3.Zero()
        }))

        //this.entity.addComponent(new Billboard(false, true, false))

        this.transform = this.entity.getComponent(Transform)
        engine.addEntity(this.entity)
    }
    act(position: Vector3) {    //ACTIVATE PARTICLE
        this.transform.position = position
        this.countLife = this.LIFE

        this.isAlive = true
        //log("ACTIVATED", this.isAlive)
    }
    deact() {                   //DEACTIVATE PARTICLE
        this.isAlive = false
        //log("DEACTIVATED", this.isAlive)
    }
    simplePhysic() {
        this.transform.scale.setAll(this.size)
        this.transform.position.addInPlace(this.velocity)
        this.velocity.addInPlace(this.acceleration)
    }
    particleRule(dt: number) {
        //RULE
        this.countLife -= dt * this.speed
        this.size = this.countLife / this.LIFE * this.scalesize
        if (this.countLife < 0) {
            this.transform.scale.setAll(0)
            this.deact()
        }
    }
    update(dt: number) {
        if (this.isAlive) {
            this.simplePhysic()
            this.particleRule(dt)
        }
    }
}


export class ParticleSys {
    totalParticle: number
    interval: number
    countInterval: number
    particles: SingleParticle[] = []

    sysStop: boolean = false
    origin: Vector3
    area: number

    constructor(
        origin: Vector3,
        totalParticle: number,
        interval: number,
        shape: Shape,
        material: Material,
        area: number
    ) {
        this.totalParticle = totalParticle
        this.interval = interval
        this.countInterval = interval
        this.origin = origin
        this.createEntity(totalParticle, shape, material)
        this.area = area
    }
    createEntity(totalParticle, shape, material) {
        for (let i = 0; i < totalParticle; i++) {
            this.particles.push(new SingleParticle(shape, material))
            engine.addSystem(this.particles[i])
        }
    }
    getEntityIndex() {
        let i: number
        for (i = 0; i < this.particles.length; i++) {
            if (this.particles[i].isAlive === false) {
                return i
            }
        }

        return null
    }
    addSingleParticle() {
        const index = this.getEntityIndex()
        if (index === null) return

        //log(index)
        this.particles[index].act(this.origin.add(
            new Vector3(
                (Math.random() - Math.random()) * this.area,
                0,
                (Math.random() - Math.random()) * this.area
            )))
    }
    stopSystem() {
        this.sysStop = true

        for (let i = 0; i < this.particles.length; i++)
            this.particles[i].speed = 0.25
    }
    update(dt: number) {
        this.countInterval -= dt
        if (!this.sysStop) {
            if (this.countInterval < 0) {
                this.countInterval = this.interval
                //log("TRYING ADD PARTICLE")
                this.addSingleParticle()
            }
        }
        else {
            let allParticleGone = true
            for (let i = 0; i < this.particles.length; i++) {
                if (this.particles[i].isAlive) {
                    allParticleGone = false
                    break
                }
            }
            if (allParticleGone) {
                for (let i = 0; i < this.particles.length; i++) {
                    engine.removeEntity(this.particles[i].entity)
                }
                //log("all is gone")
                engine.removeSystem(this)
            }
        }
    }
}
