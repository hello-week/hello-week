## Reset

#### Overview
Method reset calendar to initial value.

#### HTML Structure
```html
<div class="hello-week"></div>
<button class="btn">Reset Calendar</button>
```

#### Javascript Initialization
```js
var calendar = new HelloWeek({
    minDate: '2020-03-10',
    maxDate: '2020-03-28',
    onNavigation: () => {
        console.log('You change the month!');
    }
});
document.querySelector('.btn').addEventListener('click', () => {
    calendar.reset({
        minDate: false,
        maxDate: false
    });
});
```
