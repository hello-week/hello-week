# Range

Set predefined date ranges the user can select from.

Each key is the label for the range, and its value an array with all dates between two dates representing the bounds of the range.

## Usage

```js
new HelloWeek({
    selector: '.calendar',
    todayHighlight: false,
    range: true,
    multiplePick: true,
    daysSelected: ['2023-01-10', '2023-01-20'],
});
```

## Demonstration

<iframe
    src="docs/v2/demos/range.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
