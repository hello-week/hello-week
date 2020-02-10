# Callbacks

This gives you the ability to listen for any changes and perform your own actions.

**Quick Example:**

```js
new HelloWeek({
  onSelect: () => {}
});
```

### Properties

| Property                                     | Value Type   | Description                                |
| -------------------------------------------- | ------------ | ------------------------------------------ |
| `onLoad() => void`                           | `attachable` | Dispatch immediately after initialization. |
| `onNavigation() => void`                     | `attachable` | Dispatch after month change.               |
| `onSelect() => void`                         | `attachable` | Dispatch on select the day.                |
| `onClear() => void`                          | `attachable` | Dispatch on clear calendar.                |
| `beforeCreateDay(data: IDayOptions) => void` | `attachable` | Dispatch before create day.                |
