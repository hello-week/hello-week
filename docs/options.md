## Options

**Hello Week** comes with a few options, that you can change by passing an object as an argument.

| **Prop**           | **Type**                      | **Default**     | **Description**                                                                                                            |
| ------------------ | ----------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| selector           | `string`                      | `.hello-week`   | Define selector to use as a date picker.                                                                                   |
| lang               | `string`                      | `en`            | Determines which translation file will be read.                                                                            |
| langFolder         | `string`                      | `./dist/langs/` | Determines folder path of your languages.                                                                                  |
| format             | `string`                      | `dd/mm/yyyy`    | The format also determines which components are displayed.                                                                 |
| monthShort         | `boolean`                     | `false`         | Sets the format of the month.                                                                                              |
| weekShort          | `boolean`                     | `true`          | Sets the format of the week.                                                                                               |
| defaultDate        | `null`                        | `null`          | Define the start date in calendar.                                                                                         |
| minDate            | `Date`                        | `null`          | Disable date selections before this date. When set to null, there is no minimum.                                           |
| maxDate            | `Date`                        | `null`          | Disable date selections after this date. When set to null, there is no maximum.                                            |
| disabledDaysOfWeek | `number[]`                    | `null`          | Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday), multiple values should be comma-separated |
| disableDates       | `string[]/[string, string][]` | `null`          | Array of date strings or a single date string to make days disabled.                                                       |
| weekStart          | `number`                      | `0`             | Day of the week start. 0 (Sunday) to 6 (Saturday).                                                                         |
| timezoneOffset     | `number`                      |                 |                                                                                                                            |
| daysSelected       | `string[]`                    | `null`          | Array of strings with day/days to make selected.                                                                           |
| daysHighlight      | `DaysHighlight[]`             | `null`          | Array of date strings or a single date string to make days with highlight.                                                 |
| multiplePick       | `boolean`                     | `false`         | Allows multiple days selection.                                                                                            |
| disablePastDays    | `boolean`                     | `false`         | Disable date before the current day.                                                                                       |
| todayHighlight     | `boolean`                     | `true`          | Highlights the current date.                                                                                               |
| range              | `boolean`                     | `false`         | Allows you to select array range of days.                                                                                  |
| locked             | `boolean`                     | `false`         | Sets all days of the week locked.                                                                                          |
| rtl                | `boolean`                     | `false`         | Allows layout for languages written from right to left (like Hebrew or Arabic).                                            |
| nav                | `string[]`                    | `['◀', '▶']`    | Show next/prev buttons.                                                                                                    |
| onLoad             | `() => void`                  |                 |                                                                                                                            |
| onNavigation       | `() => void`                  |                 |                                                                                                                            |
| onSelect           | `() => void`                  |                 |                                                                                                                            |
| onClear            | `() => void`                  |                 |                                                                                                                            |
