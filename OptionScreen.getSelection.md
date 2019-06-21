# OptionScreen.getSelection method

Gets the selected option for an option group.

```typescript
OptionScreen.getSelection(index: number = 0): number
```

## Parameters

- `index: number` Option group of selection to retrieve. Default is `0` (first option group).

## Return value

A `number` representing the option that the user selected in the option group. The index is zero-based, so if the user selected the first option, `getSelection` will return `0` (zero).