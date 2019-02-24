## Selected Days

#### Overview
Set day/days selected.

You can initialize the calendar with day/days already selected, but you have attention,
because you have multiple days selected, also need to have the option `multiplePick: true`.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        daysSelected: ['2019-02-26', '2019-03-01', '2019-03-02', '2019-03-03'],
        multiplePick: true
    });
```

