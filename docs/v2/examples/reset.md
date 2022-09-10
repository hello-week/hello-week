# Reset

Method reset calendar to initial value.

## Usage

```js
const calendar = new HelloWeek({
    selector: '.calendar',
    minDate: '2019-03-10',
    maxDate: '2019-03-28',
});

document.querySelector('.btn').addEventListener('click', () => {
    calendar.reset({
        minDate: false,
        maxDate: false,
    });
});
```

## Demonstration

<iframe
    src="docs/v2/demos/reset.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
