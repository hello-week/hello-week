![Hello Week](public/images/helloweek.png)

[![GitHub Tag](https://img.shields.io/github/release/mauroreisvieira/hello-week.svg?style=for-the-badge)](https://github.com/mauroreisvieira/hello-week/releases)
[![npm](https://img.shields.io/npm/dt/hello-week.svg?style=for-the-badge)](https://www.npmjs.com/package/hello-week)
[![GitHub issues](https://img.shields.io/github/issues/mauroreisvieira/hello-week.svg?style=for-the-badge)](https://github.com/mauroreisvieira/hello-week/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://github.com/mauroreisvieira/hello-week/blob/master/LICENSE)

## Quick start

#### Installation

```bash
npm install hello-week --save
```

```bash
yarn add hello-week
```

#### Including Files:

**CSS**

```html
<link rel="stylesheet" type="text/css" href="hello.week.min.css" />
<link rel="stylesheet" type="text/css" href="hello.week.theme.min.css" />
```

**JS**

```html
<script type="module">
    import HelloWeek from 'hello.week.esm.js';
    new HelloWeek();
</script>
```

**HTML Markup**

```html
<div class="hello-week">
    <div class="navigation">
        <button class="prev">Prev</button>
        <div class="period"></div>
        <button class="next">Next</button>
    </div>
    <div class="week"></div>
    <div class="month"></div>
</div>
```

## Options

HelloWeek comes with a few (optional) settings that you can change by passing an object as an argument.
Default values are presented below.

```js
new HelloWeek({
    selector: '.hello-week',
    lang: 'en',
    langFolder: './dist/langs/',
    format: 'DD/MM/YYYY',
    weekShort: true,
    monthShort: false,
    multiplePick: false,
    defaultDate: null,
    minDate: null,
    maxDate: null,
    disabledDaysOfWeek: null,
    disableDates: null,
    weekStart: 0, // week start on Sunday
    timezoneOffset: new Date().getTimezoneOffset(),
    daysSelected: null,
    daysHighlight: null,
    disablePastDays: false,
    todayHighlight: true,
    range: false,
    locked: false,
    rtl: false,
    nav: ['◀', '▶'],
    onClear: () => {},
    onLoad: () => {},
    onNavigation: () => {},
    onSelect: () => {},
    beforeCreateDay: (node) => {},
});
```

### Useful links

-   [Demos](https://hello-week.com/#/)
-   [Changelog](CHANGELOG.md)
-   [Contributing](CONTRIBUTING.md)

### Supported Browsers:

-   Chrome 49
-   Firefox 31
-   Opera 36
-   Safari 9.3
-   Edge 17
-   iOS Safari 6.0

### License

**Hello Week** is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
