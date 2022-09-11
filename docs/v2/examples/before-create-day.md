# Before Create Day

A hook for modifying a day DOM.

## Usage

```js
new HelloWeek({
    selector: '.calendar',
    beforeCreateDay: (data) => {
        return {
            ...data,
            ...{
                node: el(
                    'div',
                    data.node.attributes,
                    el(
                        'span',
                        { style: { pointerEvents: 'none' } },
                        data.day.toString()
                    )
                ),
            },
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
