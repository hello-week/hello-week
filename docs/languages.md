## Languages

HelloWekk supports multiple languages.
The default is **English**, but other available translations are available in the `dist/langs` directory.
You simply need to indicate which language you want at HelloWeek initialization.

To add more languages, simply translate the example below, to the language you want and include this
file in `dist/langs` or other directory you wanted, then just initialize the calendar with you new language,
and if you changed the directory you only need to indicate the `langFolder` in HelloWeek options.

#### JSON Structure

```json
{
    "days": [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    "daysShort": [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ],
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
