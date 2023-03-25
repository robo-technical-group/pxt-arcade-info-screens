namespace SpriteKind {
    export const InfoScreens = SpriteKind.create()
    export const Moving = SpriteKind.create()
    export const Static = SpriteKind.create()
}

/**
 * Extension for creating information screens (like splash screens and options screens).
 */
/**
 * Enumerations
 */
enum FooterLocation {
    Previous,
    Done,
    Next
}   // enum FooterLocation

/**
 * Used to indicate if images for moving sprites are "pointing" in a particular direction.
 * Images will be flipped so that they appear to be moving in the correct direction.
 */
enum SpriteDirection {
    Both,
    PointsLeft,
    PointsRight
}   // enum SpriteDirection

/**
 * Indicates how moving sprites should be placed and animated on the screen.
 */
enum SpriteMode {
    /**
     * Sprites move horizontally, one at a time, within space between headlines and mid-screen text.
     */
    BlankSpace,

    /**
     * Sprites are all placed on screen and move in random directions, bouncing off of walls.
     */
    Random,

    /**
     * Sprites are all placed on screen and move in random directions;
     * game.onUpdate() will handle off-screen sprites.
     */
    RandomWillUpdate
}   // enum SpriteMode

/**
 * Constants
 */
const DEFAULT_COLOR_BG: number = 15 // Black
const DEFAULT_COLOR_CURSOR: number = 5 // Yellow
const DEFAULT_COLOR_FOOTER: number = 1 // White
const DEFAULT_COLOR_HEADLINE: number = 14 // Brown
const DEFAULT_COLOR_MID_TEXT: number = 9 // Light Blue
const DEFAULT_COLOR_TABS: number = 3 // Pink
const DEFAULT_COLOR_TITLE: number = 5 // Yellow
const DEFAULT_DELAY: number = 5000
const DEFAULT_FONT_SIZE: number = 8
const DEFAULT_FONT_SIZE_FOOTER: number = 8
const DEFAULT_FONT_SIZE_HEADLINE: number = 8
const DEFAULT_FONT_SIZE_MID_TEXT: number = 5
const DEFAULT_FONT_SIZE_TABS: number = 5
const DEFAULT_FONT_SIZE_TITLE: number = 16
const DEFAULT_SPACING: number = 1
const DEFAULT_SPRITE_SPEED: number = 100
const DEFAULT_TEXT_DONE: string = 'Done'
const DEFAULT_TEXT_FOOTER_SPLASH: string = 'Press any button to begin'
const DEFAULT_Y_TITLES: number = 2
// const TAB_TEXT_MARGIN: number = 5 // Pixels to the left and right of tab text
const TEXT_NEXT: string = 'Next >'
const TEXT_PREVIOUS: string = '< Prev'

/**
 * Interfaces
 */
interface CursorOptions {
    /**
     * Color of cursor
     */
    color: number

    /**
     * Current option group where cursor is located
     */
    currGroup: number

    /**
     * Current option where cursor is located
     */
    currOption: number

    /**
     * Whether cursor is in footer
     */
    isInFooter: boolean
}   // interface Cursor

interface MovingSpriteOptions {
    /**
     * Sprite images
     */
    imgs: Image[]

    /**
     * Direction(s) that sprites "point"
     */
    dir: SpriteDirection

    /**
     * Mode to use when displaying sprites
     */
    mode: SpriteMode

    /**
     * Speed to use for moving sprites
     */
    speed: number

    /**
     * Vertical coordinate for static sprites
     */
    y: number
}   // interface MovingSpriteOptions

interface StaticSpriteOptions {
    /**
     * Sprite image
     */
    img: Image

    /**
     * Horizontal coordinate for sprite
     */
    x: number

    /**
     * Vertical coordinate for sprite
     */
    y: number
}   // interface StaticSpriteOptions

/**
 * Abstract class for creating text sprites with common attributes.
 */
abstract class TextSpriteFactory {
    /**
     * Color to use when printing data
     */
    public color: number

    /**
     * Font size to use when printing data
     */
    public fontSize: number

    /**
     * Number of pixels between text and border
     */
    public padding: number

    /**
     * Number of pixels between lines of text
     */
    public spacing: number

    /**
     * Vertical coordinate to use when printing data
     */
    public y: number

    public constructor(color: number, fontSize: number, y: number, spacing: number,
    padding: number) {
        this.color = color
        this.fontSize = fontSize
        this.padding = padding
        this.spacing = spacing
        this.y = y
    }
}   // abstract class TextSpriteFactory

class StringTextSpriteFactory extends TextSpriteFactory {
    public data: string

    protected _sprite: TextSprite = null

    public constructor(
        data: string,
        color: number,
        fontSize: number,
        y: number,
        spacing: number = 1, 
        padding: number = 0
    ) {
        super(color, fontSize, y, spacing, padding)
        this.data = data
        this._sprite = null
    }

    public get sprite(): TextSprite {
        return this._sprite
    }

    public DrawCenter(x: number = 80): void {
        this.CreateSprite()
        this._sprite.x = x
    }

    public DrawLeft(left: number = 1): void {
        this.CreateSprite()
        this._sprite.left = left
    }

    public DrawRight(right: number = 158): void {
        this.CreateSprite()
        this._sprite.right = right
    }

    protected CreateSprite(): void {
        if (this._sprite) {
            this._sprite.destroy()
        }

        this._sprite = textsprite.create(this.data, 0, this.color)
        this._sprite.setMaxFontHeight(this.fontSize)
        this._sprite.padding = this.padding
        this._sprite.top = this.y
    }
}   // class StringTextSpriteFactory

class StringArrayTextSpriteFactory extends TextSpriteFactory {
    public data: string[]

    protected _sprites: TextSprite[]

    public constructor(
        data: string[],
        color: number,
        fontSize: number,
        y: number,
        spacing: number = 1,
        padding: number = 0
    ) {
        super(color, fontSize, y, spacing, padding)
        this.data = data
        this._sprites = []
    }

    public DrawCenter(x: number = 80): void {
        this.CreateSprites()
        for (let s of this._sprites) {
            s.x = x
        }
    }

    public DrawHorizontal(left: number = 1, borders: boolean = false): void {
        this.CreateSprites()
        let currLeft: number = left
        for (let s of this._sprites) {
            s.setBorder(borders ? 1 : 0, borders ? this.color : 0)
            s.left = currLeft
            s.top = this.y
            currLeft += s.width + this.spacing
        }
    }

    public DrawLeft(left: number = 1): void {
        this.CreateSprites()
        for (let s of this._sprites) {
            s.left = left
        }
    }

    public DrawRight(right: number = 158): void {
        this.CreateSprites()
        for (let s of this._sprites) {
            s.right = right
        }
    }

    public Redraw(item: number, reverse: boolean = false) {
        if (this._sprites && this._sprites[item]) {
            let ts: TextSprite = this._sprites[item]
            if (reverse) {
                ts.bg = this.color
                ts.fg = 15
            } else {
                ts.bg = 0
                ts.fg = this.color
            }
            ts.update()
        }
    }

    protected CreateSprites(): void {
        if (this._sprites) {
            if (this._sprites.length > 0) {
                for (let s of this._sprites) {
                    s.destroy()
                }
            }
            this._sprites = []
        } else {
            this._sprites = []
        }

        let currY: number = this.y
        for (let text of this.data) {
            let ts: TextSprite = textsprite.create(text, 0, this.color)
            ts.setMaxFontHeight(this.fontSize)
            ts.padding = this.padding
            ts.top = currY
            this._sprites.push(ts)
            currY += ts.height + this.spacing
        }
    }
}   // class StringArrayTextSpriteFactory

class String2dArrayTextSpriteFactory extends TextSpriteFactory {
    public data: string[][]

    protected _sprites: TextSprite[][] = []

    public constructor(
        data: string[][],
        color: number,
        fontSize: number,
        y: number,
        spacing: number = 1,
        padding: number = 0
    ) {
        super(color, fontSize, y, spacing, padding)
        this.data = data
        this._sprites = []
    }

    public DrawCenter(index: number = 0, x: number = 80, reset: boolean = false): void {
        this.CreateSprites(index, reset)
        for (let s of this._sprites[index]) {
            s.x = x
        }
    }

    public DrawLeft(index: number = 0, left: number = 1, reset: boolean = false): void {
        this.CreateSprites(index, reset)
        for (let s of this._sprites[index]) {
            s.left = left
        }
    }

    public DrawRight(index: number = 0, right: number = 158, reset: boolean = false): void {
        this.CreateSprites(index, reset)
        for (let s of this._sprites[index]) {
            s.right = right
        }
    }

    public Redraw(group: number, item: number, reverse: boolean = false) {
        if (this._sprites && this._sprites[group] && this._sprites[group][item]) {
            let ts: TextSprite = this._sprites[group][item]
            if (reverse) {
                ts.bg = this.color
                ts.fg = 15
            } else {
                ts.bg = 0
                ts.fg = this.color
            }
            ts.update()
        }
    }

    public SetBorder(group: number, item: number, color: number, show: boolean = false) {
        if (this._sprites && this._sprites[group] && this._sprites[group][item]) {
            let ts: TextSprite = this._sprites[group][item]
            if (show) {
                ts.setBorder(1, color)
            } else {
                ts.setBorder(1, 0)
            }
        }
    }

    protected CreateSprites(index: number, reset: boolean): void {
        if (!this.data || this.data.length == 0) {
            return
        }

        if (this._sprites) {
            if (reset && this._sprites.length > 0) {
                for (let group of this._sprites) {
                    for (let s of group) {
                        s.destroy()
                    }
                }
            }
        } else {
            this._sprites = []
        }

        let currY: number = this.y
        this._sprites[index] = []
        for (let text of this.data[index]) {
            let ts: TextSprite = textsprite.create(text, 0, this.color)
            ts.setMaxFontHeight(this.fontSize)
            ts.padding = this.padding
            ts.top = currY
            this._sprites[index].push(ts)
            currY += this.fontSize + 2 * this.padding + this.spacing
        }
    }
}   // interface String2dArrayTextSpriteFactory

//% blockNamespace=infoScreens
class RotatingScreens {
    /**
     * Protected member variables
     */
    protected _backColor: number // background color for screens
    protected _backImage: Image  // user-supplied background image
    protected _currScreen: number // index of image currently shown
    protected _currSprite: number
    protected _footer: StringTextSpriteFactory
    protected _headlines: String2dArrayTextSpriteFactory
    protected _midText: String2dArrayTextSpriteFactory
    protected _titles: StringArrayTextSpriteFactory
    protected _movingSprites: MovingSpriteOptions
    protected _movingSpritesSequential: boolean
    protected _interval: number // interval in milliseconds for screens to rotate
    protected _next: number // next scheduled time to rotate screens
    protected _staticSprites: StaticSpriteOptions[] // container for static sprites

    /**
     * Constructor
     * @param {string[]} titles - Array of strings to display as the title
     * @param {number} titlesColor - Color to use when printing titles
     * @param {string[][]} headlines - Sets of strings to display as headlines
     * @param {number} headlinesColor - Color to use when printing headlines
     * @param {string} footer - Text to print at the bottom of the screen
     * @param {number} footerColor - Color to use when printing footer
     * @param {string[][]} midText - Sets of strings (up to three sets) to display in the center of the screen
     * @param {number} midTextColor - Color to use when printing the mid-text
     * @param {number} backColor - Color to use for the background
     * @param {number} delay - Interval in milliseconds when screens will rotate
     */
    constructor(titles: string[], titlesColor?: number,
        headlines?: string[][], headlinesColor?: number,
        footer?: string, footerColor?: number,
        midText?: string[][], midTextColor?: number,
        backColor?: number, delay?: number
    ) {
        this._currScreen = -1;
        this._currSprite = -1;
        this._backColor = backColor ? backColor : DEFAULT_COLOR_BG
        this._backImage = null
        this._interval = delay ? delay : DEFAULT_DELAY
        this._movingSpritesSequential = true
        this._staticSprites = []

        this._footer = new StringTextSpriteFactory(
            footer ? footer : '',
            footerColor ? footerColor : DEFAULT_COLOR_FOOTER,
            DEFAULT_FONT_SIZE_FOOTER,
            0
        )
        this._headlines = new String2dArrayTextSpriteFactory(
            headlines ? headlines : [],
            headlinesColor ? headlinesColor : DEFAULT_COLOR_HEADLINE,
            DEFAULT_FONT_SIZE_HEADLINE,
            0
        )

        this._midText = new String2dArrayTextSpriteFactory(
            midText ? midText : [],
            midTextColor ? midTextColor : DEFAULT_COLOR_MID_TEXT,
            DEFAULT_FONT_SIZE_MID_TEXT,
            0
        )

        this._titles = new StringArrayTextSpriteFactory(
            titles ? titles : [],
            titlesColor ? titlesColor : DEFAULT_COLOR_TITLE,
            DEFAULT_FONT_SIZE_TITLE,
            DEFAULT_Y_TITLES,
        )

        this._movingSprites = {
            imgs: [],
            dir: SpriteDirection.Both,
            mode: SpriteMode.Random,
            speed: DEFAULT_SPRITE_SPEED,
            y: 0,
        }
    }   // constructor()

    /**
     * Getters and setters
     */
    /**
     * @return {Image} Image used as header or background image
     */
    //% blockId="infoScreens_RotatingScreens_backImage_get"
    //% block="header image"
    //% blockCombine
    //% callInDebugger
    public get backImage(): Image {
        return this._backImage
    }   // get backImage()

    /**
     * @param {Image} value - Image to use as header or background image
     */
    //% blockId="infoScrens_RotatingScreens_backImage_set"
    //% block="header image"
    //% value.shadow="variables_get" value.defl="myImage"
    //% blockCombine
    public set backImage(value: Image) {
        this._backImage = value
    }   // set backImage()

    /**
     * @return {number} Interval in milliseconds when screens will rotate
     */
    //% blockId="infoScreens_RotatingScreens_delay_get"
    //% block="delay (milliseconds)"
    //% blockCombine
    //% callInDebugger
    public get delay(): number {
        return this._interval
    }   // get delay()

    /**
     * @param {number} Interval in milliseconds when screens will rotate
     */
    //% blockId="infoScreens_RotatingScreens_delay_set"
    //% block="delay (milliseconds)"
    //% value.defl=5000
    //% blockCombine
    public set delay(value: number) {
        if (value >= 0) {
            this._interval = value
        } else {
            this._interval = DEFAULT_DELAY
        }   // if (value)
    }   // set delay()

    //% callInDebugger
    public get footer(): StringTextSpriteFactory {
        return this._footer;
    }   // get footer()

    //% callInDebugger
    public get headlines(): String2dArrayTextSpriteFactory {
        return this._headlines;
    }   // get headlines()

    //% callInDebugger
    public get midText(): String2dArrayTextSpriteFactory {
        return this._midText;
    }   // get midText()

    /**
     * @return {number} Number of moving sprites on screen.
     */
    //% blockId="infoScreens_RotatingScreens_movingSpriteCount"
    //% block="count of moving sprites on screen"
    //% blockCombine
    //% hidden
    public get movingSpriteCount(): number {
        return sprites.allOfKind(SpriteKind.Moving).length
    }   // get movingSpriteCount()

    //% callInDebugger
    public get movingSpriteOptions(): MovingSpriteOptions {
        return this._movingSprites;
    }   // get movingSpriteOptions()

    /**
     * @return {SpriteMode} Mode for moving sprites.
     */
    //% blockId="infoScreens_RotatingScreens_movingSpriteMode_get"
    //% block="mode for moving sprites"
    //% blockCombine
    //% hidden
    public get movingSpriteMode(): SpriteMode {
        return this._movingSprites.mode
    }   // get movingSpriteMode()

    /**
     * @param {SpriteMode} value - Mode for moving sprites.
     */
    //% blockId="infoScreens_RotatingScreens_movingSpriteMode_set"
    //% block="mode for moving sprites"
    //% blockCombine
    //% hidden
    public set movingSpriteMode(value: SpriteMode) {
        this._movingSprites.mode = value
    }   // set movingSpriteMode()

    /**
     * @return {number} Next <code>game.runtime()</code> when screens should be rotated;
     *                  call @see #rotate to do so
     */
    //% blockId="infoScreens_RotatingScreens_nextTime"
    //% block="time to rotate"
    //% blockCombine
    //% callInDebugger
    public get nextTime(): number {
        return this._next
    }   // get nextTime()

    /**
     * @return {boolean} Whether sprites will be displayed sequentially or randomly.
     *                   True = in order, false = randomly.
     *                   Only applies to Blank Space mode.
     */
    //% callInDebugger
    public get sequentialSprites(): boolean {
        return this._movingSpritesSequential
    }   // get sequentialSprites()

    /**
     * @param {boolean} value - Whether sprites will be displayed sequentially or randomly.
     *                          True = in order, false = randomly.
     *                          Only applies to Blank Space mode.
     */
    public set sequentialSprites(value: boolean) {
        this._movingSpritesSequential = value
    }   // set sequentialSprites()

    //% callInDebugger
    public get titles(): StringArrayTextSpriteFactory {
        return this._titles;
    }   // get titles()

    /**
     * Public methods
     */

    /**
     * @param {string[]} value - Headlines to add.
     */
    //% blockId="infoScreens.RotatingScreens.addHeadlines"
    //% block="%mySplashScreen|add headlines %value"
    //% value.shadow="variables_get" value.defl="text list"
    public addHeadlines(value: string[]): void {
        this._headlines.data.push(value)
    }   // addHeadlines()

    /**
     * @param {Image} value - Image to add to the collection of moving sprites.
     */
    //% blockId="infoScreens_RotatingScreens_addMovingSprite"
    //% block="%mySplashScreen|add moving image %value"
    //% value.shadow="variables_get" value.defl="myImage"
    public addMovingSprite(value: Image): void {
        this._movingSprites.imgs.push(value)
    }   // addMovingSprite()

    /**
     * @param {string[]} value - Mid-text group to add.
     */
    public addMidText(value: string[]): void {
        this._midText.data.push(value)
    }   // addMidText()

    /**
     * @param {StaticSpriteOptions} value - Sprite and related information to add to
     *                                      the collection of static sprites.
     */
    public addStaticSprite(value: StaticSpriteOptions): void {
        this._staticSprites.push(value)
    }   // addStaticSprite()

	/**
	 * @param {Image} img - Image to use for new static sprite.
	 * @param {number} x - Horizontal coordinate for new sprite.
	 * @param {number} y - Vertical coordinate for new sprite.
	 */
    //% blockId="infoScreens_RotatingScreens_addStaticSprite"
    //% block="%mySplashScreen|add image %img at location x %x y %y"
    //% img.shadow="variables_get" img.defl="myImage"
    //% x.defl=0 y.defl=0
    //% hidden
    public addStaticSpriteImage(img: Image, x: number, y: number): void {
        this._staticSprites.push({
            img: img,
            x: x,
            y: y
        })
    }	// addStaticSpriteImage()

    /**
     * Initializes canvas and creates sprites.
     * Call when ready to present rotating screens after object has been configured.
     */
    //% blockId="infoScreens_RotatingScreens_build"
    //% block="%mySplashScreen|show"
    public build(): void {
        this.rebuild()
        this.refresh()
        if (this._staticSprites.length > 0) {
            this.addStaticSprites()
        }   // if (this._staticSprites)
        switch (this._movingSprites.mode) {
            case SpriteMode.BlankSpace:
                this._currSprite = 0
                this.showScrollingSprite()
                break

            case SpriteMode.Random:
                this.addAllMovingSprites(true)
                break

            case SpriteMode.RandomWillUpdate:
                this.addAllMovingSprites(false)
                break
        }   // switch (this._movingSprites.mode)
    }   // build()

    /**
     * Clears the moving sprites collection.
     */
    public clearMovingSprites(): void {
        this._movingSprites.imgs = []
    }   // clearMovingSprites()

    /**
     * Destroy all moving and static sprites from the game.
     * Call when removing the splash screen from the game.
     */
    //% blockId="infoScreens_RotatingScreens_destroySprites"
    //% block="%mySplashScreen|destroy sprites"
    public destroySprites(): void {
        for (let sprite of sprites.allOfKind(SpriteKind.InfoScreens)) {
            sprite.destroy()
        }
        for (let sprite of sprites.allOfKind(SpriteKind.Moving)) {
            sprite.destroy()
        }   // for (sprite)
        for (let sprite of sprites.allOfKind(SpriteKind.Static)) {
            sprite.destroy()
        }   // for (sprite)
        for (let sprite of sprites.allOfKind(SpriteKind.Text)) {
            sprite.destroy()
        }
    }   // destroySprites()

    /**
     * Initialize canvas.
     * Call after initial build() if configuration changes.
     */
    public rebuild(): void {
        this.createBase()
    }   // rebuild()

    /**
     * Update canvas with the current headline.
     * Set time for next update.
     */
    public refresh(): void {
        if (!this._currScreen || this._currScreen < 0 || this._currScreen >= this._headlines.data.length) {
            this._currScreen = 0
        }   // if (this._currScreen >= this._headlines.length)
        this.headlines.DrawCenter(this._currScreen, 80, true)
        this._next = game.runtime() + this._interval
    }   // refresh()

    /**
     * Destroy all sprites associated with the information screens.
     */
    //% blockId="infoScreens_RotatingScreens_release"
    //% block="%mySplashScreen|destroy resources"
    public release(): void {
        this.destroySprites()
    }   // release()

    /**
     * Update canvas with the next headline.
     */
    //% blockId="infoScreens_RotatingScreens_rotate"
    //% block="%mySplashScreen|rotate"
    public rotate(): void {
        this._currScreen++
        this.refresh()
    }   // rotate()

    /**
     * Set the title text
     */
    //% blockId="infoScreens_RotatingScreens_setTitles"
    //% block="%mySplashScreen|set titles to %value"
    //% value.shadow="variables_get" value.defl="text list"
    //% hidden
    public setTitles(value: string[]): void {
        this._titles.data = value
    }   // setTitles()

    /**
     * Shows the next scrolling sprite in the collection.
     * Call from game.onUpdate()
     */
    //% blockId="infoScreens_RotatingScreens_showScrollingSprite"
    //% block="%mySplashScreen|show next moving image"
    public showScrollingSprite(): void {
        if (this._movingSpritesSequential) {
            this._currSprite++
            if (this._currSprite < 0 || this._currSprite >= this._movingSprites.imgs.length) {
                this._currSprite = 0
            }   // if (this._currSprite > this._movingSprites.length)
        } else {
            this._currSprite = Math.randomRange(0, this._movingSprites.imgs.length - 1)
        }   // if (this._movingSpritesSequential)
        let newSprite: Sprite = sprites.create(this._movingSprites.imgs[this._currSprite].clone(),
            SpriteKind.Moving)
        newSprite.setFlag(SpriteFlag.Ghost, true)
        newSprite.setFlag(SpriteFlag.AutoDestroy, true)
        newSprite.y = this._movingSprites.y
        if (Math.percentChance(50)) {
            // Move sprite left to right
            newSprite.x = -(newSprite.image.width / 2)
            newSprite.vx = this._movingSprites.speed
            if (this._movingSprites.dir === SpriteDirection.PointsLeft) {
                newSprite.image.flipX()
            }   // if (this._movingSprites.dir...)
        } else {
            // Move sprite right to left
            newSprite.x = screen.width + newSprite.image.width / 2
            newSprite.vx = 0 - this._movingSprites.speed
            if (this._movingSprites.dir === SpriteDirection.PointsRight) {
                newSprite.image.flipX()
            }   // if (this._movingSprites.dir...)
        }   // if (Math.percentChance(50))
    }   // showScrollingSprite()

    /**
     * Protected methods
     */

    /**
     * Create moving sprites.
     * @param {boolean} keepOnScreen - True = sprites will bounce off of walls
     *                                 False = game.onUpdate() will handle off-screen sprites
     */
    protected addAllMovingSprites(keepOnScreen: boolean = true): void {
        for (let img of this._movingSprites.imgs) {
            let newSprite: Sprite = sprites.create(img.clone(), SpriteKind.Moving)
            newSprite.setFlag(SpriteFlag.BounceOnWall, keepOnScreen)
            newSprite.setFlag(SpriteFlag.Ghost, true)
            newSprite.x = Math.randomRange(0, screen.width)
            newSprite.y = Math.randomRange(0, screen.height)
            newSprite.vx = Math.randomRange(0, this._movingSprites.speed)
            newSprite.vy = this._movingSprites.speed - newSprite.vx
            if (Math.percentChance(50)) {
                newSprite.vx = 0 - newSprite.vx
            }   // if (Math.percentChance(50))
            if (Math.percentChance(50)) {
                newSprite.vy = 0 - newSprite.vy
            }   // if (Math.percentChance(50))
        }   // for (img)
    }   // addAllMovingSprites()

    /**
     * Create static sprites.
     */
    protected addStaticSprites(): void {
        for (let sprite of this._staticSprites) {
            let newSprite: Sprite = sprites.create(sprite.img.clone(), SpriteKind.Static)
            newSprite.setFlag(SpriteFlag.Ghost, true)
            newSprite.x = sprite.x
            newSprite.y = sprite.y
        }   // for (sprite)
    }   // addStaticSprites()

    /**
     * Draws text and background image on canvas.
     */
    protected createBase(): void {
        this.destroySprites()
        scene.setBackgroundColor(this._backColor)
        if (this._backImage) {
            scene.setBackgroundImage(this._backImage)
        } else {
            scene.setBackgroundImage(null)
        }
        this._titles.DrawCenter()
        this._footer.y = screen.height - (this._footer.fontSize + 2 * this._footer.padding + 2)
        this._footer.DrawCenter()

        // Set initial vertical coordinate for mid-text.
        // Will be adjusted if mid-text exists.
        this._midText.y = screen.height - 10
        if (this._midText.data && this._midText.data.length > 0) {
            this._midText.y = screen.height -
                ((this._midText.fontSize + 1) * (this._midText.data[0].length + 1) + 6)
            switch (this._midText.data.length) {
                case 1:
                    this._midText.DrawCenter(0)
                    break;

                case 2:
                    this._midText.DrawLeft(0)
                    this._midText.DrawLeft(1, screen.width / 2 + 1)
                    break;

                default:
                    this._midText.DrawLeft(0)
                    this._midText.DrawCenter(1)
                    this._midText.DrawLeft(2, screen.width * 2 / 3 + 1)
                    break;
            }   // switch (this._midText.length)
        }   // if (this._midText)

        // Calculate vertical coordinate for headlines.
        if (this._backImage) {
            let minY = this._midText.y - (this._headlines.fontSize + 1) * 2
            if (this._backImage.height > minY) {
                this._headlines.y = minY
            } else {
                this._headlines.y = this._backImage.height
            }   // if (this._backImage.height > minY)
        } else {
            if (this._titles.data) {
                this._headlines.y = this._titles.fontSize * this._titles.data.length + this._titles.data.length +
                    DEFAULT_Y_TITLES + 2
            } else {
                this._headlines.y = DEFAULT_Y_TITLES + 2
            }   // if (this._titles.data)
        }   // if (this._backImage)

        // Calculate vertical coordinate for moving sprites.
        this._movingSprites.y = (this._headlines.y + this._headlines.fontSize * 2 + 1 + this._midText.y) / 2
    }   // createBase()
}   // class RotatingScreens

//% blockNamespace=infoScreens
class SplashScreens extends RotatingScreens {
    /**
     * Protected constants
     */

    /**
     * Constructor
     * @param {string[]} titles - Array of strings to display as the title
     * @param {number} titlesColor - Color to use when printing titles
     * @param {string[][]} headlines - Sets of strings to display as headlines
     * @param {number} headlinesColor - Color to use when printing headlines
     * @param {string[][]} instructions - Sets of strings (up to three sets) to display in the center of the screen
     * @param {number} instructionsColor - Color to use when printing the mid-text
     * @param {number} backColor - Color to use for the background
     * @param {number} delay - Interval in milliseconds when screens will rotate
     */
    constructor(titles: string[], titlesColor?: number,
        headlines: string[][] = null, headlinesColor?: number,
        instructions: string[][] = null, instructionsColor?: number,
        backColor?: number, delay?: number) {
        super(titles,
            titlesColor,
            headlines,
            headlinesColor,
            DEFAULT_TEXT_FOOTER_SPLASH,
            1,
            instructions,
            instructionsColor,
            backColor,
            delay)
    }   // constructor()

    /**
     * Getters and setters
     */
    /**
     * @return {string[][]} Sets (up to three) of strings that will appear in the
     *                      center of the screen
     */
    public get instructions(): string[][] {
        return this._midText.data
    }   // get instructions()

    /**
     * @param {string[][]} value - Sets (up to three) of strings to appear in the
     *                             center of the screen
     */
    public set instructions(value: string[][]) {
        this._midText.data = value
    }   // set instructions()

    /**
     * Add a list of instructions.
     * @param {string[]} value - List of instructions to add to the screen.
     */
    //% blockId=infoScreens_SplashScreens_addInstructionsList
    //% block="%mySplashScreen|add instructions list %value"
    //% value.shadow="variables_get" value.defl="text list"
    public addInstructionsList(value: string[]) {
        this._midText.data.push(value)
    }   // addInstructionsList
}   // class SplashScreens

//% blockNamespace=infoScreens
class OptionScreen extends RotatingScreens {
    /**
     * Protected member variables
     */
    protected _cursor: CursorOptions
    protected _hasHeaders: boolean
    protected _isDone: boolean
    protected _nextSprite: TextSprite
    protected _prevSprite: TextSprite
    protected _selectedOptions: number[]
    protected _showNext: boolean
    protected _showPrevious: boolean

    /**
     * Constructor
     * @param {string[]} titles - Array of strings to display as the title
     * @param {number} titlesColor - Color to use when printing titles
     * @param {string[][]} headlines - Sets of strings to display as headlines
     * @param {number} headlinesColor - Color to use when printing headlines
     * @param {string[][]} options - Sets of strings (up to three sets) to display in the center of the screen
     * @param {number} optionsColor - Color to use when printing the mid-text
     * @param {boolean} hasHeaders - Whether options groups include headers
     * @param {number} backColor - Color to use for the background
     * @param {number} delay - Interval in milliseconds when screens will rotate
     */
    constructor(titles: string[], titlesColor: number = null,
        headlines: string[][] = null, headlinesColor: number = null,
        options: string[][] = null, optionsColor: number = null,
        hasHeaders: boolean = false,
        backColor: number = null, delay: number = null) {
        super(titles, titlesColor, headlines, headlinesColor,
            DEFAULT_TEXT_DONE, null,
            options, optionsColor, backColor, delay)
        this._cursor = {
            color: DEFAULT_COLOR_CURSOR,
            currGroup: 0,
            currOption: 0,
            isInFooter: false
        }
        this._hasHeaders = hasHeaders
        this._isDone = false
        this._showNext = false
        this._showPrevious = false
        this._midText.padding = 1
        this._midText.spacing = 0
        this.buildSelectedOptions()
    }   // constructor()

    /**
     * Getters and setters
     */
    public get cursor(): CursorOptions {
        return this._cursor
    }   // get cursor()

    /**
     * @return {boolean} Whether the user has selected the "done" option
     */
    public get done(): boolean {
        return this._isDone
    }   // get done()

    public set done(value: boolean) {
        this._isDone = value
        if (!value) {
            this.createCursor()
        }   // if (value)
    }   // set done()

    /**
     * @return {string} Text displayed in the "done" button
     */
    public get doneText(): string {
        return this._footer.data
    }   // get doneText()

    /**
     * @param {string} value - Text displayed in the "done" button
     */
    public set doneText(value: string) {
        this._footer.data = value
    }   // set doneText()

    /**
     * @return {string[][]} Option sets (up to three)
     */
    public get options(): string[][] {
        return this._midText.data
    }   // get options()

    /**
     * @param {string[][]} value - Option sets (up to three)
     */
    public set options(value: string[][]) {
        this._midText.data = value
        this.buildSelectedOptions()
    }   // set options()

    /**
     * @return {number[]} Options that the user has selected
     */
    public get selections(): number[] {
        return this._selectedOptions
    }   // get selections()

    /**
     * @return {boolean} Whether the "next" button is displayed
     */
    public get showNext(): boolean {
        return this._showNext
    }   // get showNext()

    /**
     * @param {boolean} value - Whether the "next" button is displayed
     */
    public set showNext(value: boolean) {
        this._showNext = value
    }   // set showNext()

    /**
     * @return {boolean} Whether the "previous" button is displayed
     */
    public get showPrevious(): boolean {
        return this._showPrevious
    }   // get showPrevious()

    /**
     * @param {boolean} value - Whether the "previous" button is displayed
     */
    public set showPrevious(value: boolean) {
        this._showPrevious = value
    }   // set showPrevious()

    /**
     * Public methods
     */

    /**
     * Adds an option array to the screen.
     * Option screens can accommodate up to three groups of options.
     * @param {string[]} option - Option array to add to the screen
     */
    public addOption(option: string[]): void {
        this._midText.data.push(option)
        this.buildSelectedOptions()
    }   // addOption()

    /**
     * @see RotatingScreens#build
     */
    public build(): void {
        super.build()
        this.refreshSelections()
        this.createCursor()
        this._isDone = false
    }   // build()

    /**
     * Gets the selected option for an option group.
     * @param {number} index - Option group of selection to retrieve
     * @return {number} Selected option for the given option group
     */
    public getSelection(index: number = 0): number {
        if (index < 0 || index > this._selectedOptions.length) {
            return -1
        } else {
            return this._selectedOptions[index]
        }   // if (index)
    }   // getOption()

    /**
     * Moves the cursor down to the next option.
     * If the cursor is in the footer, it will move to an option at the top.
     * Call from a controller event handler.
     */
    public moveCursorDown(): void {
        if (this._isDone) {
            return
        }   // if (this._isDone)
        this.updateCursor(false)
        if (this._cursor.isInFooter) {
            this.moveOutOfFooter()
            this._cursor.currOption = 0
        } else {
            this._cursor.currOption++
            let numOptions: number = this._midText.data[this._cursor.currGroup].length
            if (this._hasHeaders) {
                numOptions--
            }   // if (this._hasHeaders)
            if (this._cursor.currOption >= numOptions) {
                this.moveToFooter()
            }   // if (this._cursor.currOption >= numOptions)
        }   // if (this._isInFooter)
        this.updateCursor(true)
    }   // moveCursorDown()

    /**
     * Moves the cursor to the next option group on the left.
     * If the cursor is already in the first option group, it will move to the last group.
     * Call from a controller event handler.
     */
    public moveCursorLeft(): void {
        if (this._isDone) {
            return
        }   // if (this._isDone)
        this.updateCursor(false)
        if (this._cursor.isInFooter) {
            this._cursor.currGroup--
            if (this._cursor.currGroup < FooterLocation.Previous) {
                this._cursor.currGroup = FooterLocation.Next
            }   // if (this._cursor.currGroup < FooterLocation.Previous)
            if (this._cursor.currGroup === FooterLocation.Previous && !this._showPrevious) {
                this._cursor.currGroup = FooterLocation.Next
            }   // if (this._cursor.currGroup === FooterLocation.Previous...)
            if (this._cursor.currGroup === FooterLocation.Next && !this._showNext) {
                this._cursor.currGroup = FooterLocation.Done
            }   // if (this._cursor.currGroup === FooterLocation.Next...)
        } else {
            this._cursor.currGroup--
            if (this._cursor.currGroup < 0) {
                this._cursor.currGroup = this._midText.data.length - 1
            }   // if (this._cursor.currGroup < 0)
        }   // if (this._isInFooter)
        this.updateCursor(true)
    }   // moveCursorLeft()

    /**
     * Moves the cursor to the next option group on the right.
     * If the cursor is already in the last option group, it will move to the first group.
     * Call from a controller event handler.
     */
    public moveCursorRight(): void {
        if (this._isDone) {
            return
        }   // if (this._isDone)
        this.updateCursor(false)
        if (this._cursor.isInFooter) {
            this._cursor.currGroup++
            if (this._cursor.currGroup > FooterLocation.Next) {
                this._cursor.currGroup = FooterLocation.Previous
            }   // if (this._cursor.currGroup > FooterLocation.Next)
            if (this._cursor.currGroup === FooterLocation.Next && !this._showNext) {
                this._cursor.currGroup = FooterLocation.Previous
            }   // if (this._cursor.currGroup === FooterLocation.Next...)
            if (this._cursor.currGroup === FooterLocation.Previous && !this._showPrevious) {
                this._cursor.currGroup = FooterLocation.Done
            }   // if (this._cursor.currGroup === FooterLocation.Previous...)
        } else {
            this._cursor.currGroup++
            if (this._cursor.currGroup >= this._midText.data.length) {
                this._cursor.currGroup = 0
            }   // if (this._cursor.currGroup >= this._midText.length)
        }   // if (this._isInFooter)
        this.updateCursor(true)
    }   // moveCursorRight()

    /**
     * Moves the cursor up to the next option.
     * If the cursor is already in the top option, it will move to the footer.
     * Call from a controller event handler.
     */
    public moveCursorUp(): void {
        if (this._isDone) {
            return
        }   // if (this._isDone)
        this.updateCursor(false)
        if (this._cursor.isInFooter) {
            this.moveOutOfFooter()
            let numOptions: number = this._midText.data[this._cursor.currGroup].length
            if (this._hasHeaders) {
                numOptions--
            }   // if (this._hasHeaders)
            this._cursor.currOption = numOptions - 1
        } else {
            this._cursor.currOption--
            if (this._cursor.currOption < 0) {
                this.moveToFooter()
            }   // if (this._cursor.currOption < 0)
        }   // if (this.isInFooter)
        this.updateCursor(true)
    }   // moveCursorUp()

    /**
     * @see RotatingScreens#refresh
     */
    public refresh() {
        super.refresh()
        this.refreshSelections()
        this.updateCursor(true)
    }   // refresh()

    /**
     * Marks the current option as selected.
     * Call from a controller event handler.
     */
    public select(): void {
        if (this._cursor.isInFooter) {
            if (this._cursor.currGroup === FooterLocation.Done) {
                this.done = true
            }   // if (this._cursorCurrGruop === FooterLocation.Done)
        } else {
            this._selectedOptions[this._cursor.currGroup] = this._cursor.currOption
            this.refresh()
        }   // if (this._isInFooter)
    }   // select()

    /**
     * Sets the selected option for a given option group.
     * @param {number} index - Option group for selection
     * @param {number} value - Option to select; -1 for none
     */
    public setSelection(index: number = 0, value: number = -1): void {
        this._selectedOptions[index] = value
        this.refresh()
    }   // setSelection()

    /**
     * Protected methods
     */

    /**
     * Initializes the selectedOptions array.
     */
    protected buildSelectedOptions(): void {
        this._selectedOptions = []
        for (let index: number = 0; index < this._midText.data.length; index++) {
            this._selectedOptions[index] = -1
        }   // for (index)
    }   // buildSelectedOptions()

    /**
     * @see RotatingScreens#createBase()
     */
    protected createBase() {
        super.createBase()
        if (this._midText != null && this._midText.data.length > 0) {
            for (let index: number = 0; index < this._selectedOptions.length; index++) {
                if (this._selectedOptions[index] > -1) {
                    this.drawSelection(index, this._selectedOptions[index])
                }   // if (this._selectedOptions[index] > -1)
            }   // for (index)
        }   // if (this._midText)
        if (this._showNext) {
            this._nextSprite = textsprite.create(TEXT_NEXT, 0, this._footer.color)
            this._nextSprite.setMaxFontHeight(this._footer.fontSize)
            this._nextSprite.right = 158
            this._nextSprite.top = this._footer.y
            this._nextSprite.setBorder(1, 0)
        }   // if (this._showNext)
        if (this._showPrevious) {
            this._prevSprite = textsprite.create(TEXT_PREVIOUS, 0, this._footer.color)
            this._prevSprite.setMaxFontHeight(this._footer.fontSize)
            this._prevSprite.left = 1
            this._prevSprite.top = this._footer.y
            this._prevSprite.setBorder(1, 0)
        }   // if (this._showPrevious)
    }   // createBase()

    /**
     * Initializes the cursor images and adds the cursor sprite to the screen.
     */
    protected createCursor(): void {
        this.updateCursor()
    }   // createCursor()

    /**
     * Draws the given option as selected (i.e. in reverse)
     * @param {number} group - Option group for selection
     * @param {number} option - Option to draw as selected
     */
    protected drawSelection(group: number, option: number) {
        this._midText.Redraw(group, option, true)
    }   // drawSelection()

    /**
     * Move the cursor out of the footer and to an appropriate option.
     */
    protected moveOutOfFooter(): void {
        this._cursor.isInFooter = false
        switch (this._midText.data.length) {
            case 1:
                this._cursor.currGroup = 0
                break

            case 2:
                if (this._cursor.currGroup === FooterLocation.Previous) {
                    this._cursor.currGroup = 0
                } else {
                    this._cursor.currGroup = 1
                }   // if (this._cursor.currGroup === FooterLocation.Previous)
                break

            default:
            // No change to this._cursor.currGroup
        }   // switch (this._midText.length)
    }   // moveOutOfFooter()

    /**
     * Move the cursor from an option group into the footer.
     */
    protected moveToFooter(): void {
        this._cursor.isInFooter = true
        switch (this._cursor.currGroup) {
            case 0:
                if (this._showPrevious) {
                    this._cursor.currGroup = FooterLocation.Previous
                } else {
                    this._cursor.currGroup = FooterLocation.Done
                }   // if (this._showPrevious)
                break

            case 2:
                if (this._showNext) {
                    this._cursor.currGroup = FooterLocation.Next
                } else {
                    this._cursor.currGroup = FooterLocation.Done
                }   // if (this._showNext)
                break

            default:
                this._cursor.currGroup = FooterLocation.Done
        }   // switch (this._cursor.currGroup)
    }   // moveToFooter()

    /**
     * Refreshes the list of options and highlights selections.
     */
    protected refreshSelections(): void {
        if (this._selectedOptions) {
            for (let group: number = 0; group < this._midText.data.length; group++) {
                for (let option: number = 0; option < this._midText.data[group].length; option++) {
                    this._midText.Redraw(group, option,
                        option == this._selectedOptions[group] + (this._hasHeaders ? 1 : 0)
                    )
                }
            }
        }
    }

    /**
     * Rebuild the cursor images.
    protected refreshCursor() {
        if (!this._midText.data || !this._midText.data.length) return
        this._cursor.img = image.create(Math.floor(screen.width / this._midText.data.length),
            this._midText.font.charHeight + 2)
        this._cursor.img.drawRect(0, 0,
            this._cursor.img.width, this._cursor.img.height,
            this._cursor.color)
    }   // refreshCursor()
     */

    /**
     * Shows or clears the highlight on the item indicated in CursorOptions.
     */
    protected updateCursor(show: boolean = true): void {
        if (this._cursor.isInFooter) {
            let ts: TextSprite
            switch (this._cursor.currGroup) {
                case FooterLocation.Done:
                    ts = this._footer.sprite
                    break

                case FooterLocation.Next:
                    ts = this._nextSprite
                    break

                case FooterLocation.Previous:
                    ts = this._prevSprite
                    break
            }
            
            if (ts) {
                if (show) {
                    ts.setBorder(1, this._cursor.color)
                } else {
                    ts.setBorder(1, 0)
                }
            }
        } else {
            this._midText.SetBorder(this._cursor.currGroup,
                this._cursor.currOption + (this._hasHeaders ? 1 : 0),
                this._cursor.color, show)
        }
    }   // updateCursor()
}   // class OptionScreen

//% blockNamespace=infoScreens
class OptionScreenCollection extends OptionScreen {
    /**
     * Protected member variables
     */
    protected _currOptScreen: number
    protected _optionSetHasHeaders: boolean[]
    protected _optionSets: string[][][]
    protected _selectedOptionsColl: number[][]
    protected _tabs: StringArrayTextSpriteFactory

    /**
     * Constructor
     * @param {string[]} titles - Array of strings to display as the title
     * @param {number} titlesColor - Color to use when printing titles
     * @param {string[][]} headlines - Sets of strings to display as headlines
     * @param {number} headlinesColor - Color to use when printing headlines
     * @param {number} backColor - Color to use for the background
     * @param {number} delay - Interval in milliseconds when screens will rotate
     */
    constructor(titles: string[], titlesColor: number = null,
        headlines: string[][] = null, headlinesColor: number = null,
        backColor: number = null, delay: number = null) {
        super(titles, titlesColor, headlines, headlinesColor, [], DEFAULT_COLOR_MID_TEXT,
            false, backColor, delay)
        this._currOptScreen = -1
        this._optionSetHasHeaders = []
        this._optionSets = []
        this._selectedOptionsColl = []
        this._tabs = new StringArrayTextSpriteFactory(
            [],
            DEFAULT_COLOR_TABS,
            DEFAULT_FONT_SIZE_TABS,
            0, 0
        )
    }   // constructor()

    /**
     * Getters and setters
     */
    /**
     * @return {number} Index of current screen
     */
    public get currScreen(): number {
        return this._currOptScreen
    }   // get currScreen()

    /**
     * @param {number} value - Index of current screen
     */
    public set currScreen(value: number) {
        this.saveSelections()
        this._currOptScreen = value
        this.rebuild()
    }   // set currScreen

    /**
     * Returns selections for current screen.
     * @see OptionScreen#selections
     */
    public get selections(): number[] {
        return this._selectedOptionsColl[this._currScreen]
    }   // get selections()

    /**
     * @return {number[][]} Selections for all screens in the collection
     */
    public get selectionsAllScreens(): number[][] {
        return this._selectedOptionsColl
    }   // get selectionsAllScreens()

    public get tabs(): StringArrayTextSpriteFactory {
        return this._tabs
    }   // get tabs()

    /**
     * Public methods
     */

    /**
     * Adds a screen to the options screen collection.
     * @param {string} name - Name of screen (shows as a tab)
     * @param {string[][]} options - Option groups (up to three) to show on screen
     * @param {boolean} hasHeaders - Whether option groups contain headers
     */
    public addScreen(name: string, options: string[][], hasHeaders: boolean = false): void {
        if (this._currOptScreen === -1) {
            this._currOptScreen = 0
        }   // if (this._currOptScreen === -1)
        this._tabs.data.push(name)
        this._optionSets.push(options)
        this._optionSetHasHeaders.push(hasHeaders)
        this._selectedOptionsColl.push([])
        this._showPrevious = (this._tabs.data.length > 1)
        this._showNext = (this._tabs.data.length > 1)
        let maxOptions: number = 0
        for (let index: number = 0; index < this._optionSets.length; index++) {
            if (this._optionSets[index][0].length > maxOptions) {
                maxOptions = this._optionSets[index][0].length
            }   // if (this._optionSets[index][0].length > maxOptions)
        }   // for (index)
        this._tabs.y = screen.height - (this._midText.fontSize + 1) * (maxOptions + 1) -
            this._tabs.fontSize - 12
    }   // addScreen

    /**
     * @see OptionScreen#build
     */
    public build(): void {
        this.setBase()
        super.build()
    }   // build()

    /**
     * @see OptionScreen#getSelection
     */
    public getSelection(index: number = 0): number {
        return this._selectedOptionsColl[this._currOptScreen][index]
    }   // getSelection()

    /**
     * Gets the selected option for the given option screen and group.
     * @param {number} screen - Screen in collection
     * @param {number} index - Option group for selection
     */
    public getSelectionForScreen(screen: number, index: number = 0): number {
        return this._selectedOptionsColl[screen][index]
    }   // getSelectionForScreen

    /**
     * @see OptionScreen#select
     */
    public select() {
        super.select()
        if (this._cursor.isInFooter) {
            this.saveSelections()
            if (this._cursor.currGroup === FooterLocation.Next) {
                this._currOptScreen++
                if (this._currOptScreen >= this._optionSets.length) {
                    this._currOptScreen = 0
                }   // if (this._currOptScreen >= this._optionSets.length)
                this.changeScreen()
            }   // if (this._cursor.currGroup === FooterLocation.Next)

            if (this._cursor.currGroup === FooterLocation.Previous) {
                this._currOptScreen--
                if (this._currOptScreen < 0) {
                    this._currOptScreen = this._optionSets.length - 1
                }   // if (this._currOptScreen < 0)
                this.changeScreen()
            }   // if (this._cursor.currGroup === FooterLocation.Previous)
        }   // if (this._isInFooter)
    }   // select()

    /**
     * @see OptionScreen#setSelection
     */
    public setSelection(index: number = 0, value: number = -1): void {
        super.setSelection(index, value)
        this._selectedOptionsColl[this._currOptScreen][index] = value
    }   // setSelection()

    /**
     * Sets the selected option for the given option screen and group.
     * @param {number} screen - Screen in collection
     * @param {number} index - Option group for selection
     * @param {number} value - Option to select; -1 for none
     */
    public setSelectionForScreen(screen: number, index: number = 0, value: number = -1): void {
        this._selectedOptionsColl[screen][index] = value
    }   // setSelectionForScreen()

    /**
     * Protected methods
     */

    /**
     * Updates the base image with information for the currently-selected screen.
     */
    protected changeScreen(): void {
        this.setBase()
        this.rebuild()
        this.refresh()
    }   // changeScreen()

    /**
     * Overrides OptionScreen.createBase().
     */
    protected createBase(): void {
        super.createBase()
        this.drawTabs()
    }   // createBase()

    /**
     * Draws the tabs on the screen.
     */
    protected drawTabs(): void {
        this._tabs.DrawHorizontal(1, true)
        this._tabs.Redraw(this._currOptScreen, true)
        /*
        if (RotatingScreens._base && this._tabs.data.length > 1) {
            let x: number = 0
            let tabHeight: number = this._tabs.font.charHeight + 4
            // Draw bounding box around tabs (currently disabled).
            // RotatingScreens._base.drawRect(0, this._tabsY, screen.width, tabHeight, this._tabsColor)
            for (let index: number = 0; index < this._tabs.data.length; index++) {
                let tabWidth: number = this._tabs.font.charWidth * this._tabs.data[index].length +
                    TAB_TEXT_MARGIN * 2
                if (index === this._currOptScreen) {
                    this.drawTab(this._tabs.data[index], this._tabs.font,
                        x, this._tabs.y, tabWidth, tabHeight,
                        this._backColor, this._tabs.color, this._tabs.color)
                } else {
                    this.drawTab(this._tabs.data[index], this._tabs.font,
                        x, this._tabs.y, tabWidth, tabHeight,
                        this._tabs.color, this._backColor, this._tabs.color)
                }   // if (index === this._currOptScreen)
                x += tabWidth
            }   // for (index)
        }   // if (this._tabs.length > 1)
        */
    }   // drawTabs()

    /**
     * Saves the currently-selected options for later recall.
     */
    protected saveSelections(): void {
        let selections: number[] = this._selectedOptions
        for (let index: number = 0; index < selections.length; index++) {
            this._selectedOptionsColl[this._currOptScreen][index] = selections[index]
        }   // for (index)
    }   // saveSelections()

    /**
     * Sets the OptionScreen options for the currently-selected option screen.
     */
    protected setBase(): void {
        if (this._currOptScreen > -1) {
            this.options = this._optionSets[this._currOptScreen]
            this._hasHeaders = this._optionSetHasHeaders[this._currOptScreen]
            let selectedOptions: number[] = this._selectedOptionsColl[this._currOptScreen]
            for (let index: number = 0; index < selectedOptions.length; index++) {
                this.setSelection(index, selectedOptions[index])
            }   // for (index)
        }   // if (this._currOptScreen > -1)
    }   // setBase()
}   // class OptionScreenCollection

//% weight=0 color=#b8860b icon="\uf085" block="Info Screens"
//% advanced=true
namespace infoScreens {
    //% blockId="infoScreens_createSplashScreen"
    //% block="create splash screen"
    //% blockSetVariable=mySplashScreen
    //% hidden
    export function createSplashScreen(): SplashScreens {
        return new SplashScreens(null)
    }   // createSplashScreen()
}   // namespace infoScreens