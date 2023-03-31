# Methods

Hello Week has some methods that allow gives you the ability to manipulate.

**Quick Example:**

```js
const calendar = new HelloWeek();
calendar.getDays();
```

## Public API

| Property                                    | Value Type    | Description                                                                               |
| ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `prev()`                                    | `() => void` | Change the month to the previous, also you can send a callback function like a parameter. |
| `next()`                                    | `() => void` | Change the month to the next, also you can send a callback function like a parameter.     |
| `update()`                                  | `() => void` | Update and redraws the events for the current month.                                      |
| `reset(options: {}, callback?: () => void)` | `() => void` | Reset calendar.                                                                           |
| `destroy()`                                 | `() => void` | Destroy the calendar and remove the instance from the target element.                     |
| `goToDate(date: string)`                    | `() => void` | Move the calendar to arbitrary day.                                                       |
| `getDays()`                                 | `() => void` | Returns the selected days with the format specified.                                      |
| `getDaysHighlight()`                        | `() => void` | Returns the highlight dates.                                                              |
| `setDaysHighlight(daysHighlight: array)`    | `() => void` | Set highlight dates.                                                                      |
| `setMultiplePick(state: boolean)`           | `() => void` | Set calendar with multiple pick.                                                          |
| `setDisablePastDays(state: boolean)`        | `() => void` | Set calendar with disable past days.                                                      |
| `setTodayHighlight(state: boolean)`         | `() => void` | Sets calendar with today highlight.                                                       |
| `setRange(state: boolean)`                  | `() => void` | Toggle status of range.                                                                   |
| `setLocked(state: boolean)`                 | `() => void` | Set calendar locked.                                                                      |
| `setMinDate(date: string)`                  | `() => void` | Set min date.                                                                             |
| `setMaxDate(date: string)`                  | `() => void` | Set max date.                                                                             |
