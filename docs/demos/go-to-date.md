## Go to Date

#### Overview
Displays the calendar in right-to-left mode.

#### HTML Structure
```html
<div class="hello-week"></div>
<div class="textfield">
    <label class="textfield__label" for="">Choose date</label>
    <input type="text" class="textfield__input" value="2030-06-01" />
</div>
<button class="btn">Go to Date</button>
```

#### Javascript Initialization
```js
const calendar = new HelloWeek({
    onLoad: () => {
        calendar.goToDate('2019-06-01');
    }
});

document.querySelector('.demo .btn').addEventListener('click', (evt) => {
    calendar.goToDate(document.querySelector('.demo input').value);
});
```
