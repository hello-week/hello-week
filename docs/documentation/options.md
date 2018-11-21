## Options
**Hello Week** comes with a few (optional) settings that you can change by passing an object as an argument

#### selector
- type: `String`
- default: `.hello-week`
- _Define selector to use as a datepicker._
---

#### lang
- type: `String`
- default: `en`
- _Determines which translation file will be read._
---

#### langFolder
- type: `String`
- default: `./dist/langs/`
- _Determines folder path of your langs._
---

#### format
- type:  `String`
- default: `dd/mm/yyyy`
- _The format also determines which components are displayed._
---

#### weekShort
- type: `Boolean`
- default: `true`
- _Sets the format of the week._
---

#### monthShort
- type: `Boolean`
- default: `false`
- _Sets the format of the month._
---

#### multiplePick
- type: `Boolean`
- default: `false`
- _Allows multiple days selection._
---

#### defaultDate
- type: `String`
- default: `null`
- _Define the start date in calendar._
---

#### todayHighlight
- type: `Boolean`
- default: `true`
- _Highlights the current date._
---

#### disablePastDays
- type: `Boolean`
- default: `false`
- _Disable date before the current day._
---

#### disabledDaysOfWeek
- type: `Array`
- default: `null`
- _Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday). Multiple values should be comma-separated._
---

#### disableDates
- type: `Array`
- default: `null`
- _Array of date strings or a single date string to make days disabled._
---

#### daysHighlight
- type: `Array`
- default: `null`
- _Array of date strings or a single date string to make days with highlight._
---

#### range
- type: `Boolean`
- default: `false`
- _Allows you to select array range of days._
---

#### rtl
- type: `Boolean`
- default: `false`
- _Allows layout for languages written from right to left (like Hebrew or Arabic)._
---

#### locked
- type: `Boolean`
- default: `false`
- _Sets all days of the week locked._
---

#### weekStart
- type: `Integer`
- default: 0
- _Day of the week start. 0 (Sunday) to 6 (Saturday)._
---

#### minDate
- type: `Number` or `String`
- default: `null`
- _Disable date selections before this date. When set to null, there is no minimum._
---

#### maxDate
- type: `Number` or `String`
- default: `null`
- _Disable date selections after this date. When set to null, there is no maximum._
---

#### nav
- type: `Array`
- default: `['◀', '▶']`
- _Show next/prev buttons._

