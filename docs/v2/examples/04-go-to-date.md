# Go to Date

Displays the calendar in right-to-left mode.

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
            value="2030-06-01"
            class="textfield__control"
        />
    </div>
</div>
<button class="btn btn--accent">Go to Date</button>
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
