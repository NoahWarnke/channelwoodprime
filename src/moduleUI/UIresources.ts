export default {
    texture: {
        //JOURNAL IMAGE
        pageTexture: [
            new Texture("images/UI/Page1.png"),
            new Texture("images/UI/Page2.png"),
            new Texture("images/UI/Page3.png"),
            new Texture("images/UI/Page4.png"),
            new Texture("images/UI/Page5.png"),
            new Texture("images/UI/Page6.png"),
            new Texture("images/UI/Page7.png"),
            new Texture("images/UI/Page8.png"),
            new Texture("images/UI/Page9.png"),
            new Texture("images/UI/Page10.png")
        ],

        journalBackground: new Texture("images/UI/JournalBackground.png"),
        journalBlocker: new Texture("images/UI/JournalBlocker.png"),

        //GENERAL SETTING & INFO
        //iconJournalCurrent: new Texture("images/UI/Icon_Journal_Current.png"),
        iconJournalSummary: new Texture("images/UI/Icon_Journal_Summary.png"),
        iconAudioOn: new Texture("images/UI/Icon_Audio_ON.png"),
        iconAudioOff: new Texture("images/UI/Icon_Audio_OFF.png"),
        //iconSave: new Texture("images/UI/Icon_Save.png"),

        //JOURNAL PAGE CONTROL
        iconClose: new Texture("images/UI/Icon_Close.png"),
        //iconPrev: new Texture("images/UI/Icon_Prev.png"),
        //iconNext: new Texture("images/UI/Icon_Next.png"),

        //HELPER
        helperLeftRight: new Texture("images/UI/Icon_LeftRight.png")
    },
    //3D MODEL
    model: {
        journalPageModel: new GLTFShape("models/journalPage/journalPage.gltf")
    }

}