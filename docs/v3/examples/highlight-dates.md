# Highlight Dates

Set day/days highlight, with different customizes.

## Usage

```js
new HelloWeek({
  selector: '.calendar',
  daysHighlight: [
    {
      days: [
        ['2020-03-02', '2020-03-09'],
        ['2020-04-16', '2020-04-29']
      ],
      attributes: {
        style: {
          color: '#fff',
          backgroundColor: '#9C27B0'
        },
        data: {
          title: 'Summer Holidays'
        }
      }
    }
  ]
});
```

## Demonstration

<iframe
    src="docs/v3/demos/highlights.html"
    frameborder="no"
    allowfullscreen="allowfullscreen">
</iframe>
