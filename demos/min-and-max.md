## Min & Max Dates

#### Overview
Restrict the range of selectable dates with the minDate and maxDate options. Set the beginning and end dates

#### HTML Structure
```html
<div style="display: flex; margin: -1rem;">
    <div style="margin: 1rem;" class="to"></div>
    <div style="margin: 1rem;" class="from"></div>
</div>
```

#### JavaScript Initialization
```js
const to = new HelloWeek({
    selector: '.to',
    lang: 'pt',
    todayHighlight: false,
    onSelect: () => {
        from.setMinDate(to.getDaySelected());
        from.update();
    }
});

const from = new HelloWeek({
    selector: '.from',
    todayHighlight: false,
    onSelect: () => {
        to.setMaxDate(from.getDaySelected());
        to.update();
    }
});
```
