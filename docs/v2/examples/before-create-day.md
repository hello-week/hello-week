# Before Create Day

Callback will be executed before create each day, also allow consumer to manipulate DOM.

## Usage

```js
const calendar = new HelloWeek({
  selector: '.calendar',
  beforeCreateDay: (node) => {
      const span = document.createElement('span');

      Object.assign(span.style, {
          position: 'absolute',
          top: "8px",
          width: '5px',
          height: '5px',
          backgroundColor: '#5a67d8',
          borderRadius: "50%",
      });

      return {
          ...node,
          element:
              node.day % 2 === 0 && !node.isWeekend
                  ? node.element.appendChild(span)
                  : node.element,
      };
  },
});
```

## Demonstration

<iframe
    src="docs/v2/demos/before-create-day.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
