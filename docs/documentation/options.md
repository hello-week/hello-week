## Options
**Hello Week** comes with a few (optional) settings that you can change by passing an object as an argument

#### selector
- **type**: `String`
- **default**: `.hello-week`

Define selector to use as a datepicker.

---

#### lang
- **type**: `String`
- **default**: `en`

Determines which translation file will be read.

---

#### langFolder
- **type**: `String`
- **default**: `./dist/langs/`

Determines folder path of your langs.

---

#### format
- **type**:  `String`
- **default**: `dd/mm/yyyy`

The format also determines which components are displayed.

---

#### weekShort
- **type**: `Boolean`
- **default**: `true`

Sets the format of the week.

---

#### monthShort
- **type**: `Boolean`
- **default**: `false`

Sets the format of the month.

---

#### multiplePick
- **type**: `Boolean`
- **default**: `false`

Allows multiple days selection.

---

#### **default**Date
- **type**: `String`
- **default**: `null`

Define the start date in calendar.

---

#### todayHighlight
- **type**: `Boolean`
- **default**: `true`

Highlights the current date.

---

#### disablePastDays
- **type**: `Boolean`
- **default**: `false`

Disable date before the current day.

---

#### disabledDaysOfWeek
- **type**: `Array`
- **default**: `null`

Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday).\
Multiple values should be comma-separated.

---

#### disableDates
- **type**: `Array`
- **default**: `null`

Array of date strings or a single date string to make days disabled.

---

#### daysHighlight
- **type**: `Array`
- **default**: `null`

Array of date strings or a single date string to make days with highlight.

---

#### range
- **type**: `Boolean`
- **default**: `false`

Allows you to select array range of days.

---

#### rtl
- **type**: `Boolean`
- **default**: `false`

Allows layout for languages written from right to left (like Hebrew or Arabic).

---

#### locked
- **type**: `Boolean`
- **default**: `false`

Sets all days of the week locked.

---

#### weekStart
- **type**: `Integer`
- **default**: 0

Day of the week start. 0 (Sunday) to 6 (Saturday).

---

#### minDate
- **type**: `Number` or `String`
- **default**: `null`

Disable date selections before this date. When set to null, there is no minimum.

---

#### maxDate
- **type**: `Number` or `String`
- **default**: `null`

Disable date selections after this date. When set to null, there is no maximum.

---

#### nav
- **type**: `Array`
- **default**: `['◀', '▶']`

Show next/prev buttons.


