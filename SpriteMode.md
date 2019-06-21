# SpriteMode enum

Indicates how moving sprites should be placed and animated on the screen.

# Values

- `SpriteMode.BlankSpace` Sprites move horizontally, one at a time, within space between headlines and mid-screen text. Will need to call `RotatingScreens.showScrollingSprite` to make next sprite appear.
- `SpriteMode.Random` Sprites are all placed on screen and move in random directions, bouncing off of walls.
- `SpriteMode.RandomWillUpdate` Sprites are all placed on screen and move in random directions; `game.onUpdate` will handle off-screen sprites.