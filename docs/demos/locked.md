## Locked

#### Overview
Locks all days in calendar.

#### HTML Structure
```html
    <div class="calendar"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        selector: '.calendar',
        locked: true
    });
```

#### Properties and Methods
```js
    const calendar = new HelloWeek({
        locked: true
    });
    calendar.setLocked(false);
```
