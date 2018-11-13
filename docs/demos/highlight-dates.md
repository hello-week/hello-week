## Highlight Dates

```json
   {
        "multiplePick": true,
        "daysHighlight": [
            {
                "days": [
                    ["2018-10-16", "2018-10-24"],
                    ["2018-11-08", "2018-11-21"]
                ],
                "backgroundColor": "#6495ed",
                "color": "#fff",
                "title": "Summer Holidays"
            },
            {
                "days": ["2018-07-24"],
                "backgroundColor": "#f08080",
                "title": "John Doe Birthday"
            },
            {
                "days": ["2018-12-25"],
                "backgroundColor": "#ef5350",
                "title": "Christmas"
            }
        ]
    }
```

#### Overview
_TODO_

#### HTML Structure
```html
    <div class="hello-week"></div>
```

#### Javascript Initialization
```js
    new HelloWeek({
        multiplePick: true,
        daysHighlight: [
            {
                days: [
                    ['2018-10-16', '2018-10-24'],
                    ['2018-11-08', '2018-11-14']
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
        ]
    });
```

