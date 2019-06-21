# pxt-arcade-info-screens

[![Build Status](https://travis-ci.com/robo-technical-group/pxt-arcade-info-screens.svg?branch=master)](https://travis-ci.com/robo-technical-group/pxt-arcade-info-screens)

Extension used to build a variety of information screens, like splash screens and screens for selecting options.
Blocks and JavaScript interfaces available.

[Link to API documentation](https://github.com/robo-technical-group/pxt-arcade-info-screens/blob/master/api.md)

## Usage

### Splash Screens
```typescript
let splash: SplashScreens =
    new SplashScreens(
        // First two arguments are the titles:
        // An array of strings for the text in the title,
        // followed by a color.
        ['My Game', 'in JavaScript'], Color.Yellow,

        // Next two arguments are the rotating headlines:
        // A set of string arrays for the headlines,
        // followed by a color.
        [['My Game is', '(C) 20XX'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Me']], Color.Brown,

        // Last two arguments are the instructions:
        // Up to three sets of string arrays,
        // followed by a color.
        [['Left/Right = Action', 'Up = Action', 'Down = Action', 'A = Action', 'B = Action']], Color.LightBlue)

// Once you've created the object for your splash screen
// and set any appropriate options, call build.
splash.build()

// In game.update, see if the screens need rotating.
game.onUpdate(function () {
    if (game.runtime() >= splash.nextTime) {
        splash.rotate()
    }   // if (game.runtime() >= splashes[currSplash].nextTime)
})   // game.onUpdate()

controller.any.onEvent(ControllerButtonEvent.Pressed, function () {
    // Release the splash screen image to free up memory
    splash.release()

    // Start game!
})  // controller.any.onEvent()

```

### Options

```typescript
// Want to change the font?
splash.titles.font = image.font8
splash.headlines.font = image.font5
splash.footer.font = image.font5
```

### Sprites

#### Moving sprites

```typescript
// Sprites will bounce around the screen.
splash.movingSpriteOptions.mode = SpriteMode.Random
splash.movingSpriteOptions.speed = 10
splash.addMovingSprite(
    img``
)
splash.addMovingSprite(
    img``
)
splash.addMovingSprite(
    img``
)
```

```typescript
// Sprites will scroll left-to-right or right-to-left
// in the "blank space" between the headlines and the instructions
splash.movingSpriteOptions.mode = SpriteMode.BlankSpace
splash.movingSpriteOptions.speed = 10

// Tell the splash screen which direction your images point
// The images will be flipped if they are pointing backwards relative to the motion
splash.movingSpriteOptions.dir = SpriteDirection.PointsLeft
splash.addMovingSprite(
    img``
)
splash.addMovingSprite(
    img``
)
```

#### Static (non-moving) sprites

```typescript
splash.addStaticSprite({
    img: img``,
    x: 24,
    y: 64
})
splash.addStaticSprite({
    img: img``,
    x: 128,
    y: 64
})
```

### Option screen
```typescript
let os: OptionScreen = new OptionScreen(
    // Titles
    ['Salvo!'], Color.Yellow,

    // Headlines
    [['Options', ''], ['Salvo! is (C) 2019', 'Robo Technical Group LLC'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown,

    // Option groups (up to three)
    [['Human', '0 players', '1 player', '2 players', '3 players', '4 players'], ['Computer', '0 players', '1 player', '2 players', '3 players', '4 players']], Color.LightBlue,

    // Whether option groups have headers ('Human' and 'Computer' in this case)
    true
)

// Change the text of the "done" button
os.doneText = 'Start!'

// Set default selections
os.setSelection(0, 2) // First option group set to option 2 ('2 players')
os.setSelection(1, 0) // Second option group set to option 0 ('0 players')

// Controller event handlers
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // Tell the option screen to select the current option
    os.select()

    // See if user has selected "done"
    if (os.done) {
        // Do some error checking
        let numPlayers: number= os.getSelection(0) + os.getSelection(1)
        if (numPlayers < 2 || numPlayers > 4) {
            if (numPlayers < 2) {
                game.splash('Must have at least two players.')
            } else {
                game.splash('Cannot have more than four players.')
            }   // if (numPlayers < 2)
            os.done = false
        }   // if (numPlayers...)
    }   // if (os.done)

    // See if we are done after error checking
    if (os.done) {
        os.release()
        // Start game!
    }   // if (os.done)
})  // controller.A.onEvent()

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    os.moveCursorUp()
})  // controller.up.onEvent()

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    os.moveCursorDown()
})  // controller.down.onEvent()

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    os.moveCursorLeft()
})  // controller.left.onEvent()

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    os.moveCursorRight()
})  // controller.right.onEvent()

```

### Option screen collection
```typescript
let osColl: OptionScreenCollection =
    new OptionScreenCollection(
        // Titles
        ['Salvo!'], Color.Yellow,

        // Headlines
        [['Options', ''], ['Salvo! is (C) 2019', 'Robo Technical Group LLC'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown
    )

// Add two screens
// First screen: Number of players
osColl.addScreen(
    // Title - Shows in the tabs
    'Players',

    // Option groups
    [['Human', '0 players', '1 player', '2 players', '3 players', '4 players'],
    ['Computer', '0 players', '1 player', '2 players', '3 players', '4 players']],

    // Whether option groups have headers
    true)

// Second screen: Game type
osColl.addScreen('Game Type',
    // Only one option group this time
    [['Standard', 'Classic', 'Modern']],
    
    // Option group does not have headers
    false)

// Set default selections
osColl.setSelectionForScreen(0, 0, 2) // First screen, first option group set to selection 2
osColl.setSelectionForScreen(0, 1, 0) // First screen, first option group set to selection 0
osColl.setSelectionForScreen(1, 0, 0) // Second screen, first (and only) option group set to selection 0
```

## TODO

- [X] See it in action here: https://makecode.com/_cp357aE7JMEx
- [ ] Add "icon.png" image (300x200) in the root folder
- [X] Add "- beta" to the GitHub project description if you are still iterating it.
- [X] Turn on your automated build on https://travis-ci.org
- [X] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://arcade.makecode.com/extensions/approval
- [X] Add blocks implementation (done - version 1.0.6).
- [X] Add RotatingScreens.release() to blocks (done - version 1.0.9).

Visit the following links to read more about building MakeCode custom blocks and extensions:

- https://arcade.makecode.com/blocks/custom
- https://makecode.com/defining-blocks
- https://makecode.com/extensions/getting-started

## License

MIT License. See LICENSE for more information.

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

