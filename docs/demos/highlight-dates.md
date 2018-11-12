## Highlight Dates

```js
    const myCalendar = new HelloWeek({
        langFolder: '../dist/langs/',
        lang: 'en',
        format: 'DD-MM-YYYY',
        multiplePick: true,
        daysHighlight: [
            {
                days: [
                ['2018-05-16', '2018-05-24'],
                ['2018-06-08', '2018-06-14']
                ],
                backgroundColor: '#6495ed',
                color: '#fff',
                title: 'Summer Holidays'
            },
            {
                days: ['2018-07-24'],
                backgroundColor: '#f08080',
                title: 'John Doe Birthday'
            }
        ],
        todayHighlight: true,
        disableDates: false,
        disablePastDays: false,
        disabledDaysOfWeek: [0],
        weekStart: 0,
        nav: false
});
```

