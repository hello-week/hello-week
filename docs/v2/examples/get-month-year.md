# Get Month and Year

Get month or year.

## Usage

```js
const calendar = new HelloWeek({
    selector: '.calendar',
    onNavigation: () => {
        console.log('Current Month: ', calendar.date.getMonth());
        console.log('Current Year: ', calendar.date.getYear());
    },
});
```

## Demonstration

<iframe
    src="docs/v2/demos/get-month-year.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
