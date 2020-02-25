# Day Render

A hook for modifying a day DOM.

## Usage

```js
new HelloWeek({
  selector: '.calendar',
  beforeCreate: data => {
    data.node = el('div', data.attributes, el('span', {}, data.day.toString()));
    return data;
  }
});
```

## Demonstration

<iframe
    src="docs/v3/demos/day-render.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
