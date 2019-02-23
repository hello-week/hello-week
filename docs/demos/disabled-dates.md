## Disabled Dates

#### Overview
Set disabled specific day/days.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        disablePastDays: true,
        disabledDaysOfWeek: [0, 1],
        disableDates: ["2019-02-01", "2019-02-08", "2019-02-16"]
    });
```

