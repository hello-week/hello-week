## Disabled Days Week


```js
    const myCalendar = new HelloWeek({
        langFolder: '../dist/langs/',
        lang: 'en',
        format: 'DD-MM-YYYY',
        multiplePick: true,
        todayHighlight: true,
        disableDates: false,
        disablePastDays: false,
        disabledDaysOfWeek: [0],
        weekStart: 0,
        range: true,
        nav: false
    });

