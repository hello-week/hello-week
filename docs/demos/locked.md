## RTL

```json
   {
        "locked": true
    }
```

#### Overview
Locks all days in calendar.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        locked: true
    });
```

#### Set State
```js
    const calendar = new HelloWeek({
        locked: true
    });
    console.log(calendar.locked); // true
    calendar.locked = false;
    console.log(calendar.locked); // false
```
