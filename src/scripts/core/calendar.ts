import { cssClasses, cssStates, daysWeek, margins } from '../shared/constants';
import { defaults } from '../shared/options';
import {
  extend,
  getIndexForEventTarget,
  isArray,
  el,
  render,
  addClass,
  removeClass,
  toggleClass
} from './../util/index';
import { isBetween, isSame, isSameOrAfter, isSameOrBefore } from './compare';
import { template } from './template';
import { getIntervalOfDates } from './interval';
import { setMinDate, setMaxDate } from './min-max';
import { toDate, setTimeZone, formatDate, formatDateToCompare } from './format';
import { IOptions, IDayOptions, ILangs, ICalendarTemplate } from '../defs/index';

export class HelloWeek {
  private readonly prevOptions: IOptions;
  private options: IOptions;
  private langs: ILangs;
  private selector: HTMLElement;
  private daysOfMonth: NodeListOf<Element>;
  private todayDate: string = toDate(new Date());
  private date: Date = new Date();
  private defaultDate?: Date;
  private calendar: ICalendarTemplate;
  private days: { [day: number]: IDayOptions };
  private isRTL: string;
  private daysHighlight: any;
  private intervalRange: any = {};
  private daysSelected: any = [];
  private lastSelectedDay: Date | string;

  constructor(options: IOptions) {
    this.options = extend(extend({}, defaults), options);
    this.prevOptions = extend(extend({}, defaults), options);
    const { calendar, selector } = template(this.options, {
      prev: {
        cb: () => this.prev()
      },
      next: {
        cb: () => this.next()
      }
    });

    this.selector = selector;
    this.calendar = calendar;
    this.isRTL = this.options.rtl ? margins.RIGHT : margins.LEFT;

    import(this.options.langFolder + this.options.lang + '.js')
      .then((data: any) => data.default)
      .then((lang: ILangs) => {
        this.langs = lang;
        this.willMount();
      });
  }

  destroy(): void {
    this.removeStatesClass();
    this.selector.remove();
  }

  /**
   *  Moves the calendar one month back.
   */
  prev(): void {
    const prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.update();

    this.options.onNavigation();
  }

  /**
   *  Moves the calendar one month forward.
   */
  next(): void {
    const nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);
    this.update();

    this.options.onNavigation();
  }

  /**
   *  Moves the calendar one year back.
   */
  prevYear(): void {
    const prevYear = this.date.getFullYear() - 1;
    this.date.setFullYear(prevYear);
    this.update();

    this.options.onNavigation();
  }

  /**
   *  Moves the calendar one year forward.
   */
  nextYear(): void {
    const nextYear = this.date.getFullYear() + 1;
    this.date.setFullYear(nextYear);
    this.update();

    this.options.onNavigation();
  }

  /**
   * Update and redraws the events for the current month.
   */
  update(): void {
    this.clearCalendar();
    this.mount();
  }

  /**
   * Reset calendar
   */
  reset(options: IOptions, callback?: () => void): void {
    this.clearCalendar();
    this.options = extend(this.prevOptions, options);
    this.willMount(callback);
  }

  /**
   * Move the calendar to arbitrary day.
   */
  goToDate(date: string = this.todayDate): void {
    this.date = new Date(date);
    this.date.setDate(1);
    this.update();
  }

  /**
   * Returns the selected days with the format specified.
   */
  getDaySelected(): any {
    return this.daysSelected
      .sort((a: string, b: string) => formatDateToCompare(a) - formatDateToCompare(b))
      .map((day: number) => formatDate(day, this.langs, this.options.format));
  }

  /**
   * Gets last day selected.
   */
  getLastDaySelected(): Date | string {
    return this.lastSelectedDay;
  }

  /**
   * Returns the highlight dates.
   */
  getDaysHighlight(): string {
    return this.daysHighlight;
  }

  /**
   * Returns the current month selected.
   */
  getMonth(): number {
    return this.date.getMonth() + 1;
  }

  /**
   * Returns the current year selected.
   */
  getYear(): number {
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
   */
  setMultiplePick(state: boolean) {
    this.options.multiplePick = state;
  }

  /**
   * Sets calendar with disable past days.
   */
  setDisablePastDays(state: boolean) {
    this.options.disablePastDays = state;
  }

  /**
   * Sets calendar with today highlight.
   */
  setTodayHighlight(state: boolean) {
    this.options.todayHighlight = state;
  }

  /**
   * Sets calendar range.
   */
  setRange(value: boolean | [string | number]) {
    if (isArray(this.options.range)) {
      this.intervalRange.begin = this.options.range[0];
      this.intervalRange.end = this.options.range[1];
    } else {
      this.options.range = value;
    }
  }

  /**
   * Sets calendar locked.
   */
  setLocked(state: boolean) {
    this.options.locked = state;
  }

  /**
   * Set min date.
   */
  setMinDate(date: number | string) {
    this.options.minDate = setMinDate(date);
  }

  /**
   * Set max date.
   */
  setMaxDate(date: number | string) {
    this.options.maxDate = setMaxDate(date);
  }

  private willMount(callback?: () => void) {
    this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
    this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];

    if (this.daysSelected.length && !this.options.multiplePick) {
      throw new Error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option is FALSE!`);
    }

    if (this.options.defaultDate) {
      this.date = setTimeZone(this.options.defaultDate, this.options.timezoneOffset);
      this.defaultDate = setTimeZone(this.options.defaultDate, this.options.timezoneOffset);
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

    this.mount();
    this.options.onLoad();
    if (callback) {
      callback();
    }
  }

  private selectDay(callback?: () => void): void {
    this.daysOfMonth = this.selector.querySelectorAll('.' + cssClasses.MONTH + ' .' + cssClasses.DAY);
    for (const i of Object.keys(this.daysOfMonth)) {
      this.handleClickInteraction(this.daysOfMonth[i], callback);
      if (this.options.range) {
        this.handleMouseInteraction(this.daysOfMonth[i]);
      }
    }
  }

  private handleClickInteraction(target: HTMLElement, callback?: (data: any) => void): void {
    target.addEventListener('click', (event: any) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target);
      if (this.days[index].locked) {
        return;
      }

      this.lastSelectedDay = this.days[index].date;
      if (!this.options.range) {
        if (this.options.multiplePick) {
          if (this.days[index].date) {
            this.daysSelected = this.daysSelected.filter(
              (day: Date) => formatDateToCompare(day) !== formatDateToCompare(this.lastSelectedDay)
            );
          }
          if (!this.days[index].isSelected) {
            this.daysSelected.push(this.lastSelectedDay);
          }
        } else {
          if (!this.days[index].locked) {
            this.removeStatesClass();
          }
          this.daysSelected = [];
          this.daysSelected.push(this.lastSelectedDay);
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
          this.intervalRange.end = this.days[index].date;
          this.daysSelected = getIntervalOfDates(this.intervalRange.begin, this.intervalRange.end, this.langs);
          addClass(event.target, cssStates.IS_END_RANGE);
          if (this.intervalRange.begin > this.intervalRange.end) {
            this.intervalRange = {};
            this.removeStatesClass();
          }
        }

        if (!this.intervalRange.begin) {
          this.intervalRange.begin = this.days[index].date;
        }

        addClass(event.target, cssStates.IS_SELECTED);
      }
      this.options.onSelect(this.days[index]);
      if (callback) {
        callback(this.days[index]);
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
        if (isSameOrAfter(this.days[index].date, this.intervalRange.begin)) {
          if (
            isSameOrAfter(this.days[i].date, this.intervalRange.begin) &&
            isSameOrBefore(this.days[i].date, this.days[index].date)
          ) {
            addClass(this.days[i].element, cssStates.IS_SELECTED);
            addClass(this.days[i].element, cssStates.IS_RANGE);
            if (isSame(this.days[i].date, this.intervalRange.begin)) {
              addClass(this.days[i].element, cssStates.IS_BEGIN_RANGE);
            }
          }
        }
      }
    });
  }

  private creatWeek(dayShort: string): void {
    render(el('span', { class: cssClasses.DAY }, dayShort), this.calendar.week);
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
    let dayOptions: IDayOptions = {
      day: num,
      date: toDate(date),
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
      node: undefined,
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
      (this.options.disablePastDays && isSameOrBefore(this.date, this.defaultDate)) ||
      (this.options.minDate && isSameOrAfter(this.options.minDate, dayOptions.date)) ||
      (this.options.maxDate && isSameOrBefore(this.options.maxDate, dayOptions.date))
    ) {
      dayOptions.attributes.class.push(cssStates.IS_DISABLED);
      dayOptions.locked = true;
    }

    if (this.options.disableDates) {
      this.disabledDays(dayOptions);
    }

    if (this.options.todayHighlight && isSame(this.todayDate, dayOptions.date)) {
      dayOptions.attributes.class.push(cssStates.IS_TODAY);
      dayOptions.isToday = true;
    }

    this.daysSelected.find((daySelected: number) => {
      if (isSame(daySelected, dayOptions.date)) {
        dayOptions.attributes.class.push(cssStates.IS_SELECTED);
        dayOptions.isSelected = true;
      }
    });

    if (isBetween(this.intervalRange.begin, this.intervalRange.end, dayOptions.date)) {
      dayOptions.attributes.class.push(cssStates.IS_RANGE);
      dayOptions.isRange = true;
    }

    if (isSame(dayOptions.date, this.intervalRange.begin)) {
      dayOptions.attributes.class.push(cssStates.IS_BEGIN_RANGE);
    }

    if (isSame(dayOptions.date, this.intervalRange.end)) {
      dayOptions.attributes.class.push(cssStates.IS_END_RANGE);
    }

    if (this.daysHighlight) {
      this.highlightDays(dayOptions);
    }

    if (dayOptions.day === 1) {
      if (this.options.weekStart === daysWeek.SUNDAY) {
        dayOptions.attributes.style[this.isRTL] = day * (100 / Object.keys(daysWeek).length) + '%';
      } else {
        if (day === daysWeek.SUNDAY) {
          dayOptions.attributes.style[this.isRTL] =
            (Object.keys(daysWeek).length - this.options.weekStart) * (100 / Object.keys(daysWeek).length) + '%';
        } else {
          dayOptions.attributes.style[this.isRTL] = (day - 1) * (100 / Object.keys(daysWeek).length) + '%';
        }
      }
    }

    dayOptions.node = el('div', dayOptions.attributes, dayOptions.day.toString());
    dayOptions = this.options.dayRender(dayOptions);
    dayOptions.element = render(dayOptions.node, this.calendar.month);
    this.days[dayOptions.day] = dayOptions;
  }

  private disabledDays(dayOptions: any): void {
    if (isArray(this.options.disableDates[0])) {
      this.options.disableDates.map((date: any) => {
        if (isSameOrAfter(dayOptions.date, date[0]) && isSameOrBefore(dayOptions.date, date[1])) {
          dayOptions.attributes.class.push(cssStates.IS_DISABLED);
          dayOptions.locked = true;
        }
      });
    } else {
      this.options.disableDates.map((date: any) => {
        if (isSame(dayOptions.date, date)) {
          dayOptions.attributes.class.push(cssStates.IS_DISABLED);
          dayOptions.locked = true;
        }
      });
    }
  }

  private highlightDays(dayOptions: any): void {
    for (const day in this.daysHighlight) {
      if (this.daysHighlight[day].days[0] instanceof Array) {
        this.daysHighlight[day].days.map((date: any) => {
          if (isSameOrAfter(dayOptions.date, date[0]) && isSameOrBefore(dayOptions.date, date[1])) {
            this.computedAttributes(day, dayOptions);
          }
        });
      } else {
        this.daysHighlight[day].days.map((date: any) => {
          if (isSame(dayOptions.date, date)) {
            this.computedAttributes(day, dayOptions);
          }
        });
      }
    }
  }

  private computedAttributes(day: any, dayOptions: any) {
    const { attributes, days, ...rest } = this.daysHighlight[day];
    dayOptions = extend(dayOptions, rest);
    for (const key in attributes) {
      if (dayOptions.attributes[key] && attributes[key]) {
        dayOptions.attributes[key] = extend(dayOptions.attributes[key], attributes[key]);
      } else if (attributes[key]) {
        dayOptions.attributes[key] = attributes[key];
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

  private mount(): void {
    if (this.calendar.period) {
      this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
    }

    const listDays: number[] = [];
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

export { el };
