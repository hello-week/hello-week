# Callbacks

This gives you the ability to listen for any changes and perform your own actions.

**Quick Example:**

```js
new HelloWeek({
    onSelect: () => {},
});
```

## Properties

| Property          | Value Type    | Description                                |
| ----------------- | ------------- | ------------------------------------------ |
| `onClear`         | `attachable;` | Dispatch on clear calendar.                |
| `onLoad`          | `attachable`  | Dispatch immediately after initialization. |
| `onSelect`        | `attachable`  | Dispatch on select the day.                |
| `onNavigation`    | `attachable`  | Dispatch after month change.               |
| `beforeCreateDay` | `DayOptions`  | Dispatch before create each day.           |
