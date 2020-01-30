# Get current Month and Year

TODO...

#### HTML Structure

```html
<div class="hello-week"></div>
```

#### Javascript Initialization

```js
const calendar = new HelloWeek({
  onNavigation: () => {
    console.log('Current Month: ', calendar.getMonth());
    console.log('Current Year: ', calendar.getYear());
  }
});
```
