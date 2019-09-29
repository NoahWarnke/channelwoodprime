import UIclasses, { rectJournal } from "./UIobjects"
import UIresources from "./UIresources";
import { audioPages } from "./audioEntity"

export const gameUI = (function () {
    let pageUIActive = false
    let activePage: number
    let journalUIActive = false
    let audioState: boolean
    return {
        logIsLock() {
            for (let i = 0; i < 10; i++) {
                log("PART ", i + 1, UIclasses.UIObjects.journalPage.pages[i].isLock)
            }
        },
        setAudioState(state: boolean) {
            audioState = state
        },
        getAudioState() {
            return audioState
        },
        unlockPage(i: number) {
            //UPDATE THUMBNAIL
            UIclasses.UIObjects.journalSummary.journalThumbnail[i - 1]
                .changeImage(UIresources.texture.pageTexture[i - 1])
            //SHOWING JOURNAL
            UIclasses.UIObjects.journalPage.pages[i - 1].unlockPage()
            UIclasses.UIObjects.journalPage.pages[i - 1].show()

            audioPages[i - 1].act()

            //log("UNLOCK JOURNAL")
            pageUIActive = true
            activePage = i
        },
        showJournalSummary() {
            if (pageUIActive) {
                //log("hide, ", activePage)
                gameUI.hidePage()
            }

            UIclasses.UIObjects.journalSummary.parent.visible = true

            journalUIActive = true
        },
        hideJournalSummary() {
            UIclasses.UIObjects.journalSummary.parent.visible = false

            journalUIActive = false
        },
        showPage(i: number) {
            if (pageUIActive) {
                gameUI.hidePage()
            }
            if (journalUIActive) {
                gameUI.hideJournalSummary()
                journalUIActive = true
            }

            UIclasses.UIObjects.journalPage.pages[i - 1].show()
            audioPages[i - 1].act()

            pageUIActive = true
            activePage = i
        },
        hidePage() {
            //log("hide page, ", activePage)

            UIclasses.UIObjects.journalPage.pages[activePage - 1].hide()
            audioPages[activePage - 1].deact()

            pageUIActive = false

            if (journalUIActive) {
                gameUI.showJournalSummary()
            }
        }
    }
}())