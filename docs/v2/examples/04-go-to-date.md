# Go to Date

Displays the calendar in right-to-left mode.

#### HTML Structure

```html
<div class="hello-week"></div>
<label for="textfield-1">Choose date</label>
<input type="text" name="textfield-1" placeholder="Textfield" value="2030-06-01" />
<button class="btn">Go to Date</button>
```

#### Javascript Initialization

```js
const calendar = new HelloWeek({
  onLoad: () => {
    calendar.goToDate('2019-06-01');
  }
});

document.querySelector('.btn').addEventListener('click', evt => {
  calendar.goToDate(document.querySelector('input').value);
});
```
