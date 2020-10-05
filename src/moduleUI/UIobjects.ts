import UIresources from "./UIresources";

class SingleUI {
    uiImage: UIImage
    parent: any
    textureImg: Texture
    sourceLeft: number
    sourceTop: number
    sourceWidth: number
    sourceHeight: number
    width: number
    height: number
    positionX: number
    positionY: number

    constructor(
        parent: any,
        textureImg: Texture,
        sourceLeft: number,
        sourceTop: number,
        sourceWidth: number,
        sourceHeight: number,
        width: number,
        height: number,
        positionX: number,
		positionY: number
    ) {
        this.parent = parent
        this.textureImg = textureImg
        this.uiImage = new UIImage(parent, textureImg)
        this.uiImage.name = ''
        this.uiImage.hAlign = 'left'
        this.uiImage.vAlign = 'top'
        this.uiImage.sourceLeft = sourceLeft
        this.uiImage.sourceTop = sourceTop
        this.uiImage.sourceWidth = sourceWidth
        this.uiImage.sourceHeight = sourceHeight
        this.uiImage.width = width
        this.uiImage.height = height
        this.uiImage.positionX = positionX
        this.uiImage.positionY = positionY

        this.uiImage.isPointerBlocker = true
        this.uiImage.visible = false

        this.sourceLeft = sourceLeft
        this.sourceTop = sourceTop
        this.sourceWidth = sourceWidth
        this.sourceHeight = sourceHeight
        this.width = width
        this.height = height
        this.positionX = positionX
        this.positionY = positionY
        this.uiImage.visible = true
    }
    show() {
        this.parent.visible = true
    }
    hide() {
        this.parent.visible = false
    }
    changeImage(texture: Texture) {
        this.uiImage.source = texture
    }
    changePosAndScale(pX: number, pY: number, scale: number) {
        this.uiImage.positionX = pX
        this.uiImage.positionY = pY
        this.uiImage.width = this.width * scale
        this.uiImage.height = this.height * scale
    }
    toDefaultPos() {
        this.uiImage.positionX = this.positionX
        this.uiImage.positionY = this.positionY
        this.uiImage.width = this.width
        this.uiImage.height = this.height
    }
}

class PageUI extends SingleUI {
    isLock: boolean = true
    constructor(
        parent: any,
        textureImg: Texture,
        sourceLeft: number,
        sourceTop: number,
        sourceWidth: number,
        sourceHeight: number,
        width: number,
        height: number,
        positionX: number,
        positionY: number
    ) {
        super(parent, textureImg, sourceLeft, sourceTop, sourceWidth, sourceHeight,
            width, height, positionX, positionY)
        this.uiImage.visible = false
    }
    unlockPage() {
        this.isLock = false
    }
    show() {
        if (!this.isLock) {
            this.uiImage.visible = true
            this.parent.visible = true
        }
    }
    hide() {
        this.uiImage.visible = false
        this.parent.visible = false
    }
}

class HintUI extends SingleUI {
    constructor(
        parent: any,
        textureImg: Texture,
        sourceLeft: number,
        sourceTop: number,
        sourceWidth: number,
        sourceHeight: number,
        width: number,
        height: number,
        positionX: number,
        positionY: number
    ) {
        super(parent, textureImg, sourceLeft, sourceTop, sourceWidth, sourceHeight,
            width, height, positionX, positionY)

        this.uiImage.hAlign = 'center'
        this.uiImage.vAlign = 'center'
        this.uiImage.isPointerBlocker = false
        this.uiImage.visible = true
    }
    show() {
        this.uiImage.visible = true
        //this.parent.visible = true
    }
    hide() {
        this.uiImage.visible = false
        //this.parent.visible = false
    }
}

//-----------------CREATE UI-------------------//

export const canvas = new UICanvas()
canvas.visible = true

export const rectPage = new UIContainerRect(canvas) //for individual pages
createRect(rectPage, 1)

export const rectJournal = new UIContainerRect(canvas) //for journal summary
createRect(rectJournal, 1)

export const rectIcon = new UIContainerRect(canvas) //for icon in the bottom
createRect(rectIcon, 1)
rectIcon.visible = true

export const rectHint = new UIContainerRect(canvas) //for hint gate and valve
createRect2(rectHint, 1)
rectHint.visible = true

//create collection of UIImage individual page
const pages: PageUI[] = []
for (let i = 0; i < 10; i++) {
    pages.push(
        new PageUI(rectPage, UIresources.texture.pageTexture[i],
            0, 0, 512, 512, 512, 625, 450, 0)
    )
}
const journalPage = {
    pages: pages,
    closeBtn: new SingleUI(rectPage, UIresources.texture.journalBackground,
        49, 475, 48, 48, 80, 80, 350, -10)
}

//create background for journal
const journalBackground = new SingleUI(rectJournal, UIresources.texture.journalBackground,
    0, 0, 512, 473, 920, 550, 425, -5)

//create thumbnail pages for journal
let xOffset: number = 460
let yOffset: number = -60
let scale: number = 0.3
const journalThumbnail: SingleUI[] = []
for (let i = 0; i < 10; i += 1) {
    journalThumbnail.push(
        new SingleUI(rectJournal, UIresources.texture.journalBlocker,
            0, 0, 512, 512,
            512 * scale,
            700 * scale,
            ((i) % 5) * 175 + xOffset,
            (Math.floor((i) / 5)) * -230 + yOffset)
    )
    //journalThumbnail[i].show()
}
const JournalSummary = {
    parent: rectJournal,
    background: journalBackground,
    journalThumbnail: journalThumbnail,
    closeBtn: new SingleUI(rectJournal, UIresources.texture.journalBackground,
        49, 475, 48, 48, 80, 80, 350, -10)
}

let journalSummaryBtn = new SingleUI(rectIcon, UIresources.texture.journalBackground,
    0, 475, 48, 48, 80, 80, 425, -645)
//let audioBtnOn = new SingleUI(rectIcon, UIresources.texture.iconAudioOn, 0, 0, 64, 64, 64, 64, 600, -650)
//let audioBtnOff = new SingleUI(rectIcon, UIresources.texture.iconAudioOff, 0, 0, 64, 64, 64, 64, 600, -650)
//audioBtnOff.uiImage.visible = false
//audioBtnOn.uiImage.visible = false

//create hint UI
let valveHint = new HintUI(rectHint, UIresources.texture.journalBackground,
    90, 474, 50, 50, 48, 48, -2, 32)
let gateHint = new HintUI(rectHint, UIresources.texture.journalBackground,
   140, 474, 50, 50, 48, 55, 3, 32)

valveHint.hide()
gateHint.hide()

export default {
    UIObjects: {
        journalPage: journalPage,
        journalSummary: JournalSummary,
        Icon: {
            journalSummaryBtn: journalSummaryBtn,
            //audioBtnOff: audioBtnOff,
            //audioBtnOn: audioBtnOn
        },
        hint: {
            valveHint: valveHint,
            gateHint: gateHint
        }
    }
}

function createRect(rect, opac){
    rect.adaptHeight = true
    rect.adaptWidth = true
    rect.hAlign = 'left'
    rect.vAlign = 'top'
    rect.positionX = 0
    rect.opacity = opac
    rect.visible = false
    return rect
}
function createRect2(rect: UIContainerRect, opac) {
    rect.height = '100%'
    rect.width = '100%'
    rect.hAlign = 'center'
    rect.vAlign = 'center'
    rect.opacity = opac
    rect.visible = false
    rect.isPointerBlocker = false
    return rect
}