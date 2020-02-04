# Get Month and Year

Get month or year.

## Usage

```js
const calendar = new HelloWeek({
  onNavigation: () => {
    console.log('Current Month: ', calendar.getMonth());
    console.log('Current Year: ', calendar.getYear());
  }
});
```

<iframe
    src="docs/v2/demos/03-get-month-year.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
