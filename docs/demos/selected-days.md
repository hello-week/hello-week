## Selected Days

#### Overview
Set day/days selected.

You can initialize the calendar with day/days already selected, but you have attention,
because you have multiple days selected, also need to have the option `multiplePick: true`.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### JavaScript Initialization
```js
var calendar = new HelloWeek({
    daysSelected: ['2022-04-25', '2022-05-01', '2022-05-02', '2022-05-03'],
    multiplePick: true,
});
```
