<p align="center"><img src="assets/images/hello-week.png" width="360"/></p>

See the demo: [Hello Week](https://maurovieirareis.github.io/hello-week/).

## Quick start

### Installation

```bash
npm install hello-week --save
```

```bash
yarn add hello-week
```

#### HTML Markup

```html
<div class="hello-week">
    <div class="hello-week__header">
        <button class="demo-prev">Prev</button>
        <div class="hello-week__label"></div>
        <button class="demo-next">Next</button>
    </div>
    <div class="hello-week__week"></div>
    <div class="hello-week__month"></div>
</div>
```

#### Init Plugin

```html
<script src="hello-week.min.js"></script>
<script>
  new HelloWeek();
</script>
```

## Options

HelloWeek comes with a few (optional) settings that you can change by passing an object as an argument.
Default values are presented below.

```js
new HelloWeek({
    selector: '.hello-week',
    lang: 'en',
    format: 'YYYY-MM-DD',
    monthShort: true,
    weekShort: true,
    multiplePick: false,
    defaultDate: false,
    todayHighlight: true,
    disablePastDays: true,
    disabledDaysOfWeek: [0, 6],
    disableDates: [
        ['2018-04-16', '2018-04-24'],
        ['2018-05-16', '2018-05-22']
    ],
    onLoad: () => { /** callback function */ },
    onChange: () => { /** callback function */ },
    onSelect: () => { /** callback function */ },
});
```

`selector`
Define selector to use as a datepicker.

```
Default: false
Accepts: string
```

`lang`
Determines which translation file will be read.

```
Default: false
Accepts: string
```

`format`
See the table of available formats. The format also determines which components are displayed.
```
Default: false
Accepts: string
```

`weekShort`
Sets the format of the week.
```
Default: true
```

`monthShort`
Sets the format of the month.
```
Default: false
```

`multiplePick`
Alows multiple days selection.
```
Default: false
```

`defaultDate`
Define the start date in calendar.
```
Default: false
```

`todayHighlight`
If true, highlights the current date.
```
Default: true
```

`disablePastDays`
Disable date before the current day.
```
Default: false
```

`disabledDaysOfWeek`
Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). Multiple values should be comma-separated.
```
Default: false
```

`disableDates`
Array of date strings or a single date string formatted in the given date format
```
Default: false
```

`minDate`
Disable date selections before this date.
```
Default: false
Accepts: timestamp
```

`maxDate`
Disable date selections after this date.
```
Default: false
Accepts: timestamp
```

`onLoad`
Runs immediately after initialization.
```
Default: false
Accepts: function
```

`onChange`
Runs after month change.
```
Default: false
Accepts: function
```

`onSelect`
Runs on select the day.
```
Default: false
Accepts: function
```

### Date Format

Input | Example | Description |
--- | --- | ---|
`dd` | `1..31` | Day of the month without leading zeros.
`DD` | `01..31` | Day of the month, 2 digits with leading zeros.
`mm` | `1..12` | Numeric representation of a month, without leading zeros
`MM` | `01..12` | Month number, with leading zeros.
`mmm` | `Jan..Dec` | Month name with short textual representation.
`MMM` | `January..December` | A full textual representation of a month.
`yyyy` or `YYYY` | `2018` | A full numeric representation of a year, 4 digits.
`yy` or `YY` | `18` |   A two digit representation of a year.

### Supported Browsers:

- IE11
- Chrome 12
- Firefox 16
- Opera 15
- Safari 6

## License

**Hello Week** is open-sourced software licensed under the \[MIT license\](http://opensource.org/licenses/MIT)

Created with ♥️ by [@mauroreisvieira](https://twitter.com/mauroreisvieira) in **Portugal**
