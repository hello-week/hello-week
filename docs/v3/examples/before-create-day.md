# Before Create Day

A hook for modifying a day DOM.

## Usage

```js
new HelloWeek({
  selector: '.calendar',
  beforeCreateDay: data => {
    data.node = el('div', data.attributes, el('span', {}, data.day.toString()));
    return data;
  }
});
```

## Demonstration

<iframe
    src="docs/v3/demos/before-create-day.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
