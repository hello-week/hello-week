## Disabled Dates

```json
   {
        "disablePastDays": true,
        "multiplePick": true,
        "disableDates": ["2018-12-01", "2018-12-08", "2018-12-16", "2018-12-21", "2018-12-23", "2018-12-28"]
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
        disablePastDays: true,
        disabledDaysOfWeek: true,
        disableDates: ["2018-11-02", "2018-11-09", "2018-11-16", "2018-11-23"]
    });
```

