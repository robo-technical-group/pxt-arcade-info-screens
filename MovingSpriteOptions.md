# MovingSpriteOptions interface

Configuration for moving sprites.

## Fields

- `imgs: Image[]` Collection of images for the moving sprites.
- `dir: SpriteDirection` A value from the [`SpriteDirection`](SpriteDirection.md) enum representing how the images "point."
- `mode: SpriteMode` A value from the [`SpriteMode`](SpriteMode.md) enum
- `speed: number` Speed at which the sprite will move.
- `y: number` Vertical coordinate for sprites in Blank Space mode.