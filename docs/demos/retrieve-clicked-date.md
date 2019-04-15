## Retrieve clicked date

#### Overview
This demonstrates how to retrieve the clicked date or dates.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
const calendar = new HelloWeek({
    onSelect: () => {
        console.log(calendar.getDays());
        /** Add your code to handle the days here */
    }
});
```

Whenever a user clicks on a date in the calendar, the selected day(s) are returned as an array. The
`calendar` can only be used inside of HelloWeek.

##### Multiple pick
In case multiple picks is set, all clicked dates are returned

##### Range
In case a range is set, all dates between the first and the last clicked date are returned
