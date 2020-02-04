# Selected Days

You can initialize the calendar with day/days already selected.

> You have multiple days selected, also need to have the option `multiplePick: true`.


## Usage

```html
<div class="calendar"></div>
```

```js
new HelloWeek({
  selector: '.calendar',
  langFolder: './langs/',
  daysSelected: ['2020-01-10', '2020-02-12', '2020-12-13', '2020-12-25'],
  multiplePick: true
});
```

<iframe
    src="docs/v2/demos/00-selected-days.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
