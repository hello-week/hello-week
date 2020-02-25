# Callbacks

This gives you the ability to listen for any changes and perform your own actions.

**Quick Example:**

```js
new HelloWeek({
  onNavigation: () => {}
  onSelect: () => {}
});
```

## Properties

| Property                 | Value Type   | Description                                |
| ------------------------ | ------------ | ------------------------------------------ |
| `onNavigation() => void` | `attachable` | Triggered when the user change month/year. |
| `onSelect() => void`     | `attachable` | Triggered when the user clicks on a day.   |
