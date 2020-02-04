# Range

Set predefined date ranges the user can select from.

Each key is the label for the range, and its value an array with all dates between two dates representing the bounds of the range.

## Usage

```js
new HelloWeek({
  selector: '.calendar',
  range: true,
  todayHighlight: false
});
```

<iframe
    src="docs/v2/demos/08-range.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
