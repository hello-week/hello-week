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
    const calendar = new HelloWeek({
        onLoad: () => {
            calendar.setMinDate('2019-03-10');
            calendar.setMaxDate('2019-03-28');
            calendar.update();
        }
    });
    document.querySelector('.btn').addEventListener('click', () => {
        calendar.reset({
            minDate: '2019-03-10'
        });
    });
```
