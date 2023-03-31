# Callbacks

Callbacks are executed whenever something in the calendar is triggered, that way consumer as the ability to listen for any changes and perform your own actions.

**Quick Example:**

```js
new HelloWeek({
    ...{ /** other options... */}
    onLoad: () => {},
    onReset: () => {},
    onSelect: () => {},
    onNavigation: () => {},
    beforeCreateDay: (node) => node,
});
```

## Properties

| Property          | Value Type                         | Description                                         |
| ----------------- | ---------------------------------- | --------------------------------------------------- |
| `onLoad`          | `() => void`                       | Callback executed immediately after initialization. |
| `onReset`         | `() => void`                       | Callback executed when `reset` method is triggered. |
| `onSelect`        | `() => void`                       | Callback executed on select the day.                |
| `onNavigation`    | `() => void`                       | Callback executed after month change.               |
| `beforeCreateDay` | `(node: DayOptions) => DayOptions` | Callback executed before create each day.           |
