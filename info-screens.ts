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
 * Sprite types used when extension creates sprites.
 */
enum SpriteType {
    Cursor = 77,
    Moving = 19,
    Static = 42
}   // enum SpriteType

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
const DEFAULT_FONT: image.Font = image.font8
const DEFAULT_FONT_FOOTER: image.Font = image.font8
const DEFAULT_FONT_HEADLINE: image.Font = image.font8
const DEFAULT_FONT_MID_TEXT: image.Font = image.font5
const DEFAULT_FONT_TABS: image.Font = image.font5
const DEFAULT_FONT_TITLE: image.Font = image.doubledFont(image.font8)
const DEFAULT_SPRITE_SPEED: number = 100
const DEFAULT_TEXT_DONE: string = 'Done'
const DEFAULT_TEXT_FOOTER_SPLASH: string = 'Press any button to begin'
const DEFAULT_Y_TITLES: number = 2
const TAB_TEXT_MARGIN: number = 5 // Pixels to the left and right of tab text
const TEXT_NEXT: string = 'Next >'
const TEXT_PREVIOUS: string = '< Prev'

/**
 * Interfaces
 */
interface CursorOptions {
    /**
     * Sprite for cursor
     */
    sprite?: Sprite

    /**
     * Main image for cursor
     */
    img?: Image

    /**
     * Image for cursor when in footer
     */
    footerImg?: Image

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
 * Common fields for printing strings.
 * Subclasses should implement a <code>data</code> field with the data to print.
 */
interface PrintOptions {
    /**
     * Color to use when printing data
     */
    color: number

    /**
     * Font to use when printing data
     */
    font: image.Font

    /**
     * Vertical coordinate to use when printing data
     */
    y: number
}   // interface PrintOptions

interface StringPrintOptions extends PrintOptions {
    data: string
}   // interface StringPrintOptions

interface StringArrayPrintOptions extends PrintOptions {
    data: string[]
}   // interface StringArrayPrintOptions

interface String2dArrayPrintOptions extends PrintOptions {
    data: string[][]
}   // interface String2dArrayPrintOptions

//% blockNamespace=infoScreens
class RotatingScreens {
    /**
     * Protected static variables
     */
    protected static _base: Image // scene canvas that all objects update

    /**
     * Protected member variables
     */
    protected _backColor: number // background color for screens
    protected _backImage: Image  // user-supplied background image
    protected _currScreen: number // index of image currently shown
    protected _currSprite: number
    protected _footer: StringPrintOptions
    protected _headlines: String2dArrayPrintOptions
    protected _midText: String2dArrayPrintOptions
    protected _titles: StringArrayPrintOptions
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
        this._backColor = backColor == null ? DEFAULT_COLOR_BG : backColor
        this._backImage = null
        this._interval = delay ? delay : DEFAULT_DELAY
        this._movingSpritesSequential = true
        this._staticSprites = []

        this._footer = {
            data: footer ? footer : '',
            color: footerColor == null ? DEFAULT_COLOR_FOOTER : footerColor,
            font: DEFAULT_FONT_FOOTER,
            y: 0
        }
        this._headlines = {
            data: headlines ? headlines : [],
            color: headlinesColor == null ? DEFAULT_COLOR_HEADLINE : headlinesColor,
            font: DEFAULT_FONT_HEADLINE,
            y: 0
        }
        this._midText = {
            data: midText ? midText : [],
            color: midTextColor == null ? DEFAULT_COLOR_MID_TEXT : midTextColor,
            font: DEFAULT_FONT_MID_TEXT,
            y: 0
        }
        this._titles = {
            data: titles ? titles : [],
            color: titlesColor == null ? DEFAULT_COLOR_TITLE : titlesColor,
            font: DEFAULT_FONT_TITLE,
            y: DEFAULT_Y_TITLES
        }
        this._movingSprites = {
            imgs: [],
            dir: SpriteDirection.Both,
            mode: SpriteMode.Random,
            speed: DEFAULT_SPRITE_SPEED,
            y: 0
        }

        if (!RotatingScreens._base) {
            RotatingScreens._base = image.create(screen.width, screen.height)
        }   // if (! RotatingScreens._base)
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
     * @return {Image} Common canvas
     */
    public static get canvas(): Image {
        return RotatingScreens._base
    }   // get canvas()

    /**
     * @param (Image) value - Image to use for common canvas
     */
    public static set canvas(value: Image) {
        RotatingScreens._base = value
    }   // set canvas()

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
    public get footer(): StringPrintOptions {
        return this._footer;
    }   // get footer()

    //% callInDebugger
    public get headlines(): String2dArrayPrintOptions {
        return this._headlines;
    }   // get headlines()

    //% callInDebugger
    public get midText(): String2dArrayPrintOptions {
        return this._midText;
    }   // get midText()

    //% callInDebugger
    public get movingSpriteOptions(): MovingSpriteOptions {
        return this._movingSprites;
    }   // get movingSpriteOptions()

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
    public get titles(): StringArrayPrintOptions {
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
    public addHeadlines(value: string[]) {
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
    //% blockId="infoScreens_RotatingScreens_addStaticSprite"
    //% block="%mySplashScreen|add image %value"
    //% value.shadow="variables_get" value.defl="myImage"
    public addStaticSprite(value: StaticSpriteOptions): void {
        this._staticSprites.push(value)
    }   // addStaticSprite()

    /**
     * Initializes canvas and creates sprites.
     * Call when ready to present rotating screens after object has been configured.
     */
    //% blockId="infoScreens_RotatingScreens_build"
    //% block="%mySplashScreen|show"
    public build(): void {
        this.destroySprites()
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
     * Destroys all moving and static sprites from the game.
     * Call when removing the splash screen from the game.
     */
    //% blockId="infoScreens_RotatingScreens_destroySprites"
    //% block="%mySplashScreen|destroy sprites"
    public destroySprites(): void {
        for (let sprite of sprites.allOfKind(SpriteType.Moving)) {
            sprite.destroy()
        }   // for (sprite)
        for (let sprite of sprites.allOfKind(SpriteType.Static)) {
            sprite.destroy()
        }   // for (sprite)
    }   // destroySprites()

    /**
     * Initializes canvas.
     * Call after initial build() if configuration changes.
     */
    public rebuild(): void {
        this.createBase()
    }   // rebuild()

    /**
     * Releases the canvas so that it can be garbage-collected.
     */
    public release(): void {
        RotatingScreens._base = null
        this.destroySprites()
    }   // release()

    /**
     * Updates canvas with the current headline.
     * Set time for next update.
     */
    public refresh(): void {
        if (!this._currScreen || this._currScreen < 0 || this._currScreen >= this._headlines.data.length) {
            this._currScreen = 0
        }   // if (this._currScreen >= this._headlines.length)
        this.drawCurrHeadline()
        this._next = game.runtime() + this._interval
    }   // refresh()

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
            SpriteType.Moving)
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
            let newSprite: Sprite = sprites.create(img.clone(), SpriteType.Moving)
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
            let newSprite: Sprite = sprites.create(sprite.img.clone(), SpriteType.Static)
            newSprite.setFlag(SpriteFlag.Ghost, true)
            newSprite.x = sprite.x
            newSprite.y = sprite.y
        }   // for (sprite)
    }   // addStaticSprites()

    /**
     * Draws text and background image on canvas.
     */
    protected createBase(): void {
        // Check RotatingScreens._base in case release() has been called.
        if (!RotatingScreens._base) {
            RotatingScreens._base = image.create(screen.width, screen.height)
        }   // if (! RotatingScreens._base)

        RotatingScreens._base.fill(this._backColor)
        this.duplicateBackImage()
        this.printMultipleCenter(this._titles.data, RotatingScreens._base, DEFAULT_Y_TITLES,
            this._titles.color, this._titles.font)
        this._footer.y = screen.height - (this._footer.font.charHeight + 2)
        RotatingScreens._base.printCenter(this._footer.data, this._footer.y,
            this._footer.color, this._footer.font)

        // Set initial vertical coordinate for mid-text.
        // Will be adjusted if mid-text exists.
        this._midText.y = screen.height - 10
        if (this._midText.data && this._midText.data.length > 0) {
            this._midText.y = screen.height -
                ((this._midText.font.charHeight + 1) * (this._midText.data[0].length + 1) + 6)
            switch (this._midText.data.length) {
                case 1:
                    this.printMultipleCenter(this._midText.data[0],
                        RotatingScreens._base, this._midText.y, this._midText.color, this._midText.font)
                    break;

                case 2:
                    this.printMultiple(this._midText.data[0],
                        RotatingScreens._base, 1, this._midText.y, this._midText.color, this._midText.font)
                    this.printMultiple(this._midText.data[1],
                        RotatingScreens._base, screen.width / 2 + 1, this._midText.y, this._midText.color,
                        this._midText.font)
                    break;

                default:
                    this.printMultiple(this._midText.data[0],
                        RotatingScreens._base, 1, this._midText.y, this._midText.color, this._midText.font)
                    this.printMultipleCenter(this._midText.data[1],
                        RotatingScreens._base, this._midText.y, this._midText.color, this._midText.font)
                    this.printMultiple(this._midText.data[2],
                        RotatingScreens._base, screen.width * 2 / 3 + 1, this._midText.y, this._midText.color,
                        this._midText.font)
                    break;
            }   // switch (this._midText.length)
        }   // if (this._midText)

        // Calculate vertical coordinate for headlines.
        if (this._backImage) {
            let minY = this._midText.y - (this._headlines.font.charHeight + 1) * 2
            if (this._backImage.height > minY) {
                this._headlines.y = minY
            } else {
                this._headlines.y = this._backImage.height
            }   // if (this._backImage.height > minY)
        } else {
            if (this._titles.data) {
                this._headlines.y = this._titles.font.charHeight * this._titles.data.length + this._titles.data.length +
                    DEFAULT_Y_TITLES + 2
            } else {
                this._headlines.y = DEFAULT_Y_TITLES + 2
            }   // if (this._titles.data)
        }   // if (this._backImage)

        // Calculate vertical coordinate for moving sprites.
        this._movingSprites.y = (this._headlines.y + this._headlines.font.charHeight * 2 + 1 + this._midText.y) / 2
        scene.setBackgroundImage(RotatingScreens._base)
    }   // createBase()

    /**
     * Duplicates the background image to the canvas
     */
    protected duplicateBackImage(): void {
        if (this._backImage != null && RotatingScreens._base != null) {
            for (let x: number = 0; x < this._backImage.width; x++) {
                for (let y: number = 0; y < this._backImage.height; y++) {
                    RotatingScreens._base.setPixel(x, y, this._backImage.getPixel(x, y))
                }   // for (y)
            }   // for (x)
        }   // if (!RotatingScreens._base)
    }   // duplicateBackImage()

    /**
     * Draw the current headline on the canvas.
     */
    protected drawCurrHeadline(): void {
        if (!RotatingScreens._base) {
            return
        }   // if (!RotatingScreens._base)
        if (this._headlines.data) {
            let lines: string[] = this._headlines.data[this._currScreen]
            if (lines) {
                // Clear out current headline
                RotatingScreens._base.fillRect(0, this._headlines.y, screen.width,
                    lines.length * (this._headlines.font.charHeight + 1),
                    this._backColor)
                this.printMultipleCenter(lines, RotatingScreens._base,
                    this._headlines.y, this._headlines.color, this._headlines.font)
            }   // if (line)
        }
    }   // drawCurrHeadline()

    /**
     * Draw multiple strings on an image, starting at a given coordinate.
     * @param {string[]} text - Strings to print on the image
     * @param {Image} img - Image where strings will be drawn
     * @param {number} x - Horizontal coordinate for text; lines will be left-justified
     * @param {number} y - Vertical coordinate where first line will print
     * @param {number} color - Color to use when printing strings
     * @param {image.Font} font - Font to use when printing strings
     * @param {number} spacing - Number of pixels to place between strings
     */
    protected printMultiple(text: string[], img: Image,
        x: number, y: number, color: number, font: image.Font = null,
        spacing: number = 1): void {
        if (!font) {
            font = DEFAULT_FONT
        }   // if (!font)

        let currY: number = y
        for (let t of text) {
            img.print(t, x, currY, color, font)
            currY += (font.charHeight + spacing)
        }   // for ( t )
    }   // printMultiple()

    /**
     * Draw multiple strings centered on an image, starting at a given vertical coordinate.
     * @param {string[]} text - Strings to print on the image
     * @param {Image} img - Image where strings will be drawn
     * @param {number} y - Vertical coordinate where first line will print
     * @param {number} color - Color to use when printing strings
     * @param {image.Font} font - Font to use when printing strings
     * @param {number} spacing - Number of pixels to place between strings
     */
    protected printMultipleCenter(text: string[], img: Image,
        y: number, color: number, font: image.Font = null,
        spacing: number = 1): void {
        if (!font) {
            font = DEFAULT_FONT
        }   // if (!font)

        if (text) {
            let currY: number = y;
            for (let t of text) {
                img.printCenter(t, currY, color, font);
                currY += (font.charHeight + spacing);
            }   // for ( t )
        }   // if (text)
    }   // printMultipleCenter()
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
    protected _isInFooter: boolean
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
            currOption: 0
        }
        this._hasHeaders = hasHeaders
        this._isDone = false
        this._isInFooter = false
        this._showNext = false
        this._showPrevious = false
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
        if (value) {
            this.destroyCursor()
        } else {
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
    public addOption(option: string[]) {
        this._midText.data.push(option)
        this.buildSelectedOptions()
    }   // addOption()

    /**
     * @see RotatingScreens#build
     */
    public build(): void {
        super.build()
        this.createCursor()
        this._isDone = false
    }   // build()

    /**
     * @see RotatingScreens#destroySprites
     */
    public destroySprites(): void {
        super.destroySprites()
        for (let sprite of sprites.allOfKind(SpriteType.Cursor)) {
            sprite.destroy()
        }   // for (sprite)
    }   // destroySprites()

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
        if (this._isInFooter) {
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
        this.moveCursor()
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
        if (this._isInFooter) {
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
        this.moveCursor()
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
        if (this._isInFooter) {
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
        this.moveCursor()
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
        if (this._isInFooter) {
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
        this.moveCursor()
    }   // moveCursorUp()

    /**
     * @see RotatingScreens#refresh
     */
    public refresh() {
        super.refresh()
        this.refreshCursor()
    }   // refresh()

    /**
     * Marks the current option as selected.
     * Call from a controller event handler.
     */
    public select() {
        if (this._isInFooter) {
            if (this._cursor.currGroup === FooterLocation.Done) {
                this.done = true
            }   // if (this._cursorCurrGruop === FooterLocation.Done)
        } else {
            this._selectedOptions[this._cursor.currGroup] = this._cursor.currOption
            this.rebuild()
            this.refresh()
        }   // if (this._isInFooter)
    }   // select()

    /**
     * Sets the selected option for a given option group.
     * @param {number} index - Option group for selection
     * @param {number} value - Option to select; -1 for none
     */
    public setSelection(index: number = 0, value: number = -1) {
        this._selectedOptions[index] = value
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
            let x: number = screen.width - TEXT_NEXT.length * this._footer.font.charWidth
            RotatingScreens._base.print(TEXT_NEXT, x, this._footer.y, this._footer.color, this._footer.font)
        }   // if (this._showNext)
        if (this._showPrevious) {
            RotatingScreens._base.print(TEXT_PREVIOUS, 1, this._footer.y, this._footer.color, this._footer.font)
        }   // if (this._showPrevious)
    }   // createBase()

    /**
     * Initializes the cursor images and adds the cursor sprite to the screen.
     */
    protected createCursor(): void {
        if (this._midText != null && this._midText.data.length > 0) {
            this.refreshCursor()
            if (this._isInFooter) {
                this._cursor.sprite = sprites.create(this._cursor.footerImg, SpriteType.Cursor)
            } else {
                this._cursor.sprite = sprites.create(this._cursor.img, SpriteType.Cursor)
            }   // if (this._isInFooter)
            this.moveCursor()
        }   // if (this._midText)
        this._cursor.footerImg = image.create(Math.floor(screen.width / 3),
            this._midText.font.charHeight + 2)
        this._cursor.footerImg.drawRect(0, 0,
            this._cursor.footerImg.width, this._cursor.footerImg.height,
            this._cursor.color)
    }   // createCursor()

    /**
     * Destroys the cursor sprite.
     */
    protected destroyCursor(): void {
        this._cursor.sprite.destroy()
    }   // destroyCursor()

    /**
     * Draws the given option as selected (i.e. in reverse)
     * @param {number} group - Option group for selection
     * @param {number} option - Option to draw as selected
     */
    protected drawSelection(group: number, option: number) {
        if (!RotatingScreens._base) {
            return
        }   // if (!RotatingScreens._base)
        let x: number = group * screen.width / this._midText.data.length
        let y: number = this._midText.y +
            (option + (this._hasHeaders ? 1 : 0)) *
            (this._midText.font.charHeight + 1)
        let w: number = screen.width / this._midText.data.length
        let h: number = this._midText.font.charHeight
        RotatingScreens._base.fillRect(x, y, w, h, this._midText.color)
        let text: string = this._midText.data[group][option +
            (this._hasHeaders ? 1 : 0)]
        if (this._midText.data.length === 1) {
            RotatingScreens._base.printCenter(text, y, this._backColor, this._midText.font)
        } else {
            RotatingScreens._base.print(text, x + 1, y, this._backColor, this._midText.font)
        }   // if (this._midText.length === 0)
    }   // drawSelection()

    /**
     * Moves the cursor sprite to the location indicated in its CursorOptions.
     */
    protected moveCursor(): void {
        let x: number
        let y: number
        if (this._isInFooter) {
            x = this._cursor.currGroup * screen.width / 3 +
                this._cursor.sprite.image.width / 2
            y = screen.height - this._footer.font.charHeight
        } else {
            x = this._cursor.currGroup * screen.width / this._midText.data.length +
                this._cursor.sprite.image.width / 2
            y = this._midText.y - 2 +
                (this._cursor.currOption + (this._hasHeaders ? 1 : 0)) *
                (this._midText.font.charHeight + 1) +
                this._cursor.sprite.image.height / 2
        }   // if (this._isInFooter)
        this._cursor.sprite.x = x
        this._cursor.sprite.y = y
    }   // moveCursor()

    /**
     * Move the cursor out of the footer and to an appropriate option.
     */
    protected moveOutOfFooter(): void {
        this._isInFooter = false
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
        this._cursor.sprite.setImage(this._cursor.img)
    }   // moveOutOfFooter()

    /**
     * Move the cursor from an option group into the footer.
     */
    protected moveToFooter(): void {
        this._isInFooter = true
        this._cursor.sprite.setImage(this._cursor.footerImg)
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
     * Rebuild the cursor images.
     */
    protected refreshCursor() {
        if (!this._midText.data || !this._midText.data.length) return
        this._cursor.img = image.create(Math.floor(screen.width / this._midText.data.length),
            this._midText.font.charHeight + 2)
        this._cursor.img.drawRect(0, 0,
            this._cursor.img.width, this._cursor.img.height,
            this._cursor.color)
    }   // refreshCursor()
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
    protected _tabs: StringArrayPrintOptions

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
        this._tabs = {
            data: [],
            color: DEFAULT_COLOR_TABS,
            font: DEFAULT_FONT_TABS,
            y: 0
        }
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

    public get tabs(): StringArrayPrintOptions {
        return this._tabs
    }   // get tabs()

    /**
     * Public methods
     */

    /**
     * Adds a screen to the options screen collection.
     * @param {string} name - Name of option group to show in the tabs
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
        this._tabs.y = screen.height - (this._midText.font.charHeight + 1) * (maxOptions + 1) -
            this._tabs.font.charHeight - 12
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
        if (this._isInFooter) {
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
     * Draws a tab on the screen.
     * @param {string} text - Text to display in tab
     * @param {image.Font} font - Font to use when printing text
     * @param {number} x - Horizontal coordinate for tab
     * @param {number} y - Vertical coordinate for tab
     * @param {number} width - Width of tab
     * @param {number} height - Height of tab
     * @param {number} textColor - Color to use when printing text
     * @param {number} backColor - Color for background of tab
     * @param {number} borderColor - Color for border of tab
     */
    protected drawTab(text: string, font: image.Font,
        x: number, y: number, width: number, height: number,
        textColor: number, backColor: number, borderColor: number): void {
        if (!RotatingScreens._base) {
            return
        }   // if (!RotatingScreens._base)
        RotatingScreens._base.fillRect(x, y, width, height, backColor)
        RotatingScreens._base.drawRect(x, y, width, height, borderColor)
        let textMargin = (width - font.charWidth * text.length) / 2
        RotatingScreens._base.print(text, x + textMargin, y + 2, textColor, font)
    }   // drawTab()

    /**
     * Draws the tabs on the screen.
     */
    protected drawTabs(): void {
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

    /**
     * Set the common canvas used by all splash screen objects.
     * Use if your game also uses a common canvas to conserve memory.
     * @param {Image} img - Canvas that all splash screen objects will use.
     */
    //% blockId="infoScreens_setImage"
    //% block="set splash screen canvas to %img"
    //% img.defl="myImage" img.shadow="variables_get"
    //% hidden
    export function setCanvas(img: Image): void {
        RotatingScreens.canvas = img
    }   // setCanvas()
}   // namespace infoScreens