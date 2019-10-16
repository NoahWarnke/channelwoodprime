import UIclasses from "./UIobjects"

const camera = Camera.instance
const physicsCast = PhysicsCast.instance

export class GateOrValveHit {
    hitGate = false
    hitValve = false
    update(dt: number) {

        let ray = physicsCast.getRayFromCamera(4)
        let depth = 3
        let count = 0

        physicsCast.hitAll(ray, (e) => {
            if (e.didHit) {
                depth = 3
                count = 0
                this.hitGate = false
                this.hitValve = false
                for (let entityHit of e.entities) {
                    count += 1
                    //log(count)
                    if (engine.entities[entityHit.entity.entityId].hasComponent(GLTFShape)) {
                        if (engine.entities[entityHit.entity.entityId].getComponent(GLTFShape).src === 'models/bridges/gate.glb') {
                            //log(count, "HIT GATE")
                            this.hitGate = true
                            break
                        }
                        else if (engine.entities[entityHit.entity.entityId].getComponent(GLTFShape).src === 'models/pipes/valveOnly.glb'
                            || engine.entities[entityHit.entity.entityId].getComponent(GLTFShape).src === 'models/pipes/pipeEdgeValveA.glb'
                            || engine.entities[entityHit.entity.entityId].getComponent(GLTFShape).src === 'models/pipes/pipeEdgeValveB.glb'
                        ) {
                            //log(count, "HIT VALVE")
                            this.hitValve = true
                            break
                        }
                        else {
                        }
                    }
                    if (count === depth) {
                        this.hitGate = false
                        this.hitValve = false
                        break
                    }
                }
            }
            else {
                this.hitGate = false
                this.hitValve = false
            }
            
        })

        //log("GATE: ", this.hitGate, "VALVE", this.hitValve)
        if (this.hitGate) UIclasses.UIObjects.hint.gateHint.show()
        else UIclasses.UIObjects.hint.gateHint.hide()

        if (this.hitValve) UIclasses.UIObjects.hint.valveHint.show()
        else UIclasses.UIObjects.hint.valveHint.hide()
    }
}