## Go to Date

#### Overview
Displays the calendar in right-to-left mode.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    const calendar = new HelloWeek({
        range: true,
        onLoad: () => {
            calendar.goToDate('2019-06-01');
        }
    });
```
