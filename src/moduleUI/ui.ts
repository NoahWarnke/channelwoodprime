import { journalPage } from "./pageModel"
import { gameUI } from "./UIgroup"

export class UI {
    constructor(positions: Vector3[]) {
        for (let i = 0; i < positions.length; i++) {
            journalPage[i].addToScene(positions[i])
            journalPage[i].addParticleSys()
        }
    }
    static getAudioState() {
        return gameUI.getAudioState()
    }
}