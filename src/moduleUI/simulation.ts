import { journalPage } from "./pageModel"
import { gameUI } from "./UIgroup"

//journalPage is indexed 0 to 9

//placing journalPage 1 to 10 in scene and add particle if needed

for (let i = 0; i < 10; i++) {
        journalPage[i].addToScene(new Vector3((i + 1) * 1.5 + 16, .15, 6))
        journalPage[i].addParticleSys()
}

//get audio state from audio button UI
log("AUDIO STATE: ", gameUI.getAudioState())