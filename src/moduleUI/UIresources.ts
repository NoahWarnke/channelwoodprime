export default {
    texture: {
        //JOURNAL IMAGE
        pageTexture: [
            new Texture("models/journalPage/page1.png"),
            new Texture("models/journalPage/page2.png"),
            new Texture("models/journalPage/page3.png"),
            new Texture("models/journalPage/page4.png"),
            new Texture("models/journalPage/page5.png"),
            new Texture("models/journalPage/page6.png"),
            new Texture("models/journalPage/page7.png"),
            new Texture("models/journalPage/page8.png"),
            new Texture("models/journalPage/page9.png"),
            new Texture("models/journalPage/page10.png")
        ],

        journalBackground: new Texture("models/journalPage/JournalBackground.png"),
        journalBlocker: new Texture("models/journalPage/JournalBlocker.png"),

        //GENERAL SETTING & INFO
        //iconJournalCurrent: new Texture("images/UI/Icon_Journal_Current.png"),
        //iconJournalSummary: new Texture("models/journalPage/Icon_Journal_Summary32.png"),
        //iconAudioOn: new Texture("images/UI/Icon_Audio_ON.png"),
        //iconAudioOff: new Texture("images/UI/Icon_Audio_OFF.png"),
        //iconSave: new Texture("images/UI/Icon_Save.png"),

        //JOURNAL PAGE CONTROL
        //iconClose: new Texture("models/journalPage/Icon_Close32.png"),
        //iconPrev: new Texture("images/UI/Icon_Prev.png"),
        //iconNext: new Texture("images/UI/Icon_Next.png"),

        //HELPER
        //helperLeftRight: new Texture("images/UI/Icon_LeftRight.png")
    },
    //3D MODEL
    model: {
        journalPageModel: new GLTFShape("models/journalPage/journalPage.gltf")
    },
    //AUDIO
    audio: [
        new AudioSource(new AudioClip("sounds/page1.mp3")),
        new AudioSource(new AudioClip("sounds/page2.mp3")),
        new AudioSource(new AudioClip("sounds/page3.mp3")),
        new AudioSource(new AudioClip("sounds/page4.mp3")),
        new AudioSource(new AudioClip("sounds/page5.mp3")),
        new AudioSource(new AudioClip("sounds/page6.mp3")),
        new AudioSource(new AudioClip("sounds/page7.mp3")),
        new AudioSource(new AudioClip("sounds/page8.mp3")),
        new AudioSource(new AudioClip("sounds/page9.mp3")),
        new AudioSource(new AudioClip("sounds/page10.mp3"))
    ]

}