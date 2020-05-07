## Highlight Dates

#### Overview
Set day/days highlight, with different customizes.

#### HTML Structure
```html
<div class="hello-week"></div>
```

#### Javascript Initialization
```js
var calendar = new HelloWeek({
    daysHighlight: [
        {
            days: ['2020-03-22'],
            backgroundColor: '#f08080',
            title: 'Dad Birthday'
        },
        {
            days: ['2020-12-18'],
            backgroundColor: '#f08080',
            title: 'Mom Birthday'
        },
        {
            days: [
                ['2020-06-01', '2020-06-14'],
                ['2020-08-16', '2020-04-29']
            ],
            backgroundColor: '#6495ed',
            color: '#fff',
            title: 'Summer Holidays'
        }
    ],
    onLoad: () => {
        console.log(calendar.getDaysHighlight());
        /** Add your code to handle the days here */
    }
});
```
