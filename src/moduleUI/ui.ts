import { journalPage } from "./pageModel"
import { gameUI } from "./UIgroup"
import { GateOrValveHit } from "./objraydetection"

export class UI {
    constructor(positions: Vector3[]) {
        for (let i = 0; i < positions.length; i++) {
            journalPage[i].addToScene(positions[i])
            journalPage[i].addParticleSys()
        }
    }
    /*
     * static getAudioState() {
        return gameUI.getAudioState()
    }
    */
}

export class HintUI {
    constructor() {
        engine.addSystem(new GateOrValveHit())
    }
}
