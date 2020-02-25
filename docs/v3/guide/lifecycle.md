# Lifecycle

Hello Week relies on a set of steps, executed in a precise order, in order to provide the functionalities you expect from it.

**Quick Example:**

```js
new HelloWeek({
  beforeLoad: () => {}
  onLoad: () => {}
  beforeCreateDay: (data) => {}
});
```

## Hook into the lifecycle

| Property                                     | Value Type   | Description                               |
| -------------------------------------------- | ------------ | ----------------------------------------- |
| `beforeLoad() => void`                       | `attachable` | Triggered immediately before created.     |
| `onLoad() => void`                           | `attachable` | Triggered immediately after mounted.      |
| `beforeCreateDay(data: IDayOptions) => void` | `attachable` | Triggered immediately before created day. |
