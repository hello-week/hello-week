## Methods
**Hello Week** has some methods that allow gives you the ability to manipulate.

#### prev()
Method to change the month to the previous, also you can send a callback function like a parameter.

> **type**: `triggerable`

---

#### next()
Method to change the month to the next, also you can send a callback function like a parameter.

> **type**: `triggerable`

---

#### update()
Update and redraws the events for the current month.

> **type**: `triggerable`

---

#### reset(options: any = {}, callback?: Function)
Method reset calendar.

> **type**: `triggerable`

---

#### destroy()
Method destroy the calendar and remove the instance from the target element.

> **type**: `triggerable`

---

#### goToday()
Method move the calendar to current day.

> DEPRECATED

> **type**: `triggerable`

---

#### goToDate(date: Number | String)
Method move the calendar to arbitrary day.

> **type**: `triggerable`
> date (optional):
>  - **type**: `Number`
>  - **default**: the present date in **timestamps**
>  - **type**: `String`
>  - **default**: the present date in format **YYYY-MM-DD**

---

#### getDays()
Method returns the selected days with the format specified.

> **type**: `triggerable`

---

#### getDaysHighlight()
Method returns the highlight dates.

> **type**: `triggerable`

---

#### setDaysHighlight(daysHighlight: any)
Method set highlight dates.

> **type**: `triggerable`

---

#### setMultiplePick(state: Boolean)
Method set calendar with multiple pick.

> **type**: `triggerable`

---

#### setDisablePastDays(state: Boolean)
Method set calendar with disable past days.

> **type**: `triggerable`

---

#### setTodayHighlight(state: Boolean)
Method sets calendar with today highlight.

> **type**: `triggerable`

---

#### setRange(state: Boolean)
Method toggle status of range.

> **type**: `triggerable`

---

#### setLocked(state: Boolean)
Method set calendar locked.

> **type**: `triggerable`

---


#### setMinDate(date: String | Number)
Method set min date.

> **type**: `triggerable`

---


#### setMaxDate(date: String | Number)
Method set max date.

> **type**: `triggerable`

---
