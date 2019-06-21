# OptionScreenCollection.constructor

```typescript
new OptionScreenCollection(titles: string[], titlesColor?: number,
  headlines?: string[][], headlinesColor?: number,
  backColor?: number, delay?: number)
```

## Parameters

- `titles: string[]` Array of strings to display as the title.
- `titlesColor?: number` Color to use when printing titles. Default is 5 (yellow).
- `headlines?: string[][]` Sets of strings to display as headlines.
- `headlinesColor?: number` Color to use when printing headlines. Default is 14 (brown).
- `backColor?: number` Color to use for the background. Default is 15 (black)
- `delay?: number` Interval in milliseconds when screens will rotate. Default is 5000 milliseconds (or 5 seconds).