
# Datepicker

#### Lightweight and simple datepicker with no dependencies.

## Installation

Setup is trivially easy.

#### HTML Markup

```html
<div class="datepicker">
    <div class="datepicker__header">
        <button class="demo-prev">Prev</button>
        <div class="datepicker__label"></div>
        <button class="demo-next">Next</button>
    </div>
    <div class="datepicker__week"></div>
    <div class="datepicker__month"></div>
</div>
```


#### Init Plugin

```html
<script src="datepicker.min.js"></script>
<script>
  new Datepicker();
</script>
```

## Options

Datepicker comes with a few (optional) settings that you can change by passing an object as an argument.
Default values are presented below.

```js
new Datepicker({
    selector: '.datepicker',
    lang: 'en',
    format: false,
    monthShort: false,
    weekShort: true,
    disablePastDays: false,
    multiplePick: true,
    minDate: false,
    maxDate: false,
    onLoad: () => { /** callback function */ },
    onChange: () => { /** callback function */ },
    onSelect: () => { /** callback function */ },
});
```

### Supported Browsers:

- IE10
- Chrome 12
- Firefox 16
- Opera 15
- Safari 5.1

## License

**Datepicker** is open-sourced software licensed under the \[MIT license\](http://opensource.org/licenses/MIT)

Created with ♥️ by [@mauroreisvieira](https://twitter.com/mauroreisvieira) in **Portugal**
