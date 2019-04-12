## Options
**Hello Week** comes with a few (optional) settings that you can change by passing an object as an argument

#### selector
Define selector to use as a datepicker.

> **type**: `String`\
> **default**: `.hello-week`


---

#### lang
Determines which translation file will be read.

> **type**: `String`\
> **default**: `en`


---

#### langFolder
Determines folder path of your langs.

> **type**: `String`\
> **default**: `./dist/langs/`


---

#### format
The format also determines which components are displayed.

> **type**:  `String`\
> **default**: `dd/mm/yyyy`


---

#### weekShort
Sets the format of the week.

> **type**: `Boolean`\
> **default**: `true`


---

#### monthShort
Sets the format of the month.

> **type**: `Boolean`\
> **default**: `false`


---

#### multiplePick
Allows multiple days selection.

> **type**: `Boolean`\
> **default**: `false`


---

#### **default**Date
Define the start date in calendar.

> **type**: `String`\
> **default**: `null`


---

#### todayHighlight
Highlights the current date.

> **type**: `Boolean`\
> **default**: `true`


---

#### disablePastDays
Disable date before the current day.

> **type**: `Boolean`\
> **default**: `false`


---

#### disabledDaysOfWeek
Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday).\
Multiple values should be comma-separated.

> **type**: `Array`\
> **default**: `null`


---

#### disableDates
Array of date strings or a single date string to make days disabled.

> **type**: `Array`\
> **default**: `null`


---

#### daysHighlight
Array of date strings or a single date string to make days with highlight.

> **type**: `Array`\
> **default**: `null`


---

#### daysSelected
Array of strings with day/days to make selected.

> **type**: `Array`\
> **default**: `null`


---

#### range
Allows you to select array range of days.

> **type**: `Boolean`\
> **default**: `false`


---

#### rtl
Allows layout for languages written from right to left (like Hebrew or Arabic).

> **type**: `Boolean`\
> **default**: `false`


---

#### locked
Sets all days of the week locked.

> **type**: `Boolean`\
> **default**: `false`


---

#### weekStart
Day of the week start. 0 (Sunday) to 6 (Saturday).

> **type**: `Integer`\
> **default**: 0


---

#### minDate
Disable date selections before this date. When set to null, there is no minimum.

> **type**: `Number` or `String`\
> **default**: `null`


---

#### maxDate
Disable date selections after this date. When set to null, there is no maximum.

> **type**: `Number` or `String`\
> **default**: `null`


---

#### nav
Show next/prev buttons.

> **type**: `Array`\
> **default**: `['◀', '▶']`



