## Customization

You can customization your own theme and make advanced changes to the design and behavior of your calendar.

Edit the code for a theme only if you know **HTML**, **CSS** and have a basic understanding of class who you need change, to avoid **repaint** and **reflow**.

#### HTML Structure

```html
    <div class="hello-week">
        <div class="navigation">
            <button class="prev">Prev</button>
            <div class="period"></div>
            <button class="next">Next</button>
        </div>
        <div class="week"></div>
        <div class="month"></div>
    </div>
```

#### CSS Structure

```css
    .hello-week .week {
        color: #42a298;
        font-size: 1.2em
    }

    .hello-week .day.is-weekend {
        color: #ff3860
    }

    .hello-week .day.is-highlight {
        background-color: #8fbc8f;
        color: #fff
    }

    .hello-week .day.is-today {
        background-color: #ff3860;
        color: #fff
    }

    .hello-week .day.is-selected {
        background-color: #7fcbc3;
        color: #fff
    }

    .hello-week .day.is-range {
        background-color: rgba(127, 203, 195, .4);
        color: #fff
    }

    .hello-week .day.is-disabled {
        cursor: not-allowed;
        opacity: .33
    }
```


