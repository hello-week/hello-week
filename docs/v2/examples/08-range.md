# Range

Set predefined date ranges the user can select from.

Each key is the label for the range, and its value an array with all dates between two dates representing the bounds of the range.

#### HTML Structure
```html
<div class="hello-week"></div>
```

#### Javascript Initialization
```js
const calendar = new HelloWeek({
    range: true,
    todayHighlight: false
});
```

<iframe
    src="docs/demos/range.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
