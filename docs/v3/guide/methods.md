# Methods

Hello Week has some methods that allow gives you the ability to manipulate.

**Quick Example:**

```js
const calendar = new HelloWeek();
calendar.getDays();
```

## Public API

| Property                                                                           | Value Type    | Description                                                           |
| ---------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------- |
| `prev()`                                                                           | `triggerable` | Moves the calendar one month back.                                    |
| `next()`                                                                           | `triggerable` | Moves the calendar one month forward.                                 |
| `prevYear()`                                                                       | `triggerable` | Moves the calendar back one year.                                     |
| `nextYear()`                                                                       | `triggerable` | Moves the calendar forward one year.                                  |
| `update()`                                                                         | `triggerable` | Update and redraws the events for the current month.                  |
| `reset(options: {}, callback?: () => void)`                                        | `triggerable` | Reset calendar.                                                       |
| `destroy()`                                                                        | `triggerable` | Destroy the calendar and remove the instance from the target element. |
| `goToDate(date: string)`                                                           | `triggerable` | Move the calendar to arbitrary day.                                   |
| `getDays()`                                                                        | `triggerable` | Returns the selected days with the format specified.                  |
| `getDaysHighlight()`                                                               | `triggerable` | Returns the highlight dates.                                          |
| `setOptions(options?: Partial<IOptions>, callback?: (data: IOptions) => IOptions)` | `triggerable` | Set new options.                                                      |
| `setDaysHighlight(daysHighlight: [number])`                                        | `triggerable` | Set highlight dates.                                                  |
| `setIntervalRange(value: string[] / number[])`                                     | `triggerable` | Sets interval of dates                                                |
| `setMinDate(date: string)`                                                         | `triggerable` | Set min date.                                                         |
| `setMaxDate(date: string)`                                                         | `triggerable` | Set max date.                                                         |
