# Methods

Hello Week has some methods that allow gives you the ability to manipulate.

**Quick Example:**

```js
const calendar = new HelloWeek({
    /** options */
});
calendar.getDays();
```

## Public API

| Property                                 | Value Type                       | Description                                                                             |
| ---------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| `prev()`                                 | `(callback: () => void) => void` | Change the month to the previous, also you can send a callback function as a parameter. |
| `next()`                                 | `(callback: () => void) => void` | Change the month to the next, also you can send a callback function as a parameter.     |
| `reset()`                                | `() => void`                     | Reset calendar.                                                                         |
| `forceUpdate()`                          | `() => void`                     | Force the update, redraws the calendar and reset the events.                            |
| `destroy()`                              | `() => void`                     | Destroy the calendar and remove the instance from the target element.                   |
| `goToDate(date: string)`                 | `() => void`                     | Move the calendar to arbitrary day.                                                     |
| `getDays()`                              | `() => void`                     | Returns the selected days with the format specified.                                    |
| `getDaysHighlight()`                     | `() => void`                     | Returns the highlight dates.                                                            |
| `setDaysHighlight(daysHighlight: array)` | `() => void`                     | Set highlight dates.                                                                    |
| `setMultiplePick(state: boolean)`        | `() => void`                     | Set calendar with multiple pick.                                                        |
| `setDisablePastDays(state: boolean)`     | `() => void`                     | Set calendar with disable past days.                                                    |
| `setTodayHighlight(state: boolean)`      | `() => void`                     | Sets calendar with today highlight.                                                     |
| `setRange(state: boolean)`               | `() => void`                     | Toggle status of range.                                                                 |
| `setLocked(state: boolean)`              | `() => void`                     | Set calendar locked.                                                                    |
| `setMinDate(date: string)`               | `() => void`                     | Set min date.                                                                           |
| `setMaxDate(date: string)`               | `() => void`                     | Set max date.                                                                           |
