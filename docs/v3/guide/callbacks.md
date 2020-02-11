# Callbacks

This gives you the ability to listen for any changes and perform your own actions.

**Quick Example:**

```js
new HelloWeek({
  onSelect: () => {}
});
```

## Properties

| Property                               | Value Type   | Description                                 |
| -------------------------------------- | ------------ | ------------------------------------------- |
| `onLoad() => void`                     | `attachable` | Triggered immediately after initialization. |
| `onNavigation() => void`               | `attachable` | Triggered when the user change month/year.  |
| `onSelect() => void`                   | `attachable` | Triggered when the user clicks on a day.    |
| `onClear(data: IDayOptions) => void`   | `attachable` | Triggered when the user clear calendar.     |
| `dayRender(data: IDayOptions) => void` | `attachable` | A hook for modifying a day DOM              |
