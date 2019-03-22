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
    const calendar = new HelloWeek({
        daysSelected: ['2019-04-25', '2019-05-01', '2019-05-02', '2019-05-03'],
        multiplePick: true,
        onSelect: () => {
            console.log(calendar.getDays());
        }
    });
```

