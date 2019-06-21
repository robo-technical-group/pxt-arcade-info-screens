# RotatingScreens.constructor

```typescript
new RotatingScreens(titles: string[], titlesColor?: number,
  headlines?: string[][], headlinesColor?: number,
  footer?: string, footerColor?: number,
  midText?: string[][], midTextColor?: number,
  backColor?: number, delay?: number)
```

## Parameters

- `titles: string[]` Array of strings to display as the title.
- `titlesColor?: number` Color to use when printing titles. Default is 5 (yellow).
- `headlines?: string[][]` Sets of strings to display as headlines.
- `headlinesColor?: number` Color to use when printing headlines. Default is 14 (brown).
- `footer?: string` Text to print at the bottom of the screen.
- `footerColor?: number` Color to use when printing footer. Default is 1 (white).
- `midText?: string[][]` Sets of strings (up to three sets) to display in the center of the screen. When multiple sets are used, the sets are printed in columns.
- `midTextColor?: number` Color to use when printing the mid-text. Default is 9 (light blue).
- `backColor?: number` Color to use for the background. Default is 15 (black)
- `delay?: number` Interval in milliseconds when screens will rotate. Default is 5000 milliseconds (or 5 seconds).