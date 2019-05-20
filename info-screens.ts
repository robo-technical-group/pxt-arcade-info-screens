namespace infoScreens {
    /**
     * Enumerations
     */
    enum FooterLocation {
        Previous,
        Done,
        Next
    }   // enum FooterLocation

    export enum SpriteDirection {
        Both,
        PointsLeft,
        PointsRight
    }   // enum SpriteDirection

    export enum SpriteMode {
        // Sprites move horizontally, one at a time, within space between headlines and mid-screen text
        BlankSpace,

        // Sprites are all placed on screen and move in random directions, bouncing off of walls
        Random,

        // Sprites are all placed on screen and move in random directions,
        // game.onUpdate() will handle off-screen sprites
        RandomWillUpdate
    }   // enum SpriteMode

    export enum SpriteType {
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
        // Sprite for cursor
        sprite?: Sprite

        // Main image for cursor
        img?: Image

        // Image for cursor when in footer
        footerImg?: Image

        // Color of cursor
        color: number

        // Current option group where cursor is located
        currGroup: number

        // Current option where cursor is located
        currOption: number
    }   // interface Cursor

    interface MovingSpriteOptions {
        // Sprite images
        imgs: Image[]

        // Direction(s) that sprites "point"
        dir: SpriteDirection

        // Mode to use when displaying sprites
        mode: SpriteMode

        // Speed to use for moving sprites
        speed: number

        // Vertical coordinate for static sprites
        y: number
    }   // interface MovingSpriteOptions

    interface StaticSpriteOptions {
        // Sprite image
        img: Image

        // Horizontal coordinate for sprite
        x: number

        // Vertical coordinate for sprite
        y: number
    }   // interface StaticSpriteOptions

    interface PrintOptions {
        // Color to use when printing data
        color: number

        // Font to use when printing data
        font: image.Font

        // Vertical coordinate to use when printing data
        y: number
    }   // interface PrintOptions

    interface StringPrintOptions extends PrintOptions {
        // Data to print
        data: string
    }   // interface StringPrintOptions

    interface StringArrayPrintOptions extends PrintOptions {
        // Data to print
        data: string[]
    }   // interface StringArrayPrintOptions

    interface String2dArrayPrintOptions extends PrintOptions {
        // Data to print
        data: string[][]
    }   // interface String2dArrayPrintOptions

    export class RotatingScreens {
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
        protected _footer: StringPrintOptions;
        protected _headlines: String2dArrayPrintOptions;
        protected _midText: String2dArrayPrintOptions;
        protected _titles: StringArrayPrintOptions;
        protected _movingSprites: MovingSpriteOptions;
        protected _interval: number // interval in milliseconds for splash screens to rotate
        protected _next: number // next scheduled time to rotate screens
        protected _staticSprites: StaticSpriteOptions[] // container for static sprites

        /**
         * Constructor
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
            this._interval = delay == null ? DEFAULT_DELAY : delay
            this._staticSprites = []

            this._footer = {
                data: footer == null ? '' : footer,
                color: footerColor == null ? DEFAULT_COLOR_FOOTER : footerColor,
                font: DEFAULT_FONT_FOOTER,
                y: 0
            }
            this._headlines = {
                data: headlines,
                color: headlinesColor == null ? DEFAULT_COLOR_HEADLINE : headlinesColor,
                font: DEFAULT_FONT_HEADLINE,
                y: 0
            }
            this._midText = {
                data: midText,
                color: midTextColor == null ? DEFAULT_COLOR_MID_TEXT : midTextColor,
                font: DEFAULT_FONT_MID_TEXT,
                y: 0
            }
            this._titles = {
                data: titles,
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
        public get backImage(): Image {
            return this._backImage
        }   // get backImage()

        public set backImage(value: Image) {
            this._backImage = value
        }   // set backImage()

        public get footer(): StringPrintOptions {
            return this._footer;
        }   // get footer()

        public get titles(): StringArrayPrintOptions {
            return this._titles;
        }   // get titles()

        public get midText(): String2dArrayPrintOptions {
            return this._midText;
        }   // get midText()

        public get headlines(): String2dArrayPrintOptions {
            return this._headlines;
        }   // get headlines()

        public get delay(): number {
            return this._interval
        }   // get delay()

        public set delay(value: number) {
            if (value >= 0) {
                this._interval = value
            } else {
                this._interval = DEFAULT_DELAY
            }   // if (value)
        }   // set delay()

        public get nextTime(): number {
            return this._next
        }   // get nextTime()

        public get movingSpriteOptions(): MovingSpriteOptions {
            return this._movingSprites;
        }   // get movingSpriteOptions()

        /**
         * Public methods
         */

        /**
         * Adds an image to the collection of moving sprites.
         */
        public addMovingSprite(value: Image): void {
            this._movingSprites.imgs.push(value)
        }   // addMovingSprite()

        /**
         * Adds a sprite and related information to the collection of static sprites.
         */
        public addStaticSprite(value: StaticSpriteOptions): void {
            this._staticSprites.push(value)
        }   // addStaticSprite()

        /**
         * Initializes canvas and creates sprites.
         * Call when ready to present rotating screens after object has been configured.
         */
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
        public rotate(): void {
            this._currScreen++
            this.refresh()
        }   // rotate()

        /**
         * Shows the next scrolling sprite in the collection.
         * Call from game.onUpdate()
         */
        public showScrollingSprite(): void {
            this._currSprite++
            if (this._currSprite < 0 || this._currSprite >= this._movingSprites.imgs.length) {
                this._currSprite = 0
            }   // if (this._currSprite > this._movingSprites.length)
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
         * Draws text on canvas.
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
            if (this._midText.data.length > 0) {
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
                this._headlines.y = this._titles.font.charHeight * this._titles.data.length + this._titles.data.length + 3
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
            let lines: string[] = this._headlines.data[this._currScreen]
            if (lines) {
                // Clear out current headline
                RotatingScreens._base.fillRect(0, this._headlines.y, screen.width,
                    lines.length * (this._headlines.font.charHeight + 1),
                    this._backColor)
                this.printMultipleCenter(lines, RotatingScreens._base,
                    this._headlines.y, this._headlines.color, this._headlines.font)
            }   // if (line)
        }   // drawCurrHeadline()

        /**
         * Draw multiple strings on an image, starting at a given coordinate.
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
         */
        protected printMultipleCenter(text: string[], img: Image,
            y: number, color: number, font: image.Font = null,
            spacing: number = 1): void {
            if (!font) {
                font = DEFAULT_FONT
            }   // if (!font)

            let currY: number = y;
            for (let t of text) {
                img.printCenter(t, currY, color, font);
                currY += (font.charHeight + spacing);
            }   // for ( t )
        }   // printMultipleCenter()
    }   // class RotatingScreens

    export class SplashScreens extends RotatingScreens {
        /**
         * Protected constants
         */

        /**
         * Constructor
         */
        constructor(titles: string[], titlesColor: number = 5,
            headlines: string[][] = null, headlinesColor: number = 14,
            instructions: string[][] = null, instructionsColor: number = 9,
            backColor: number = 15, delay: number = 5000) {
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
        public get instructions(): string[][] {
            return this._midText.data
        }   // get instructions()

        public set instructions(value: string[][]) {
            this._midText.data = value
        }   // set instructions()
    }   // class SplashScreens

    export class OptionScreen extends RotatingScreens {
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

        public get doneText(): string {
            return this._footer.data
        }   // get doneText()

        public set doneText(value: string) {
            this._footer.data = value
        }   // set doneText()

        public get options(): string[][] {
            return this._midText.data
        }   // get options()

        public set options(value: string[][]) {
            this._midText.data = value
            this.buildSelectedOptions()
        }   // set options()

        public get selections(): number[] {
            return this._selectedOptions
        }   // get selections()

        public get showNext(): boolean {
            return this._showNext
        }   // get showNext()

        public set showNext(value: boolean) {
            this._showNext = value
        }   // set showNext()

        public get showPrevious(): boolean {
            return this._showPrevious
        }   // get showPrevious()

        public set showPrevious(value: boolean) {
            this._showPrevious = value
        }   // set showPrevious()

        /**
         * Public methods
         */

        /**
         * Adds an option array to the screen.
         * Option screens can accommodate up to three groups of options.
         */
        public addOption(option: string[]) {
            this._midText.data.push(option)
            this.buildSelectedOptions()
        }   // addOption()

        /**
         * Overrides RotatingScreens.build().
         */
        public build(): void {
            super.build()
            this.createCursor()
            this._isDone = false
        }   // build()

        /**
         * Overrides RotatingScreens.destroySprites().
         */
        public destroySprites(): void {
            super.destroySprites()
            for (let sprite of sprites.allOfKind(SpriteType.Cursor)) {
                sprite.destroy()
            }   // for (sprite)
        }   // destroySprites()

        /**
         * Gets the selected option for an option group.
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
         * Overrides RotatingScreens.refresh().
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
         * To deselect all options in an option group, pass -1 for the value.
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
         * Overrides RotatingScreens.createBase().
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

    export class OptionScreenCollection extends OptionScreen {
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
        public get currScreen(): number {
            return this._currOptScreen
        }   // get currScreen()

        public set currScreen(value: number) {
            this.saveSelections()
            this._currOptScreen = value
            this.rebuild()
        }   // set currScreen

        public get selections(): number[] {
            return this._selectedOptionsColl[this._currScreen]
        }   // get selections()

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
         */
        public addScreen(name: string, options: string[][], hasHeaders: boolean = false) {
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
         * Overrides OptionScreen.build().
         */
        public build(): void {
            this.setBase()
            super.build()
        }   // build()

        /**
         * Overrides OptionScreen.getSelection().
         */
        public getSelection(index: number = 0): number {
            return this._selectedOptionsColl[this._currOptScreen][index]
        }   // getSelection()

        /**
         * Gets the selected option for the given option screen and group.
         */
        public getSelectionForScreen(screen: number, index: number = 0): number {
            return this._selectedOptionsColl[screen][index]
        }   // getSelectionForScreen

        /**
         * Overrides OptionScreen.select().
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
         * Overrides OptionScreen.setSelection().
         */
        public setSelection(index: number = 0, value: number = -1): void {
            super.setSelection(index, value)
            this._selectedOptionsColl[this._currOptScreen][index] = value
        }   // setSelection()

        /**
         * Sets the selected option for the given option screen and group.
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
}   // namespace infoScreens