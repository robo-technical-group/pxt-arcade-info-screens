# OptionScreen.setSelection method

Sets the selected option for a given option group.

```typescript
OptionScreen.setSelection(index: number = 0, value: number = -1): void
```

## Parameters

- `index: number` Option group for selection. Indices are zero-based, so the first option group has `0` (zero) for its index.
- `value: number` Option to select; `-1` for none. Default is `-1`.