## Go to Date

#### Overview
Move the calendar to arbitrary day.

#### HTML Structure
```html
<div class="hello-week"></div>
<div class="form-field form-field--column">
    <label for="textfield-1">Choose date</label>
    <div class="textfield">
        <input
            type="text"
            name="textfield-1"
            placeholder="Textfield"
            value="01-06-2030"
            class="textfield__control"
        />
    </div>
</div>
<button class="btn btn--accent">Go to Date</button>
```

#### JavaScript Initialization
```js
var calendar = new HelloWeek({
    defaultDate: '01-06-2025',
});

document.querySelector('.demo .btn').addEventListener('click', (evt) => {
    calendar.goToDate(document.querySelector('.demo input').value);
});
```
