## Disabled Days Week

```json
   {
        "disabledDaysOfWeek": [0, 6],
        "disablePastDays": true
    }
```

#### Overview
_TODO_

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        disabledDaysOfWeek: [0, 1] // disabling weekends
        disablePastDays: true
    });
```

