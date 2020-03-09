# Reset

Method reset calendar to initial value.

## Usage

```js
const calendar = new HelloWeek({
    selector: '.calendar',
    langFolder: './langs/',
    todayHighlight: true,
    minDate: '2020-10-10',
    maxDate: '2021-03-28',
});

document.querySelector('.btn').addEventListener('click', () => {
    calendar.setOptions({
        todayHighlight: false,
        minDate: false,
        maxDate: false,
    });
});
```

## Demonstration

<iframe
    src="docs/v3/demos/reset.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
