# Reset

Method reset calendar to initial value.

#### HTML Structure
```html
<div class="hello-week"></div>
<button class="btn">Reset Calendar</button>
```

#### Javascript Initialization
```js
const calendar = new HelloWeek({
    minDate: '2019-03-10',
    maxDate: '2019-03-28'
});
document.querySelector('.btn').addEventListener('click', () => {
    calendar.reset({
        minDate: false,
        maxDate: false
    });
});
```