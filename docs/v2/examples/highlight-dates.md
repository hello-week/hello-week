# Highlight Dates

Set day/days highlight, with different customizes.

## Usage

```js
new HelloWeek({
    selector: '.calendar',
    daysHighlight: [
        {
            days: ['2020-03-22'],
            backgroundColor: '#f08080',
            title: 'Dad Birthday',
        },
        {
            days: ['2020-12-18'],
            backgroundColor: '#f08080',
            title: 'Mom Birthday',
        },
        {
            days: [
                ['2020-06-01', '2020-06-14'],
                ['2020-08-16', '2020-04-29'],
            ],
            backgroundColor: '#6495ed',
            color: '#fff',
            title: 'Summer Holidays',
        },
    ],
});
```

## Demonstration

<iframe
    src="docs/v2/demos/highlights.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
