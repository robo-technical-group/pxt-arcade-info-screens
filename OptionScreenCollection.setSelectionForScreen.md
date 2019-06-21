# OptionScreenCollection.setSelectionForScreen method

Sets the selected option for the given option screen and group.

```typescript
OptionScreenCollection.setSelectionForScreen(screen: number, index: number = 0, value: number = -1): void
```

## Parameters

- `screen: number` Index of screen in collection. Indices are zero-based, so `0` is the first screen.
- `index: number?` Index of option group for selection. Default is `0` (the first option group)
- `value: number?` Option to select; `-1` for none. Default is `-1`.