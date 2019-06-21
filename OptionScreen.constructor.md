# OptionScreen.constructor

```typescript
new OptionScreen(titles: string[], titlesColor?: number,
  headlines?: string[][], headlinesColor?: number,
  options: string[][], optionsColor?: number,
  hasHeaders: boolean = false,
  backColor?: number, delay?: number)
```

## Parameters

- `titles: string[]` Array of strings to display as the title.
- `titlesColor?: number` Color to use when printing titles. Default is 5 (yellow).
- `headlines?: string[][]` Sets of strings to display as headlines.
- `headlinesColor?: number` Color to use when printing headlines. Default is 14 (brown).
- `options: string[][]` Sets of strings (up to three sets) to display in the center of the screen. When multiple sets are used, the sets are printed in columns.
- `optionsColor?: number` Color to use when printing the options. Default is 9 (light blue).
- `hasHeaders: boolean` Whether the option groups have headers (so that they cannot be selected). Default is `false`.
- `backColor?: number` Color to use for the background. Default is 15 (black)
- `delay?: number` Interval in milliseconds when screens will rotate. Default is 5000 milliseconds (or 5 seconds).