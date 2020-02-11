# Options

Hello Week comes with a few (optional) settings that you can change by passing an object as an argument

**Quick Example:**

```js
new HelloWeek({
  selector: '#calendar'
});
```

## Properties

| Property            | Value Type           | Default Value   | Description                                                                      |
| ------------------- | -------------------- | --------------- | -------------------------------------------------------------------------------- |
| `selector`          | `string`             | `.hello-week`   | Define selector to use as a calendar.                                            |
| `lang`              | `string`             | `en`            | Determines which translation file will be read.                                  |
| `langFolder`        | `string`             | `./dist/langs/` | Determines folder path of your languages.                                        |
| `format`            | `string`             | `dd/mm/yyyy`    | Format also determines which components are displayed.                           |
| `weekShort`         | `boolean`            | `true`          | Sets the format of the week.                                                     |
| `monthShort`        | `boolean`            | `false`         | Sets the format of the month.                                                    |
| `multiplePick`      | `boolean`            | `false`         | Allows multiple days selection.                                                  |
| `defaultDate`       | `boolean`            | `null`          | Define initial date displayed when the calendar first loads.                     |
| `todayHighlight`    | `boolean`            | `true`          | Highlights the current date.                                                     |
| `disablePastDays`   | `boolean`            | `false`         | Disable date before the current day.                                             |
| `disableDaysOfWeek` | `array`              | `null`          | Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). |
| `disableDates`      | `array`              | `null`          | Array of date strings or a single date string to make days disabled.             |
| `daysHighlight`     | `array`              | `null`          | Array of date strings or a single date string to make days with highlight.       |
| `daysSelected`      | `array`              | `null`          | Array of strings with day/days to make selected.                                 |
| `range`             | `boolean`            | `false`         | Allows you to select array range of days.                                        |
| `rtl`               | `boolean`            | `false`         | Allows layout for languages written from right to left (like Hebrew or Arabic).  |
| `locked`            | `boolean`            | `false`         | Sets all days of the week locked.                                                |
| `weekStart`         | `number`             | `0`             | Day of the week start. 0 (Sunday) to 6 (Saturday).                               |
| `minDate`           | `number` or `string` | `null`          | Disable date selections before this date. When set to null, there is no minimum. |
| `maxDate`           | `number` or `string` | `null`          | Disable date selections after this date. When set to null, there is no maximum.  |
| `nav`               | `array`              | `['◀', '▶']`    | Show next/prev buttons.                                                          |
