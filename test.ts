// Enumerations
// Standard palette
enum Color {
    Transparent, // 0
    White, // 1 = RGB(255, 255, 255)
    Red, // 2 = RGB(255, 33, 33)
    Pink, // 3 = RGB(255, 147, 196)
    Orange, // 4 = RGB(255, 129, 53)
    Yellow, // 5 = RGB(255, 246, 9)
    Aqua, // 6 = RGB(36, 156, 163)
    BrightGreen, // 7 = RGB(120, 220, 82)
    Blue, // 8 = RGB(0, 63, 173)
    LightBlue, // 9 = RGB(135, 242, 255)
    Purple, // 10 = RGB(142, 46, 196)
    RoseBouquet, // 11 = RGB(164, 131, 159)
    Wine, // 12 = RGB(92, 64, 108)
    Bone, // 13 = RGB(229, 205, 196)
    Brown, // 14 = RGB(145, 70, 61)
    Black // 15 = RGB(0, 0, 0)
}   // enum Color

// Global variables
let splashes: infoScreens.RotatingScreens[] = []
let currSplash: number = -1
let newSplash: infoScreens.SplashScreens = null

// Global constants
const FIRST_OPTION_SCREEN: number = 5

// Main (a.k.a. game.onStart())

// Template splash screen
splashes.push(new infoScreens.SplashScreens(
    ['My Game', 'in JavaScript'], Color.Yellow,
    [['My Game is', '(C) 20XX'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Me']], Color.Brown,
    [['Left/Right = Action', 'Up = Action', 'Down = Action', 'A = Action', 'B = Action']], Color.LightBlue)
)

// Asteroids splash screen with wandering asteroids
newSplash = new infoScreens.SplashScreens(
    ['Asteroids'], Color.Yellow,
    [['Asteroids is', '(C) 1979 Atari Inc.'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown,
    [['Left/Right = Rotate', 'Up = Thursters', 'A = Shoot', 'B = Hyperspace']], Color.LightBlue
)
newSplash.movingSpriteOptions.mode = infoScreens.SpriteMode.RandomWillUpdate
newSplash.movingSpriteOptions.speed = 10
newSplash.addMovingSprite(
    img`
        . . . b b b b b b b b b b b b b b b b b b b b b b . . . . . . .
        . . . . b . . . . . . . . . . . . . . . . . . . . b . . . . . .
        . . . . . b . . . . . . . . . . . . . . . . . . . . b . . . . .
        . . . . . . b . . . . . . . . . . . . . . . . . . . . b . . . .
        . . . . . . . b . . . . . . . . . . . . . . . . . . . . b . . .
        . . . b . . . . b . . . . . . . . . . . . . . . . . . . . b . .
        . . . b b b . . . b . . . . . . . . . . . . . . . . . . . . b .
        . . . b . . b b . . b . . . . . . . . . . . . . . . . . . . . b
        . . b . . . . . b b . . . . . . . . . . . . . . . . . . . . . b
        . . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . b b . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . . . b b . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . . . . . b b . . . . . . . . . . . . . . . . . . . . . . . . b
        . . . . . . . b b . . . . . . . . . . . . . . . . . . . . . . b
        . . . . . . . . . b b . . . . . . . . . . . . . . . . . . . . b
        . . . . . . . . . . . b b . . . . . . . . . . . . . . . . . . b
        . . . . . . . . . . . . . b . . . . . . . . . . . . . . . . . b
        . . . . . . . . . . b b b . . . . . . . . . . . . . . . . . . b
        . . . . . . . b b b . . . . . . . . . . . . . . . . . . . . . b
        . . . . b b b . . . . . . . . . . . . . . . . . . . . . . . . b
        . b b b . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . . b . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        . . . b . . . . . . . . . . . . . . . . . . . . . . . . . . b .
        . . . . b . . . . . . . . . . . . . . . . . . . . . . . . b . .
        . . . . . b b b b b b b b b b b b b b b b b b b b b b b b . . .
    `
)
newSplash.addMovingSprite(
    img`
        . . . . . . . . b b b b b b b b b b b b b b b b b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        b b b b b b b b b . . . . . . . . . . . . . . . b b b b b b b b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b b b b b b b b b . . . . . . . . . . . . . . . b b b b b b b b
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . b b b b b b b b b b b b b b b b b . . . . . . .
    `
)
newSplash.addMovingSprite(
    img`
        . . . . . . . . . . . . b b b b b b b b . . . . . . . . . . . .
        . . . . . . . . . . . b . . . . . . . b . . . . . . . . . . . .
        . . . . . . . . . . b . . . . . . . b . . . . . . . . . . . . .
        . . . . . . . . . b . . . . . . . . b . . . . . . . . . . . . .
        . . . . . . . . b . . . . . . . . . b . . . . . . . . . . . . .
        . . . . . . . b . . . . . . . . . b . . . . . . . . . . . . . .
        . . . . . . b . . . . . . . . . . b . . . . . . . . . . . . . .
        . . . . . b . . . . . . . . . . . b . . . . . . . . . . . . . .
        . . . . b . . . . . . . . . . . b . . . . . . . . . . . . . . .
        . . . b . . . . . . . . . . . . b . . . . . . . . . . . . . . .
        . . b . . . . . . . . . . . . . b . . . . . . . . . . . . . . .
        . b . . . . . . . . . . . . . . b b b b b b b b b b b b b b b b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . b
        b . . . . . . . . . . . . . . . . . . . . . . . . . . . . b b b
        b . . . . . . . . . . . . . . . . . . . . . . . . . b b b . . .
        b . . . . . . . . . . . . . . . . . . . . . . b b b . . . . . .
        b . . . . . . . . . . . . . . . . . . . . b b . . . . . . . . .
        . b . . . . . . . . . . . . . . . . . . . b . . . . . . . . . .
        . . b . . . . . . . . . . . . . . . . . . b . . . . . . . . . .
        . . . b . . . . . . . . . . . . . . . . . b . . . . . . . . . .
        . . . . b . . . . . . . . . . . . . . . . . b . . . . . . . . .
        . . . . . b . . . . . . . . . . . . . . . . b . . . . . . . . .
        . . . . . . b . . . . . . . . . . . . . . . b . . . . . . . . .
        . . . . . . . b . . . . . . . . . . . . . . . b . . . . . . . .
        . . . . . . . . b b b b b b b b b b b b b b b b . . . . . . . .
    `
)
splashes.push(newSplash)

// Salvo splash screen with scrolling ships
newSplash = new infoScreens.SplashScreens(
    ['Salvo!'], Color.Yellow,
    [['(C) 2019', 'Robo Technical Group LLC'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown,
    [['Multiplayer Version', 'Up to four', 'human or computer', 'players']], Color.LightBlue
)
newSplash.movingSpriteOptions.mode = infoScreens.SpriteMode.BlankSpace
newSplash.movingSpriteOptions.speed = 10
newSplash.movingSpriteOptions.dir = infoScreens.SpriteDirection.PointsLeft
newSplash.addMovingSprite(
    img`
        . . . . . . . . . . . . . . . . 1 1 1 1 1 . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . 1 1 1 1 . . . . . . . . . .
        . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . .
        . . . . . . . . . . . . . . 1 . . . . . . . . 1 . . . . . . . .
        . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . .
        . . . . . . . . . . . 1 . . . . . . . . . . . . . 1 . . . . . .
        . . . . . . . . . . . 1 . . . . . . . . . . . . . 1 . . . . . .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
)
newSplash.addMovingSprite(
    img`
        . . . . . . . . . 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . .
        . . . . . . . . . 1 1 . . . . . . 1 . . . . . . . . . . . . . .
        . . . . . . . . . 1 . 1 1 1 1 1 1 1 1 . . . . . . . . . . . . .
        . . . . . . . . . 1 . 1 . . . . . . 1 . . . . . . . . . . . . .
        . . . . . . . . . 1 . 1 . . . . . . 1 . . . . . . . . . . . . .
        1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 1 1 1 1 1 1 1 1 1 . . . . .
        1 . . . . . . . . . . 1 1 1 1 1 1 1 1 . . . . . . . . 1 . . . .
        . 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 . . .
        . 1 1 5 5 5 5 . . 5 5 5 5 . . 5 5 5 5 5 . . 5 5 5 5 5 . . 1 . .
        . . 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . 1 .
        . . 1 . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        . . 1 . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . 1 . 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . 1 . 1 . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . . 1 1 . . . . . . . . . . . . . . . . . . . . . . . . 1
        . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
)
splashes.push(newSplash)

// Spacewar! splash screen with static sprites
newSplash = new infoScreens.SplashScreens(
    ['Spacewar!'], Color.BrightGreen,
    [['Spacewar! was', 'developed in 1962'], ['Programmed by', 'Steve Russell'], ['Collaborator', 'Martin Graetz'], ['Collaborator', 'Wayne Wiitanen'], ['Collaborator', 'Bob Saunders'], ['Collaborator', 'Steve Piner'], ['Programmed in ', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown,
    [['Player 1', 'A/D', 'W', 'Q', 'E'],
    ['Action', 'Rotate', 'Thruster', 'Fire', 'Warp'],
    ['Player 2', 'J/L', 'I', 'U', 'O']
    ], Color.BrightGreen
)
newSplash.footer.color = Color.BrightGreen
newSplash.addStaticSprite({
    img: img`
        . . . . . . . 7 . . . . . . . .
        . . . . . . . 7 . . . . . . . .
        . . . . . . . 7 . . . . . . . .
        . . . . . . . 7 . . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . 7 . . . 7 . . . . . .
        . . . . . 7 . . . 7 . . . . . .
        . . . . . 7 . . . 7 . . . . . .
        . . . . . 7 . . . 7 . . . . . .
        . . . . 7 . 7 . 7 . 7 . . . . .
        . . . 7 . 7 7 . 7 7 . 7 . . . .
        . . . 7 . 7 7 . 7 7 . 7 . . . .
        . . 7 . . . 7 . 7 . . . 7 . . .
        . . 7 7 7 7 . 7 . 7 7 7 7 . . .
    `,
    x: 24,
    y: 64
})
newSplash.addStaticSprite({
    img: img`
        . . . . . . . 7 . . . . . . . .
        . . . . . . . 7 . . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 7 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 7 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 . 7 . . . . . . .
        . . . . . . 7 7 7 . . . . . . .
        . . . . . 7 7 . 7 7 . . . . . .
        . . . . 7 . 7 . 7 . 7 . . . . .
        . . . . 7 . 7 7 7 . 7 . . . . .
        . . . . 7 . 7 . 7 . 7 . . . . .
        . . . . 7 7 7 7 7 7 7 . . . . .
    `,
    x: 128,
    y: 64
})
splashes.push(newSplash)

// Splash screen with header image
// Uses part of the title image from Planet Putt Putt
newSplash = new infoScreens.SplashScreens(
    [''], Color.Yellow,
    [['My Game is', '(C) 20XX'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Me']], Color.Brown,
    [['Left/Right = Action', 'Up = Action', 'Down = Action', 'A = Action', 'B = Action']], Color.LightBlue)
let header: Image = img`
    b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b a b b b b b b b b
    b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b a a a b b b b b b b
    b b b b d d d d d b b b b b b b b b b b b b b b b b b b b b b b b b d b b b b b b d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b a b b b b b b b b
    b a b a d d 6 6 6 d d d d a b a b a b a b a b a b a b a b a b a b d d a b a b a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b a b b b b b b b a b a b a b a b a b a b a b a b a b a b a b a b a b b
    b a a a d d 6 6 6 6 6 6 6 d d d a a a a a a a a a a a a a a a a d 6 d a a a a a d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b b b a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 d d d a a a a a a a a a a a a a d 6 d a a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 d d d d a a a a a a a a d 6 6 d a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d d a a a a a d 6 6 6 d a a a d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a d 6 6 6 6 d a a d d d d d d d d d d d d d d d d d 6 6 6 6 6 d d d d d d d 6 6 6 6 6 d d d d d d d d d d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 d 6 6 6 6 6 6 6 6 6 6 6 6 d a a a d d 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 d d d 6 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 d a a d d d d 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d d d d a a a a a a a a a a a a a a a a a a a a a a a a a d a a a a a a d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d a b
    b a a a d d 6 6 6 6 6 d a a a a a a d d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 d d d d a a a a a a a a a a a a a a a a a a a a d d a a a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a b
    b a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 6 6 d d d a a a a a a a a a a a a a a a a d 6 d a a a a a d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a b
    b a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 6 6 6 6 6 d d d a a a a a a a a a a a a a d 6 d a a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a b
    b a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 d d d d a a a a a a a a d 6 6 d a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a b
    b a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d d a a a a a d 6 6 6 d a a a d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a a b
    b a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a a a d 6 6 6 6 d a a d d d d d d d d d d d d d d d d d 6 6 6 6 6 d d d d d d d 6 6 6 6 6 d d d d d d d d d d a a a b a b
    b a a a d d 6 6 6 6 6 d a a a d d d d d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 d 6 6 6 6 6 6 6 6 6 6 6 6 d a a a d d 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a b b b b
    b a a a d d 6 6 6 6 6 d d d d 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 d d d 6 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a b a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 d a a d d d d 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 d a a a a a a d d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a a a b
    b a a a d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a a d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 d a a d d 6 6 6 6 6 d a a a a a a a d 6 6 6 6 6 d a a b d d 6 6 6 6 6 d a a a a d d 6 6 6 6 6 d a a a a a a a a a a a a a a b
    b a c a d d 6 6 6 6 6 6 6 6 6 6 6 6 d d d d d d d a c d d 6 6 6 6 6 d a c a c a c a d 6 6 6 6 6 d a c a d d 6 6 6 6 6 d c a c a d d 6 6 6 6 6 d c a c a c d d 6 6 6 6 6 d a d a c a c a d 6 6 6 6 d c a d d 6 6 6 6 6 d c a c a c a c d 6 6 6 6 6 d c a a d d 6 6 6 6 6 d a c a c d d 6 6 6 6 6 d a c a c a c a c a c a c a c b
    b c c c d d 6 6 6 6 6 d d d d d d d d c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c d d 6 6 6 6 6 d c c c d d d d d 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c d d 6 6 6 6 6 d d d d 6 6 6 6 6 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c d 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c d 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c d 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 6 d c c c c c d 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 d d d d d 7 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 6 6 6 6 6 6 6 d d d d d d d c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c a c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 d d d d d d d d c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d a a a c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d b d a a c c c c c c c a c c b
    b c c c d d 7 7 7 7 7 d c c c c c c a c c c c c c c c d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d a a a c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c a c c c c c c c c c c c c b
    b c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c c d d 6 6 6 6 6 d c c c c c c c d 6 6 6 6 6 d c c c d d 6 6 6 6 6 d c c c c d d 6 6 6 6 6 d c c c c c c c c c c c c c c b
    b c c c d d d d d d d d c c c c c c c c c c c c c c c c c c d d d d d d d d d d d d d d d d c c c c c c d d d d d d d d c c c c d d d d d d d d c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c d 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c a c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c d 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 d c c c c c d 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 d d d d d 7 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c a c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c c c c d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d c c c c c d d 7 7 7 7 7 d c c c c d d 7 7 7 7 7 d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c d d d d d d d d c c c c c c c c c c c c c c c c c a d d d d d d d d d d d d d d d d c c c c c c d d d d d d d d c c c c d d d d d d d d c c c c c c c c c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c a c c c c c c c c c c c c c c c c c c c c c c c c c c b c c c c c c c c c c c c c c c c c c c c c d c c c c c c b
    b c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c b
`
newSplash.backImage = header
splashes.push(newSplash)

// Single option screen
let os: infoScreens.OptionScreen = new infoScreens.OptionScreen(
    ['Salvo!'], Color.Yellow,
    [['Options', ''], ['Salvo! is (C) 2019', 'Robo Technical Group LLC'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown,
    [['Human', '0 players', '1 player', '2 players', '3 players', '4 players'], ['Computer', '0 players', '1 player', '2 players', '3 players', '4 players']], Color.LightBlue,
    true
)
os.titles.font = image.font8
os.headlines.font = image.font5
os.footer.font = image.font5
os.doneText = 'Start!'
os.setSelection(0, 2)
os.setSelection(1, 0)
splashes.push(os)

// Option screen collection
let osColl: infoScreens.OptionScreenCollection = new infoScreens.OptionScreenCollection(
    ['Salvo!'], Color.Yellow,
    [['Options', ''], ['Salvo! is (C) 2019', 'Robo Technical Group LLC'], ['Programmed in', 'MakeCode Arcade'], ['by', 'Alex K.']], Color.Brown
)
osColl.titles.font = image.font8
osColl.headlines.font = image.font5
osColl.footer.font = image.font5
osColl.doneText = 'Start!'
osColl.addScreen('Players',
    [['Human', '0 players', '1 player', '2 players', '3 players', '4 players'],
    ['Computer', '0 players', '1 player', '2 players', '3 players', '4 players']],
    true)
osColl.addScreen('Game Type',
    [['Standard', 'Classic', 'Modern']], false)
osColl.setSelectionForScreen(0, 0, 2)
osColl.setSelectionForScreen(0, 1, 0)
osColl.setSelectionForScreen(1, 0, 0)
splashes.push(osColl)

nextSplash()

// Game loops
game.onUpdate(function () {
    if (game.runtime() >= splashes[currSplash].nextTime) {
        splashes[currSplash].rotate()
    }   // if (game.runtime() >= splashes[currSplash].nextTime)
    switch (currSplash) {
        case 1:
            for (let sprite of sprites.allOfKind(infoScreens.SpriteType.Moving)) {
                let threshold: number = sprite.width / 2
                if (sprite.x > scene.screenWidth() + threshold) {
                    sprite.x = 0 - threshold
                }
                if (sprite.x < 0 - threshold) {
                    sprite.x = scene.screenWidth() + threshold
                }
                if (sprite.y > scene.screenHeight() + threshold) {
                    sprite.y = 0 - threshold
                }
                if (sprite.y < 0 - threshold) {
                    sprite.y = scene.screenHeight() + threshold
                }
            }   // for (sprite)
            break

        case 2:
            if (sprites.allOfKind(infoScreens.SpriteType.Moving).length === 0) {
                splashes[currSplash].showScrollingSprite()
            }   // if (sprites.allOfKind(...))
            break
    }   // switch (currSplash)
})  // game.onUpdate()

// Controller event handlers
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currSplash < FIRST_OPTION_SCREEN) {
        nextSplash()
    } else {
        let curr: infoScreens.OptionScreen = <infoScreens.OptionScreen>splashes[currSplash]
        curr.select()
        if (curr.done) {
            let numPlayers: number
            if (currSplash === FIRST_OPTION_SCREEN) {
                numPlayers = os.getSelection(0) + os.getSelection(1)
            } else {
                numPlayers = osColl.getSelectionForScreen(0, 0) +
                    osColl.getSelectionForScreen(0, 1)
            }   // if (currSplash === FIRST_OPTION_SCREEN)
            if (numPlayers < 2 || numPlayers > 4) {
                if (numPlayers < 2) {
                    game.splash('Must have at least two players.')
                } else {
                    game.splash('Cannot have more than four players.')
                }   // if (numPlayers < 2)
                curr.done = false
            }   // if (numPlayers...)
        }   // if (curr.done)
        if (curr.done) {
            nextSplash()
        }   // if (curr.done)
    }   // if (currSplash < FIRST_OPTION_SCREEN)
})  // controller.A.onEvent()

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currSplash < FIRST_OPTION_SCREEN) {
        nextSplash()
    }   // if (currSplash < FIRST_OPTION_SCREEN)
})  // controller.B.onEvent()

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currSplash < FIRST_OPTION_SCREEN) {
        nextSplash()
    } else {
        let curr: infoScreens.OptionScreen = <infoScreens.OptionScreen>splashes[currSplash]
        curr.moveCursorDown()
    }   // if (currSplash < FIRST_OPTION_SCREEN)
})  // controller.down()

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currSplash < FIRST_OPTION_SCREEN) {
        nextSplash()
    } else {
        let curr: infoScreens.OptionScreen = <infoScreens.OptionScreen>splashes[currSplash]
        curr.moveCursorLeft()
    }   // if (currSplash < FIRST_OPTION_SCREEN)
})  // controller.left()

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currSplash < FIRST_OPTION_SCREEN) {
        nextSplash()
    } else {
        let curr: infoScreens.OptionScreen = <infoScreens.OptionScreen>splashes[currSplash]
        curr.moveCursorRight()
    }   // if (currSplash < FIRST_OPTION_SCREEN)
})  // controller.right()

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currSplash < FIRST_OPTION_SCREEN) {
        nextSplash()
    } else {
        let curr: infoScreens.OptionScreen = <infoScreens.OptionScreen>splashes[currSplash]
        curr.moveCursorUp()
    }   // if (currSplash < FIRST_OPTION_SCREEN)
})  // controller.up()

// Other functions
function nextSplash(): void {
    currSplash++
    if (currSplash >= splashes.length) {
        currSplash = 0
    }   // if (currSplash > splashes.length)
    splashes[currSplash].build()
}   // nextSplash()