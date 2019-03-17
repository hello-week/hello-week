## Highlight Dates

#### Overview
Set day/days highlight, with different customizes.

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        daysHighlight: [
            {
                days: [
                    ['2019-04-16', '2019-04-24'],
                    ['2019-05-08', '2019-05-14']
                ],
                backgroundColor: '#6495ed',
                color: '#fff',
                title: 'Summer Holidays'
            },
            {
                days: ['2019-03-24'],
                backgroundColor: '#f08080',
                title: 'John Doe Birthday'
            }
        ]
    });
```

