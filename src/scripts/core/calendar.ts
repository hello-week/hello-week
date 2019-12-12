import { cssClasses, cssStates, daysWeek, formatDate } from '../shared/constants';
import { defaults } from '../shared/options';
import {
  log,
  warn,
  error,
  checkUrl,
  readFile,
  extend,
  getIndexForEventTarget,
  isObject,
  isTrue,
  isArray,
  setAttr,
  h,
  render,
  addClass,
  removeClass,
  setStyle,
  toggleClass
} from './../util/index';
import { isBetween } from './compare';
import { template } from './template';
import { setMinDate, setMaxDate } from './min-max';
import { format } from './format';
import { humanToTimestamp, timestampToHuman, setToTimestamp } from './timestamp';

export class HelloWeek {
  private readonly defaultsOptions: any;
  private options: any;
  private selector: any;
  private calendar: any = {};
  private date: any;
  private todayDate: any;
  private daysHighlight: any;
  private defaultDate: any;
  private langs: any;
  private daysOfMonth: any;
  private intervalRange: any = {};
  private daysSelected: any = [];
  private lastSelectedDay: any;
  private days: any;

  constructor(options: any = {}) {
    this.options = extend(extend({}, defaults), options);
    this.defaultsOptions = extend(extend({}, defaults), options);

    const calendar = template(this.options, {
      prev: {
        cb: () => this.prev()
      },
      next: {
        cb: () => this.next()
      }
    });

    this.selector = calendar.selector;
    this.calendar = calendar.calendar;

    if (checkUrl(this.options.langFolder)) {
      readFile(this.options.langFolder, (text: any) => {
        this.langs = text;
        this.init(() => {
          /** callback function */
        });
      });
    } else {
      readFile(this.options.langFolder + this.options.lang + '.json', (text: any) => {
        this.langs = text;
        this.init(() => {
          /** callback function */
        });
      });
    }
  }

  destroy(): void {
    this.removeStatesClass();
    this.selector.remove();
  }

  /**
   * Change the month to the previous, also you can send a callback function like a parameter.
   */
  prev(callback?: () => void): void {
    const prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.update();

    this.options.onNavigation.call(this);
    if (callback) {
      callback.call(this);
    }
  }

  /**
   * Change the month to the next, also you can send a callback function like a parameter.
   */
  next(callback?: () => void): void {
    const nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);
    this.update();

    this.options.onNavigation.call(this);
    if (callback) {
      callback.call(this);
    }
  }

  /**
   * Update and redraws the events for the current month.
   */
  update(): void {
    this.clearCalendar();
    this.mounted();
  }

  /**
   * Reset calendar
   */
  reset(options: any = {}, callback?: () => void): void {
    this.clearCalendar();
    this.options = extend(options, this.defaultsOptions);
    this.init(callback);
  }

  /**
   * Move the calendar to current day.
   */
  goToday(): void {
    this.date = this.todayDate;
    this.date.setDate(1);
    this.update();
  }

  /**
   * Move the calendar to arbitrary day.
   * @param {any} date
   */
  goToDate(date: any = this.todayDate): void {
    this.date = new Date(date);
    this.date.setDate(1);
    this.update();
  }

  /**
   * Returns the selected days with the format specified.
   * @return {any}
   */
  getDays(): any {
    return this.daysSelected.map((day: number) => timestampToHuman(day, this.langs, this.options.format));
  }

  /**
   * Gets the day selected.
   * @return {number}
   */
  getDaySelected(): number {
    return this.lastSelectedDay;
  }

  /**
   * Returns the highlight dates.
   * @return {object}
   */
  getDaysHighlight(): string {
    return this.daysHighlight;
  }

  /**
   * Returns the current month selected.
   * @return {string}
   */
  getMonth(): string {
    return this.date.getMonth() + 1;
  }

  /**
   * Returns the current year selected.
   * @return {string}
   */
  getYear(): string {
    return this.date.getFullYear();
  }

  /**
   * Set highlight dates,
   */
  setDaysHighlight(daysHighlight: any): void {
    this.daysHighlight = [...this.daysHighlight, ...daysHighlight];
  }

  /**
   * Sets calendar with multiple pick.
   * @param {boolean} state
   */
  setMultiplePick(state: boolean) {
    this.options.multiplePick = state;
  }

  /**
   * Sets calendar with disable past days.
   * @param {boolean} state
   */
  setDisablePastDays(state: boolean) {
    this.options.disablePastDays = state;
  }

  /**
   * Sets calendar with today highlight.
   * @param {boolean} state
   */
  setTodayHighlight(state: boolean) {
    this.options.todayHighlight = state;
  }

  /**
   * Sets calendar range.
   */
  setRange(value: boolean | [string | number]) {
    if (isArray(this.options.range)) {
      this.intervalRange.begin = humanToTimestamp(this.options.range[0]);
      this.intervalRange.end = humanToTimestamp(this.options.range[1]);
    } else {
      this.options.range = value;
    }
  }

  /**
   * Sets calendar locked.
   * @param {boolean} state
   */
  setLocked(state: boolean) {
    this.options.locked = state;
  }

  /**
   * Set min date.
   * @param {string} date
   */
  setMinDate(date: number | string) {
    this.options.minDate = setMinDate(date);
  }

  /**
   * Set max date.
   * @param {string} date
   */
  setMaxDate(date: number | string) {
    this.options.maxDate = setMaxDate(date);
  }

  private init(callback?: () => void) {
    this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
    this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];

    if (this.daysSelected.length > 1 && !this.options.multiplePick) {
      error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option
                is ${this.options.multiplePick}!`);
    }

    this.todayDate = setToTimestamp() - new Date().getTimezoneOffset() * 1000 * 60;
    this.date = new Date();
    this.defaultDate = new Date();

    if (this.options.defaultDate) {
      this.date = new Date(this.options.defaultDate);
      this.defaultDate = new Date(this.options.defaultDate);
      this.defaultDate.setDate(this.defaultDate.getDate());
    }
    this.date.setDate(1);

    if (this.options.minDate) {
      this.setMinDate(this.options.minDate);
    }

    if (this.options.maxDate) {
      this.setMaxDate(this.options.maxDate);
    }

    if (this.options.range) {
      this.setRange(this.options.range);
    }

    this.mounted();
    this.options.onLoad.call(this);
    if (callback) {
      callback.call(this);
    }
  }

  /**
   * Select day
   * @private
   */
  private selectDay(callback?: () => void): void {
    this.daysOfMonth = this.selector.querySelectorAll('.' + cssClasses.MONTH + ' .' + cssClasses.DAY);
    for (const i of Object.keys(this.daysOfMonth)) {
      this.handleClickInteraction(this.daysOfMonth[i], callback);
      if (this.options.range) {
        this.handleMouseInteraction(this.daysOfMonth[i]);
      }
    }
  }

  private getIntervalOfDates(startDate: number, endDate: number) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function(this: any, days: any) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date.getTime();
    };
    while (currentDate <= endDate) {
      dates.push(timestampToHuman(currentDate, this.langs));
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  private handleClickInteraction(target: HTMLElement, callback?: () => void): void {
    target.addEventListener('click', (event: any) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target);
      if (this.days[index].locked) {
        return;
      }

      this.lastSelectedDay = this.days[index].timestamp;
      if (!this.options.range) {
        if (this.options.multiplePick) {
          if (this.days[index].timestamp) {
            this.daysSelected = this.daysSelected.filter((day: string) => setToTimestamp(day) !== this.lastSelectedDay);
          }
          if (!this.days[index].isSelected) {
            this.daysSelected.push(timestampToHuman(this.lastSelectedDay, this.langs));
          }
        } else {
          if (!this.days[index].locked) {
            this.removeStatesClass();
          }
          this.daysSelected = [];
          this.daysSelected.push(timestampToHuman(this.lastSelectedDay, this.langs));
        }
      }
      toggleClass(event.target, cssStates.IS_SELECTED);
      this.days[index].isSelected = !this.days[index].isSelected;
      if (this.options.range) {
        if (this.intervalRange.begin && this.intervalRange.end) {
          this.intervalRange = {};
          this.removeStatesClass();
        }
        if (this.intervalRange.begin && !this.intervalRange.end) {
          this.intervalRange.end = this.days[index].timestamp;
          this.daysSelected = this.getIntervalOfDates(this.intervalRange.begin, this.intervalRange.end);
          addClass(event.target, cssStates.IS_END_RANGE);
          if (this.intervalRange.begin > this.intervalRange.end) {
            this.intervalRange = {};
            this.removeStatesClass();
          }
        }

        if (!this.intervalRange.begin) {
          this.intervalRange.begin = this.days[index].timestamp;
        }

        addClass(event.target, cssStates.IS_SELECTED);
      }

      this.options.onSelect.call(this);
      if (callback) {
        callback.call(this);
      }
    });
  }

  private handleMouseInteraction(target: HTMLElement): void {
    target.addEventListener('mouseover', (event: any) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target);
      if (!this.intervalRange.begin || (this.intervalRange.begin && this.intervalRange.end)) {
        return;
      }
      this.removeStatesClass();
      for (let i = 1; i <= Object.keys(this.days).length; i++) {
        this.days[i].isSelected = false;
        if (this.days[index].timestamp >= this.intervalRange.begin) {
          if (
            this.days[i].timestamp >= this.intervalRange.begin &&
            this.days[i].timestamp <= this.days[index].timestamp
          ) {
            addClass(this.days[i].element, cssStates.IS_SELECTED);
            addClass(this.days[i].element, cssStates.IS_RANGE);
            if (this.days[i].timestamp === this.intervalRange.begin) {
              addClass(this.days[i].element, cssStates.IS_BEGIN_RANGE);
            }
          }
        }
      }
    });
  }

  private creatWeek(dayShort: string): void {
    render(h('span', { class: cssClasses.DAY }, dayShort), this.calendar.week);
  }

  private createMonth(): void {
    const currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth) {
      this.createDay(this.date);
      this.date.setDate(this.date.getDate() + 1);
    }
    this.date.setMonth(this.date.getMonth() - 1);
    this.selectDay();
  }

  private createDay(date: Date): void {
    const num = date.getDate();
    const day = date.getDay();
    const dayOptions: any = {
      day: num,
      timestamp: humanToTimestamp(format(date.getDate(), date.getMonth(), date.getFullYear())),
      isWeekend: false,
      locked: false,
      isToday: false,
      isRange: false,
      isSelected: false,
      isHighlight: false,
      attributes: {
        class: [cssClasses.DAY],
        style: {}
      },
      element: undefined
    };

    this.days = this.days || {};

    if (day === daysWeek.SUNDAY || day === daysWeek.SATURDAY) {
      dayOptions.attributes.class.push(cssStates.IS_WEEKEND);
      dayOptions.isWeekend = true;
    }

    if (
      this.options.locked ||
      (this.options.disableDaysOfWeek && this.options.disableDaysOfWeek.includes(day)) ||
      (this.options.disablePastDays && +this.date.setHours(0, 0, 0, 0) <= +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
      (this.options.minDate && +this.options.minDate >= dayOptions.timestamp) ||
      (this.options.maxDate && +this.options.maxDate <= dayOptions.timestamp)
    ) {
      dayOptions.attributes.class.push(cssStates.IS_DISABLED);
      dayOptions.locked = true;
    }

    if (this.options.disableDates) {
      this.setDaysDisable(dayOptions);
    }

    if (this.todayDate === dayOptions.timestamp && this.options.todayHighlight) {
      dayOptions.attributes.class.push(cssStates.IS_TODAY);
      dayOptions.isToday = true;
    }

    this.daysSelected.find((daySelected: number) => {
      if (daySelected === dayOptions.timestamp || humanToTimestamp(daySelected.toString()) === dayOptions.timestamp) {
        dayOptions.attributes.class.push(cssStates.IS_SELECTED);
        dayOptions.isSelected = true;
      }
    });

    if (isBetween(this.intervalRange.begin, this.intervalRange.end, dayOptions.timestamp)) {
      dayOptions.attributes.class.push(cssStates.IS_RANGE);
      dayOptions.isRange = true;
    }

    if (dayOptions.timestamp === this.intervalRange.begin) {
      dayOptions.attributes.class.push(cssStates.IS_BEGIN_RANGE);
    }

    if (dayOptions.timestamp === this.intervalRange.end) {
      dayOptions.attributes.class.push(cssStates.IS_END_RANGE);
    }

    if (this.daysHighlight) {
      this.setDayHighlight(dayOptions);
    }

    if (dayOptions.day === 1) {
      if (this.options.weekStart === daysWeek.SUNDAY) {
        dayOptions.attributes.style[this.options.rtl ? 'margin-right' : 'margin-left'] =
          day * (100 / Object.keys(daysWeek).length) + '%';
      } else {
        if (day === daysWeek.SUNDAY) {
          dayOptions.attributes.style[this.options.rtl ? 'margin-right' : 'margin-left'] =
            (Object.keys(daysWeek).length - this.options.weekStart) * (100 / Object.keys(daysWeek).length) + '%';
        } else {
          dayOptions.attributes.style[this.options.rtl ? 'margin-right' : 'margin-left'] =
            (day - 1) * (100 / Object.keys(daysWeek).length) + '%';
        }
      }
    }

    dayOptions.element = render(h('div', dayOptions.attributes, String(dayOptions.day)), this.calendar.month);
    this.days[dayOptions.day] = dayOptions;
  }

  private setDaysDisable(dayOptions: any): void {
    if (this.options.disableDates[0] instanceof Array) {
      this.options.disableDates.map((date: any) => {
        if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
          dayOptions.attributes.class.push(cssStates.IS_DISABLED);
          dayOptions.locked = true;
        }
      });
    } else {
      this.options.disableDates.map((date: any) => {
        if (dayOptions.timestamp === setToTimestamp(date)) {
          dayOptions.attributes.class.push(cssStates.IS_DISABLED);
          dayOptions.locked = true;
        }
      });
    }
  }

  private setDayHighlight(dayOptions: any): void {
    for (const key in this.daysHighlight) {
      if (this.daysHighlight[key].days[0] instanceof Array) {
        this.daysHighlight[key].days.map((date: any, index: number) => {
          if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
            this.setStyleDayHighlight(key, dayOptions);
          }
        });
      } else {
        this.daysHighlight[key].days.map((date: any) => {
          if (dayOptions.timestamp === setToTimestamp(date)) {
            this.setStyleDayHighlight(key, dayOptions);
          }
        });
      }
    }
  }

  private setStyleDayHighlight(key: any, dayOptions: any) {
    const { attributes } = this.daysHighlight[key];

    for (const k in attributes) {
      if (dayOptions.attributes[k] && attributes[k]) {
        dayOptions.attributes[k] = extend(dayOptions.attributes[k], attributes[k]);
      } else if (attributes[k]) {
        dayOptions.attributes[k] = attributes[k];
      }
    }
    dayOptions.attributes.class.push(cssStates.IS_HIGHLIGHT);
    dayOptions.isHighlight = true;
  }

  private monthsAsString(monthIndex: number): any {
    return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
  }

  private weekAsString(weekIndex: number): any {
    return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
  }

  private mounted(): void {
    const listDays: number[] = [];
    if (this.calendar.period) {
      this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
    }

    this.calendar.week.textContent = '';
    for (let i = this.options.weekStart; i < this.langs.daysShort.length; i++) {
      listDays.push(i);
    }

    for (let i = 0; i < this.options.weekStart; i++) {
      listDays.push(i);
    }

    for (const day of listDays) {
      this.creatWeek(this.weekAsString(day));
    }

    this.createMonth();
  }

  private clearCalendar(): void {
    this.calendar.month.textContent = '';
  }

  private removeStatesClass(): void {
    for (const i of Object.keys(this.daysOfMonth)) {
      removeClass(this.daysOfMonth[i], cssStates.IS_SELECTED);
      removeClass(this.daysOfMonth[i], cssStates.IS_RANGE);
      removeClass(this.daysOfMonth[i], cssStates.IS_BEGIN_RANGE);
      removeClass(this.daysOfMonth[i], cssStates.IS_END_RANGE);
      this.days[+i + 1].isSelected = false;
    }
  }
}
