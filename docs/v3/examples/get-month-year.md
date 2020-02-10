# Get Month and Year

Get month or year.

## Usage

```js
const calendar = new HelloWeek({
  selector: '.calendar',
  onNavigation: () => {
    console.log('Current Month: ', calendar.getMonth());
    console.log('Current Year: ', calendar.getYear());
  }
});
```

## Demonstration

<iframe
    src="docs/v3/demos/get-month-year.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
