## Get current Month and Year

#### Overview
_TODO_

#### HTML Structure
```html
<div class="hello-week"></div>
```

#### Javascript Initialization
```js
let calendar = new HelloWeek({
    onNavigation: () => {
        console.log('Current Month: ', calendar.getMonth());
        console.log('Current Year: ', calendar.getYear());
    }
});
```

