# Get Clicked Date

This demonstrates how to get the clicked date or dates.

## Usage

```js
const calendar = new HelloWeek({
  selector: '.calendar',
  onSelect: () => {
    console.log(calendar.getDays());
  }
});
```

Whenever a user clicks on a date in the calendar, the selected day(s) are returned as an array.

The `calendar` can only be used inside of HelloWeek.

**Multiple pick**

- In case multiple picks is set, all clicked dates are returned

**Range**

- In case a range is set, all dates between the first and the last clicked date are returned

## Demonstration

<iframe
    src="docs/v3/demos/on-select.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
