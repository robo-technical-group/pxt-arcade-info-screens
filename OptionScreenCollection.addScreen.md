# OptionScreenCollection.addScreen method

Adds a screen to the options screen collection.

```typescript
OptionScreenCollection.addScreen(name: string, options: string[][], hasHeaders: boolean = false): void
```

## Parameters

- `name: string` Name of the screen, which will appear as a tab if more than one screen is in the collection.
- `options: string[][]` Option groups (up to three) to show on screen.
- `hasHeaders: boolean` Whether option groups contain headers