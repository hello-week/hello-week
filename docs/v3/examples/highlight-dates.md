# Highlight Dates

Set day/days highlight, with different customizes.

## Usage

```js
new HelloWeek({
  selector: '.calendar',
  daysHighlight: [
    {
      days: ['2020-02-07'],
      events: [
        {
          title: 'Event 1'
        },
        {
          title: 'Event 2'
        }
      ],
      attributes: {
        style: {
          color: '#fff',
          backgroundColor: '#04f'
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
