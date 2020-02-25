![Travis (.org)](https://img.shields.io/travis/mauroreisvieira/hello-week?style=for-the-badge)
[![Releases](https://img.shields.io/github/release/mauroreisvieira/hello-week.svg?color=%234c1&style=for-the-badge)](https://github.com/mauroreisvieira/hello-week/releases)
[![NPM](https://img.shields.io/npm/dt/hello-week.svg?style=for-the-badge)](https://www.npmjs.com/package/hello-week)
[![Issues](https://img.shields.io/github/issues/mauroreisvieira/hello-week.svg?style=for-the-badge)](https://github.com/mauroreisvieira/hello-week/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?color=%234c1&style=for-the-badge)](https://github.com/mauroreisvieira/hello-week/blob/master/LICENSE)

## Quick start

#### Installation

```bash
# Using NPM
npm install hello-week --D

# Using Yarn
yarn add hello-week
```

#### Including files:

```html
<link rel="stylesheet" type="text/css" href="hello.week.css" />
<link rel="stylesheet" type="text/css" href="default.theme.css" />

<script type="text/javascript" src="hello.week.min.js"></script>
<script>
  new HelloWeek();
</script>
```

#### HTML Markup

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
  langFolder: './langs/',
  format: 'DD/MM/YYYY',
  defaultDate: null,
  todayHighlight: true,
  weekStart: 0,
  monthShort: false,
  weekShort: true,
  minDate: null,
  maxDate: null,
  daysSelected: null,
  daysHighlight: null,
  multiplePick: false,
  disableDaysOfWeek: null,
  disableDates: null,
  disablePastDays: false,
  range: false,
  locked: false,
  rtl: false,
  nav: ['◀', '▶'],
  timezoneOffset: new Date().getTimezoneOffset(),
  onLoad: () => {},
  onClear: () => {},
  onNavigation: () => {},
  onSelect: (data: IDayOptions) => IDayOptions;
  beforeCreate: (data: IDayOptions) => IDayOptions;
});
```

```diff
new HelloWeek({
+   timezoneOffset: new Date().getTimezoneOffset(),
-   onSelect: () => {}
+   onSelect: (data: IDayOptions) => data
+   beforeCreate: (data: IDayOptions) => data
});
```

### Useful links

- [Examples](https://hello-week.now.sh/#/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

### Supported Browsers:

- Chrome 49
- Firefox 31
- Opera 36
- Safari 9.3
- Edge 17
- iOS Safari 6.0

### License

**Hello Week** is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
