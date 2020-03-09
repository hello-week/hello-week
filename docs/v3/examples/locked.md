# Locked

Locks all days in calendar.

## Usage

```js
const calendar = new HelloWeek({
    selector: '.calendar',
    langFolder: './langs/',
    locked: true,
});

document.querySelector('.btn').addEventListener('click', () => {
    calendar.setOptions({}, prevOption => {
        return {
            ...prevOption,
            locked: !prevOption.locked,
        };
    });
});
```

## Demonstration

<iframe
    src="docs/v3/demos/locked.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
