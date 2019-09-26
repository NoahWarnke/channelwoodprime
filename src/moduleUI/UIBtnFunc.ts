import UIclasses from "./UIobjects"
import { gameUI } from "./UIgroup"

//closebutton for pages
UIclasses.UIObjects.journalPage.closeBtn.uiImage.onClick = new OnClick(() => {
    //log("Close Button PAGE Clicked")
    gameUI.hidePage()
})

//closebutton for journal summary
UIclasses.UIObjects.journalSummary.closeBtn.uiImage.onClick = new OnClick(() => {
    //log("Close Button JOURNAL Clicked")
    gameUI.hideJournalSummary()
})

//journal summary button
UIclasses.UIObjects.Icon.journalSummaryBtn.uiImage.onClick = new OnClick(() => {
    //log("Journal Summary Button Clicked")
    gameUI.showJournalSummary()
})

//audio button
UIclasses.UIObjects.Icon.audioBtnOff.uiImage.onClick = new OnClick(() => {
    //log("audio set to ON")
    UIclasses.UIObjects.Icon.audioBtnOn.uiImage.visible = true
    UIclasses.UIObjects.Icon.audioBtnOff.uiImage.visible = false
    gameUI.setAudioState(true)
})
UIclasses.UIObjects.Icon.audioBtnOn.uiImage.onClick = new OnClick(() => {
    //log("audio set to OFF")
    UIclasses.UIObjects.Icon.audioBtnOn.uiImage.visible = false
    UIclasses.UIObjects.Icon.audioBtnOff.uiImage.visible = true
    gameUI.setAudioState(false)
})

//page thumbnail in journal summary
for (let i = 0; i < 10; i += 1) {
    UIclasses.UIObjects.journalSummary.journalThumbnail[i].uiImage.onClick = new OnClick(() => {
        if (!UIclasses.UIObjects.journalPage.pages[i].isLock)
            gameUI.showPage(i + 1)
    })
}