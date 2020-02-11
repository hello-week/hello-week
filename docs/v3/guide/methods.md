# Methods

Hello Week has some methods that allow gives you the ability to manipulate.

**Quick Example:**

```js
const calendar = new HelloWeek();
calendar.getDays();
```

## Public API

| Property                                    | Value Type    | Description                                                           |
| ------------------------------------------- | ------------- | --------------------------------------------------------------------- |
| `prev()`                                    | `triggerable` | Moves the calendar one month back.                                    |
| `next()`                                    | `triggerable` | Moves the calendar one month forward.                                 |
| `prevYear()`                                | `triggerable` | Moves the calendar back one year.                                     |
| `nextYear()`                                | `triggerable` | Moves the calendar forward one year.                                  |
| `update()`                                  | `triggerable` | Update and redraws the events for the current month.                  |
| `reset(options: {}, callback?: () => void)` | `triggerable` | Reset calendar.                                                       |
| `destroy()`                                 | `triggerable` | Destroy the calendar and remove the instance from the target element. |
| `goToDate(date: string)`                    | `triggerable` | Move the calendar to arbitrary day.                                   |
| `getDays()`                                 | `triggerable` | Returns the selected days with the format specified.                  |
| `getDaysHighlight()`                        | `triggerable` | Returns the highlight dates.                                          |
| `setDaysHighlight(daysHighlight: array)`    | `triggerable` | Set highlight dates.                                                  |
| `setMultiplePick(state: boolean)`           | `triggerable` | Set calendar with multiple pick.                                      |
| `setDisablePastDays(state: boolean)`        | `triggerable` | Set calendar with disable past days.                                  |
| `setTodayHighlight(state: boolean)`         | `triggerable` | Sets calendar with today highlight.                                   |
| `setRange(state: boolean)`                  | `triggerable` | Toggle status of range.                                               |
| `setLocked(state: boolean)`                 | `triggerable` | Set calendar locked.                                                  |
| `setMinDate(date: string)`                  | `triggerable` | Set min date.                                                         |
| `setMaxDate(date: string)`                  | `triggerable` | Set max date.                                                         |
