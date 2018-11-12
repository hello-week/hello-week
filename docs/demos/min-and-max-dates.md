## Min & Max Dates


```js
    const myCalendar = new HelloWeek({
        langFolder: '../dist/langs/',
        lang: 'en',
        format: 'DD-MM-YYYY',
        defaultDate: '2018-06-27', // Only format YYYY-MM-DD
        minDate: '2018-06-19',
        maxDate: '2018-07-07',
        todayHighlight: true,
        disablePastDays: true,
        disabledDaysOfWeek: [0, 6], // Disabling weekends
        weekStart: 0,
        nav: false
    });
```
