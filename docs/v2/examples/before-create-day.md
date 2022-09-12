# On Select

Callback will be executed before create each day, also allow consumer to manipulate DOM.

## Usage

```js
const calendar = new HelloWeek({
    selector: '.calendar',
    beforeCreateDay: (day) => {
        console.log(day);
        return day;
    },
});
```

## Demonstration

<iframe
    src="docs/v2/demos/before-create-day.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
