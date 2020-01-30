# Selected Days

You can initialize the calendar with day/days already selected.

> You have multiple days selected, also need to have the option `multiplePick: true`.

#### HTML Structure

```html
<div class="hello-week"></div>
```

#### Javascript Initialization

```js
const calendar = new HelloWeek({
  daysSelected: ['2019-04-25', '2019-05-01', '2019-05-02', '2019-05-03'],
  multiplePick: true
});
```

<iframe
    src="docs/demos/selected-days.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
