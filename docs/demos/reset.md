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
let calendar = new HelloWeek({
    minDate: '2019-03-10',
    maxDate: '2019-03-28',
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
