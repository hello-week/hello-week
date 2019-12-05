import { cssClasses, cssStates, daysWeek, formatDate } from '../shared/constants'
import {
  log,
  warn,
  error,
  checkUrl,
  readFile,
  extend,
  getIndexForEventTarget,
  isObject,
  setAttr,
  h,
  render,
  addClass,
  removeClass,
  setStyle,
  toggleClass
} from './../util/index'
import { defaults } from '../shared/options'
import { build } from './template'
import { format } from './format'
import { humanToTimestamp, timestampToHuman, setToTimestamp } from './timestamp'

export class HelloWeek {
  private readonly defaultsOptions: any
  private options: any
  private selector: any
  private calendar: any = {}
  private date: any
  private todayDate: any
  private daysHighlight: any
  private defaultDate: any
  private langs: any
  private daysOfMonth: any
  private intervalRange: any = {}
  private daysSelected: any = []
  private lastSelectedDay: any
  private days: any

  constructor(options: any = {}) {
    this.options = extend(extend({}, defaults), options)
    this.defaultsOptions = extend(extend({}, defaults), options)

    const calendar = build(this.options, {
      prev: {
        cb: () => this.prev()
      },
      next: {
        cb: () => this.next()
      }
    })

    this.selector = calendar.selector
    this.calendar = calendar.calendar

    if (checkUrl(this.options.langFolder)) {
      readFile(this.options.langFolder, (text: any) => {
        this.langs = JSON.parse(text)
        this.init(() => {
          /** callback function */
        })
      })
    } else {
      readFile(this.options.langFolder + this.options.lang + '.json', (text: any) => {
        this.langs = JSON.parse(text)
        this.init(() => {
          /** callback function */
        })
      })
    }
  }

  /**
   * Destroy the calendar and remove the instance from the target element.
   * @public
   */
  destroy(): void {
    this.removeStatesClass()
    this.selector.remove()
  }

  /**
   * Change the month to the previous, also you can send a callback function like a parameter.
   * @public
   */
  prev(callback?: () => void): void {
    const prevMonth = this.date.getMonth() - 1
    this.date.setMonth(prevMonth)
    this.update()

    this.options.onNavigation.call(this)
    if (callback) {
      callback.call(this)
    }
  }

  /**
   * Change the month to the next, also you can send a callback function like a parameter.
   * @public
   */
  next(callback?: () => void): void {
    const nextMonth = this.date.getMonth() + 1
    this.date.setMonth(nextMonth)
    this.update()

    this.options.onNavigation.call(this)
    if (callback) {
      callback.call(this)
    }
  }

  /**
   * Update and redraws the events for the current month.
   * @public
   */
  update(): void {
    this.clearCalendar()
    this.mounted()
  }

  /**
   * Reset calendar
   * @public
   */
  reset(options: any = {}, callback?: () => void): void {
    this.clearCalendar()
    this.options = extend(options, this.defaultsOptions)
    this.init(callback)
  }

  /**
   * Move the calendar to current day.
   * @public
   */
  goToday(): void {
    this.date = this.todayDate
    this.date.setDate(1)
    this.update()
  }

  /**
   * Move the calendar to arbitrary day.
   * @param {any} date
   * @public
   */
  goToDate(date: any = this.todayDate): void {
    this.date = new Date(date)
    this.date.setDate(1)
    this.update()
  }

  /**
   * Returns the selected days with the format specified.
   * @return {any}
   * @public
   */
  getDays(): any {
    return this.daysSelected.map((day: number) => timestampToHuman(day, this.options.format, this.langs))
  }

  /**
   * Gets the day selected.
   * @return {number}
   * @public
   */
  getDaySelected(): number {
    return this.lastSelectedDay
  }

  /**
   * Returns the highlight dates.
   * @return {object}
   * @public
   */
  getDaysHighlight(): string {
    return this.daysHighlight
  }

  /**
   * Returns the current month selected.
   * @return {string}
   * @public
   */
  getMonth(): string {
    return this.date.getMonth() + 1
  }

  /**
   * Returns the current year selected.
   * @return {string}
   * @public
   */
  getYear(): string {
    return this.date.getFullYear()
  }

  /**
   * Set highlight dates,
   * @public
   */
  setDaysHighlight(daysHighlight: any): void {
    this.daysHighlight = [...this.daysHighlight, ...daysHighlight]
  }

  /**
   * Sets calendar with multiple pick.
   * @param {boolean} state
   * @public
   */
  setMultiplePick(state: boolean) {
    this.options.multiplePick = state
  }

  /**
   * Sets calendar with disable past days.
   * @param {boolean} state
   * @public
   */
  setDisablePastDays(state: boolean) {
    this.options.disablePastDays = state
  }

  /**
   * Sets calendar with today highlight.
   * @param {boolean} state
   * @public
   */
  setTodayHighlight(state: boolean) {
    this.options.todayHighlight = state
  }

  /**
   * Sets calendar range.
   * @param {boolean} state
   * @public
   */
  setRange(state: boolean) {
    this.options.range = state
  }

  /**
   * Sets calendar locked.
   * @param {boolean} state
   * @public
   */
  setLocked(state: boolean) {
    this.options.locked = state
  }

  /**
   * Set min date.
   * @param {string} date
   * @public
   */
  setMinDate(date: number | string) {
    this.options.minDate = new Date(date)
    this.options.minDate.setHours(0, 0, 0, 0)
    this.options.minDate.setDate(this.options.minDate.getDate() - 1)
  }

  /**
   * Set max date.
   * @param {string} date
   * @public
   */
  setMaxDate(date: number | string) {
    this.options.maxDate = new Date(date)
    this.options.maxDate.setHours(0, 0, 0, 0)
    this.options.maxDate.setDate(this.options.maxDate.getDate() + 1)
  }

  /**
   * @public
   */
  private init(callback?: () => void) {
    this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : []
    this.daysSelected = this.options.daysSelected ? this.options.daysSelected : []

    if (this.daysSelected.length > 1 && !this.options.multiplePick) {
      error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option
                is ${this.options.multiplePick}!`)
    }

    this.todayDate = setToTimestamp() - new Date().getTimezoneOffset() * 1000 * 60
    this.date = new Date()
    this.defaultDate = new Date()

    if (this.options.defaultDate) {
      this.date = new Date(this.options.defaultDate)
      this.defaultDate = new Date(this.options.defaultDate)
      this.defaultDate.setDate(this.defaultDate.getDate())
    }
    this.date.setDate(1)

    if (this.options.minDate) {
      this.setMinDate(this.options.minDate)
    }

    if (this.options.maxDate) {
      this.setMaxDate(this.options.maxDate)
    }

    this.mounted()
    this.options.onLoad.call(this)
    if (callback) {
      callback.call(this)
    }
  }

  /**
   * Select day
   * @private
   */
  private selectDay(callback?: () => void): void {
    this.daysOfMonth = this.selector.querySelectorAll('.' + cssClasses.MONTH + ' .' + cssClasses.DAY)
    for (const i of Object.keys(this.daysOfMonth)) {
      this.handleClickInteraction(this.daysOfMonth[i], callback)
      if (this.options.range) {
        this.handleMouseInteraction(this.daysOfMonth[i])
      }
    }
  }

  /**
   * Gets the interval of dates.
   * @param      {number}  startDate
   * @param      {number}  endDate
   * @private
   */
  private getIntervalOfDates(startDate: number, endDate: number) {
    const dates = []
    let currentDate = startDate
    const addDays = (days: any) => {
      const dt = this.date(this.valueOf() as any)
      dt.setDate(dt.getDate() + days)
      return dt.getTime()
    }
    while (currentDate <= endDate) {
      dates.push(timestampToHuman(currentDate, formatDate.DEFAULT, this.langs))
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  private handleClickInteraction(target: HTMLElement, callback?: () => void): void {
    target.addEventListener('click', (event: any) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target)
      if (this.days[index].locked) {
        return
      }

      this.lastSelectedDay = this.days[index].timestamp
      if (!this.options.range) {
        if (this.options.multiplePick) {
          if (this.days[index].timestamp) {
            this.daysSelected = this.daysSelected.filter((day: string) => setToTimestamp(day) !== this.lastSelectedDay)
          }
          if (!this.days[index].isSelected) {
            this.daysSelected.push(timestampToHuman(this.lastSelectedDay, formatDate.DEFAULT, this.langs))
          }
        } else {
          if (!this.days[index].locked) {
            this.removeStatesClass()
          }
          this.daysSelected = []
          this.daysSelected.push(timestampToHuman(this.lastSelectedDay, formatDate.DEFAULT, this.langs))
        }
      }
      toggleClass(event.target, cssStates.IS_SELECTED)
      this.days[index].isSelected = !this.days[index].isSelected
      if (this.options.range) {
        if (this.intervalRange.begin && this.intervalRange.end) {
          this.intervalRange.begin = undefined
          this.intervalRange.end = undefined
          this.removeStatesClass()
        }
        if (this.intervalRange.begin && !this.intervalRange.end) {
          this.intervalRange.end = this.days[index].timestamp
          this.daysSelected = this.getIntervalOfDates(this.intervalRange.begin, this.intervalRange.end)
          addClass(event.target, cssStates.IS_END_RANGE)
          if (this.intervalRange.begin > this.intervalRange.end) {
            this.intervalRange.begin = undefined
            this.intervalRange.end = undefined
            this.removeStatesClass()
          }
        }

        if (!this.intervalRange.begin) {
          this.intervalRange.begin = this.days[index].timestamp
        }

        addClass(event.target, cssStates.IS_SELECTED)
      }

      this.options.onSelect.call(this)
      if (callback) {
        callback.call(this)
      }
    })
  }

  private handleMouseInteraction(target: HTMLElement): void {
    target.addEventListener('mouseover', (event: any) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target)
      if (!this.intervalRange.begin || (this.intervalRange.begin && this.intervalRange.end)) {
        return
      }
      this.removeStatesClass()
      for (let i = 1; i <= Object.keys(this.days).length; i++) {
        this.days[i].isSelected = false
        if (this.days[index].timestamp >= this.intervalRange.begin) {
          if (
            this.days[i].timestamp >= this.intervalRange.begin &&
            this.days[i].timestamp <= this.days[index].timestamp
          ) {
            addClass(this.days[i].element, cssStates.IS_SELECTED)
            if (this.days[i].timestamp === this.intervalRange.begin) {
              addClass(this.days[i].element, cssStates.IS_BEGIN_RANGE)
            }
          }
        }
      }
    })
  }

  private creatWeek(dayShort: string): void {
    render(h('span', { class: cssClasses.DAY }, dayShort), this.calendar.week)
  }

  private createMonth(): void {
    const currentMonth = this.date.getMonth()
    while (this.date.getMonth() === currentMonth) {
      this.createDay(this.date)
      this.date.setDate(this.date.getDate() + 1)
    }
    this.date.setMonth(this.date.getMonth() - 1)
    this.selectDay()
  }

  private createDay(date: Date): void {
    const num = date.getDate()
    const day = date.getDay()
    const dayOptions: any = {
      day: num,
      timestamp: humanToTimestamp(format(date.getDate(), date.getMonth(), date.getFullYear())),
      isWeekend: false,
      locked: false,
      isToday: false,
      isSelected: false,
      isHighlight: false,
      title: undefined,
      attributes: {
        class: [cssClasses.DAY],
        style: {'color': 'red'}
      },
      element: undefined
    }

    this.days = this.days || {}

   // const margin = this.options.rtl ? 'margin-right' : 'margin-left';
   //  if (dayOptions.day === 1) {
   //    dayOptions.attributes.style[margin] = dayOptions.attributes.style[margin] + '%'
   //    if (this.options.weekStart === daysWeek.SUNDAY) {
   //      dayOptions.attributes.style[margin] = day * (100 / Object.keys(daysWeek).length) + '%'
   //    } else {
   //      if (day === daysWeek.SUNDAY) {
   //        dayOptions.attributes.style[margin] = (Object.keys(daysWeek).length - this.options.weekStart) * (100 / Object.keys(daysWeek).length) + '%'
   //      } else {
   //        dayOptions.attributes.style[margin] = (day - 1) * (100 / Object.keys(daysWeek).length) + '%'
   //      }
   //    }
   //  }


    if (day === daysWeek.SUNDAY || day === daysWeek.SATURDAY) {
      dayOptions.attributes.class.push(cssStates.IS_WEEKEND)
      dayOptions.isWeekend = true
    }
    if (
      this.options.locked ||
      (this.options.disableDaysOfWeek && this.options.disableDaysOfWeek.includes(day)) ||
      (this.options.disablePastDays && +this.date.setHours(0, 0, 0, 0) <= +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
      (this.options.minDate && +this.options.minDate >= dayOptions.timestamp) ||
      (this.options.maxDate && +this.options.maxDate <= dayOptions.timestamp)
    ) {
      dayOptions.attributes.class.push(cssStates.IS_DISABLED)
      dayOptions.locked = true
    }

    if (this.options.disableDates) {
      this.setDaysDisable(dayOptions)
    }

    if (this.todayDate === dayOptions.timestamp && this.options.todayHighlight) {
      dayOptions.attributes.class.push(cssStates.IS_TODAY)
      dayOptions.isToday = true
    }

    this.daysSelected.find((daySelected: number) => {
      if (daySelected === dayOptions.timestamp || humanToTimestamp(daySelected.toString()) === dayOptions.timestamp) {
        dayOptions.attributes.class.push(cssStates.IS_SELECTED)
        dayOptions.isSelected = true
      }
    })

    if (dayOptions.timestamp === this.intervalRange.begin) {
      dayOptions.attributes.class.push(cssStates.IS_BEGIN_RANGE)
    }

    if (dayOptions.timestamp === this.intervalRange.end) {
      dayOptions.attributes.class.push(cssStates.IS_END_RANGE)
    }

    if (this.daysHighlight) {
      //this.setDayHighlight(dayOptions)
    }

    log('DAY', dayOptions.attributes);
    dayOptions.element = render(
      h('div', dayOptions.attributes, String(dayOptions.day)),
      this.calendar.month
    )

    this.days[dayOptions.day] = dayOptions
  }

  private setDaysDisable(dayOptions: any): void {
    if (this.options.disableDates[0] instanceof Array) {
      this.options.disableDates.map((date: any) => {
        if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
          dayOptions.attributes.class.push(cssStates.IS_DISABLED)
          dayOptions.locked = true
        }
      })
    } else {
      this.options.disableDates.map((date: any) => {
        if (dayOptions.timestamp === setToTimestamp(date)) {
          dayOptions.attributes.class.push(cssStates.IS_DISABLED)
          dayOptions.locked = true
        }
      })
    }
  }

  /**
   * Set day highlight.
   * @param      {HTMLElement}  newDay
   * @param      {any}  dayOptions
   * @private
   */
  private setDayHighlight(dayOptions: any): void {
    for (const key in this.daysHighlight) {
      if (this.daysHighlight[key].days[0] instanceof Array) {
        this.daysHighlight[key].days.map((date: any, index: number) => {
          if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
            this.setStyleDayHighlight(key, dayOptions)
          }
        })
      } else {
        this.daysHighlight[key].days.map((date: any) => {
          if (dayOptions.timestamp === setToTimestamp(date)) {
            this.setStyleDayHighlight(key, dayOptions)
          }
        })
      }
    }
  }

  private setStyleDayHighlight(key: any, dayOptions: any) {
    const { title, attributes} = this.daysHighlight[key];

    if (title) {
      dayOptions.title = title
    }

    if (isObject(attributes)) {
      const {style, data} = attributes;
      dayOptions.attributes.style = Array.from(new Set(dayOptions.attributes.style.concat(style)))
    }

    dayOptions.attributes.class.push(cssStates.IS_HIGHLIGHT)
    dayOptions.isHighlight = true

  }

  /**
   * @param      {number}  monthIndex
   * @return     {object}
   * @private
   */
  private monthsAsString(monthIndex: number): any {
    return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex]
  }

  /**
   * @param      {number}  weekIndex
   * @return     {object}
   * @private
   */
  private weekAsString(weekIndex: number): any {
    return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex]
  }

  /**
   * @private
   */
  private mounted(): void {
    const listDays: number[] = []
    if (this.calendar.period) {
      this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
    }
    /** define week format */
    this.calendar.week.textContent = ''
    for (let i = this.options.weekStart; i < this.langs.daysShort.length; i++) {
      listDays.push(i)
    }

    for (let i = 0; i < this.options.weekStart; i++) {
      listDays.push(i)
    }

    for (const day of listDays) {
      this.creatWeek(this.weekAsString(day))
    }

    this.createMonth()
  }

  /**
   * Clean calendar.
   * @private
   */
  private clearCalendar(): void {
    this.calendar.month.textContent = ''
  }

  /**
   * Removes all selected classes.
   * @private
   */
  private removeStatesClass(): void {
    for (const i of Object.keys(this.daysOfMonth)) {
      removeClass(this.daysOfMonth[i], cssStates.IS_SELECTED)
      removeClass(this.daysOfMonth[i], cssStates.IS_BEGIN_RANGE)
      removeClass(this.daysOfMonth[i], cssStates.IS_END_RANGE)
      this.days[+i + 1].isSelected = false
    }
  }
}