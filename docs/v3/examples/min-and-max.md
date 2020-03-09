# Min & Max Dates

Restrict the range of selectable dates with the minDate and maxDate options. Set the beginning and end dates

## Usage

```js
const to = new HelloWeek({
    selector: '.to',
    todayHighlight: false,
    onSelect: () => {
        from.setMinDate(to.getDaySelected());
        from.update();
    },
});

const from = new HelloWeek({
    selector: '.from',
    todayHighlight: false,
    onSelect: () => {
        to.setMaxDate(from.getDaySelected());
        to.update();
    },
});
```

## Demonstration

<iframe
    src="docs/v3/demos/min-max.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
