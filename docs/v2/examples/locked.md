# Locked

Locks all days in calendar.

In this example, you can notice, that the `update` function is called.

The main reason for doing it this way has to do with **optimizing the number of renderings**, you may have situations where we want to change more than one option, so you can create all the changes and give a single update, instead of the update being done internally.

> Hello Week, there are plans to create a **single function to update the internal states**, and in this way, the layout update will be automatic.

## Usage

```js
const calendar = new HelloWeek({
    selector: '.calendar',
    locked: true,
    onNavigation: () => {
        calendar.setLocked(false);
        calendar.update();
    },
});
```

## Demonstration

<iframe
    src="docs/v2/demos/locked.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
