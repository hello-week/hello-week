# Languages

HelloWekk supports multiple languages.

The default is **English**, but other available translations are available in the `dist/langs` directory.
You simply need to indicate which language you want at HelloWeek initialization.

To add more languages, simply translate the example below, to the language you want and include this
file in `dist/langs` or other directory you wanted, then just initialize the calendar with you new language,
and if you changed the directory you only need to indicate the `langFolder` in HelloWeek options.

> Hello Week, there are plans to use the `Intl.DateTimeFormat` to optimize the performance of the calendar, taking that responsibility from the consumer side and passing it to the browser, that way we will no longer need to create/import the external languages.

**Quick Example:**

```js
new HelloWeek({
    ...{ /** other options... */}
    lang: 'en',
});
```

## Support

| Language   | Naming |
| ---------- | ------ |
| English    | `en`   |
| German     | `de`   |
| Spanish    | `es`   |
| Italian    | `it`   |
| Portuguese | `pt`   |
| Occitan    | `oc`   |
| Chinese    | `zh`   |

### Structure

```json
{
    "days": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "daysShort": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    "months": [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    "monthsShort": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    "today": "Today",
    "clear": "Clear"
}
```
