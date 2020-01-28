# Customization

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
.hello-week .navigation .prev {}
.hello-week .navigation .period {}
.hello-week .navigation .next {}

.hello-week .week {}

.hello-week .month .day.is-weekend {}
.hello-week .month .day.is-highlight { }
.hello-week .month .day.is-today {}
.hello-week .month .day.is-selected {}
.hello-week .month .day.is-range  {}
.hello-week .month .day.is-start-range {}
.hello-week .month .day.is-end-range {}
.hello-week .month .day.is-disabled {}
```
