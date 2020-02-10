# Locked

Locks all days in calendar.

## Usage

```js
const calendar = new HelloWeek({
  selector: '.calendar',
  locked: true,
  onNavigation: () => {
    calendar.setLocked(false);
    calendar.update();
  }
});
```

<iframe
    src="docs/v3/demos/locked.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
