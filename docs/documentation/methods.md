## Methods
**Hello Week** has some methods that allow gives you the ability to manipulate.

#### prev()
- **type**: `triggerable`

Method to change the month to the previous, also you can send a callback function like a parameter.

---

#### next()
- **type**: `triggerable`

Method to change the month to the next, also you can send a callback function like a parameter.

---

#### update()
- **type**: `triggerable`

Update and redraws the events for the current month.

---

#### reset(options: any = {}, callback?: Function)
- **type**: `triggerable`

Method reset calendar.

---

#### destroy()
- **type**: `triggerable`

Method destroy the calendar and remove the instance from the target element.

---

#### goToday()
- **type**: `triggerable`

Method move the calendar to current day.

---

#### goToDate(date: Number | String)
- **type**: `triggerable`
- date (optional):
  - Type: `Number`
  - Default: the present date in **timestamps**
  - Type: `String`
  - Default: the present date in format **YYYY-MM-DD**

Method move the calendar to arbitrary day.

---

#### getDays()
- **type**: `triggerable`

Method returns the selected days with the format specified.

---

#### getDaysHighlight()
- **type**: `triggerable`

Method returns the highlight dates.

---

#### setDaysHighlight(daysHighlight: any)
- **type**: `triggerable`

Method set highlight dates.

---

#### setMultiplePick(state: Boolean)
- **type**: `triggerable`

Method set calendar with multiple pick.

---

#### setDisablePastDays(state: Boolean)
- **type**: `triggerable`

Method set calendar with disable past days.

---

#### setTodayHighlight(state: Boolean)
- **type**: `triggerable`

Method sets calendar with today highlight.

---

#### setRange(state: Boolean)
- **type**: `triggerable`

Method toggle status of range.

---

#### setLocked(state: Boolean)
- **type**: `triggerable`

Method set calendar locked.

---


#### setMinDate(date: String | Number)
- **type**: `triggerable`

Method set min date.

---


#### setMaxDate(date: String | Number)
- **type**: `triggerable`

Method set max date.

---
