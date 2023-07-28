import {
    CalendarOptions,
    CallbackFunction,
    ClassNames,
    DayOptions,
    DaysHighlight,
    IntervalRange,
    Langs,
    Options,
} from '../types';
import {
    addClass,
    createHTMLElement,
    removeClass,
    setDataAttr,
    setStyle,
    toggleClass,
} from '../utils/dom';
import { extend } from '../utils/extend';
import { formatDate, setToTimestamp, timestampToHuman } from '../utils/format';
import { isArray, isNull, isString } from '../utils/is';
import { getIndexForEventTarget } from '../utils/array';
import { CSS_CLASSES, DAYS_WEEK, FORMAT_DATE } from './constants';

import { HelloWeekNext } from '../../packages/vanilla';

export class HelloWeek {
    private static initOptions: Options;
    private options: Options;
    private selector: HTMLElement;
    private calendar: CalendarOptions = {
        navigation: undefined,
        period: undefined,
        prevMonth: undefined,
        nextMonth: undefined,
        week: undefined,
        month: undefined,
    };
    private date: Date;
    private todayDate: number;
    private cssClasses: ClassNames = CSS_CLASSES;
    private daysHighlight: DaysHighlight[];
    private defaultDate: Date;
    private langs: Langs;
    private daysOfMonth: NodeListOf<Element>;
    private intervalRange: IntervalRange = {
        begin: 0,
        end: 0,
    };
    private daysSelected: (string | number)[] = [];
    private lastSelectedDay: number;
    private days: DayOptions[];

    /* @return enum {DAYS_WEEK} */
    static get daysWeek() {
        return DAYS_WEEK;
    }

    constructor(options: Options) {
        // Next Version
        new HelloWeekNext({ selector: '#root', lang: 'en-UK' });

        this.options = Object.assign({}, extend(options));
        HelloWeek.initOptions = Object.assign({}, extend(options));
        this.selector =
            typeof this.options.selector === 'string'
                ? document.querySelector(this.options.selector)
                : this.options.selector;

        if (isNull(this.selector)) {
            throw new Error('You need to specify a selector!');
        }

        if (this.options.selector !== this.cssClasses.calendar) {
            addClass(this.selector, this.cssClasses.calendar);
        }

        this.calendar.navigation = createHTMLElement(
            this.selector,
            this.cssClasses.navigation,
            this.selector
        );

        if (this.options.nav) {
            const [prev, next] = this.options.nav;
            this.calendar.prevMonth = createHTMLElement(
                this.selector,
                this.cssClasses.prev,
                this.calendar.navigation,
                prev
            );
            this.calendar.period = createHTMLElement(
                this.selector,
                this.cssClasses.period,
                this.calendar.navigation
            );
            this.calendar.nextMonth = createHTMLElement(
                this.selector,
                this.cssClasses.next,
                this.calendar.navigation,
                next
            );
            this.calendar.prevMonth.addEventListener('click', () => {
                this.prev(() => {
                    /** callback */
                });
            });
            this.calendar.nextMonth.addEventListener('click', () => {
                this.next(() => {
                    /** callback */
                });
            });
        } else {
            this.calendar.period = createHTMLElement(
                this.selector,
                this.cssClasses.period,
                this.calendar.navigation
            );
        }
        this.calendar.week = createHTMLElement(
            this.selector,
            this.cssClasses.week,
            this.selector
        );
        this.calendar.month = createHTMLElement(
            this.selector,
            this.cssClasses.month,
            this.selector
        );

        if (this.options.rtl) {
            addClass(this.calendar.week, this.cssClasses.rtl);
            addClass(this.calendar.month, this.cssClasses.rtl);
        }

        import(this.options.langFolder + this.options.lang + '.js')
            .then((data) => data)
            .then((data) => {
                this.langs = data.default;
            })
            .then(() => this.init());
    }

    public destroy(options?: { removeElement?: boolean }): void {
        this.removeEventsHandler();
        this.calendar.prevMonth.removeEventListener('click', () => this.prev());
        this.calendar.nextMonth.removeEventListener('click', () => this.next());
        this.selector.innerHTML = '';

        if (options?.removeElement) {
            this.selector.remove();
        }
    }

    public prev(callback?: CallbackFunction): void {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();

        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    public next(callback?: CallbackFunction): void {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();

        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    public update(): void {
        this.clearCalendar();
        this.mounted();
    }

    public reset(options: Options, callback?: CallbackFunction): void {
        this.clearCalendar();
        this.options = extend(options, HelloWeek.initOptions);
        this.init(callback);
    }

    public goToday(): void {
        this.date = new Date();
        this.date.setDate(1);
        this.update();
    }

    public goToDate(date: Date | string | number): void {
        this.date = new Date(date || this.todayDate);
        this.date.setDate(1);
        this.update();
    }

    public getDays(): string[] {
        return this.daysSelected.map((day: number) =>
            timestampToHuman({
                timestamp: day,
                format: this.options.format,
                langs: this.langs,
                timezoneOffset: this.options.timezoneOffset,
            })
        );
    }

    public getDaySelected(): number {
        return this.lastSelectedDay;
    }

    public getDaysHighlight(): DaysHighlight[] {
        return this.daysHighlight;
    }

    public getMonth(): number {
        return this.date.getMonth() + 1;
    }

    public getYear(): number {
        return this.date.getFullYear();
    }

    public setDaysHighlight(daysHighlight: DaysHighlight[]): void {
        this.daysHighlight = [...this.daysHighlight, ...daysHighlight];
    }

    public setMultiplePick(state: boolean) {
        this.options.multiplePick = state;
    }

    public setDisablePastDays(state: boolean) {
        this.options.disablePastDays = state;
    }

    public setTodayHighlight(state: boolean) {
        this.options.todayHighlight = state;
    }

    public setRange(state: boolean) {
        this.options.range = state;
    }

    public setLocked(state: boolean) {
        this.options.locked = state;
    }

    public setMinDate(date: Date) {
        this.options.minDate = new Date(date);
        this.options.minDate.setHours(0, 0, 0, 0);
        this.options.minDate.setDate(this.options.minDate.getDate() - 1);
    }

    public setMaxDate(date: Date) {
        this.options.maxDate = new Date(date);
        this.options.maxDate.setHours(0, 0, 0, 0);
        this.options.maxDate.setDate(this.options.maxDate.getDate() + 1);
    }

    private init(callback?: CallbackFunction) {
        this.daysHighlight = this.options.daysHighlight
            ? this.options.daysHighlight
            : [];
        this.daysSelected = this.options.daysSelected
            ? this.options.daysSelected
            : [];

        if (this.daysSelected.length > 1 && !this.options.multiplePick) {
            throw new Error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option
                is ${this.options.multiplePick}!`);
        }

        this.todayDate = setToTimestamp();

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

        this.mounted();
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    private selectDay(callback?: CallbackFunction): void {
        this.daysOfMonth = this.selector.querySelectorAll(
            '.' + this.cssClasses.month + ' .' + this.cssClasses.day
        );
        this.addEventsHandler(callback);
    }

    private getIntervalOfDates(startDate: number, endDate: number) {
        const dates = [];
        let currentDate = startDate;
        const addDays = function (days: number) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date.getTime();
        };
        while (currentDate <= endDate) {
            dates.push(
                timestampToHuman({
                    timestamp: currentDate,
                    format: FORMAT_DATE,
                    langs: this.langs,
                    timezoneOffset: this.options.timezoneOffset,
                })
            );
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    }

    private onHandleClick(
        event: MouseEvent & {
            target: HTMLElement;
        },
        callback?: CallbackFunction
    ): void {
        const index = getIndexForEventTarget(this.daysOfMonth, event.target);
        if (this.days[index].locked) return;

        this.lastSelectedDay = this.days[index].timestamp;
        if (!this.options.range) {
            if (this.options.multiplePick) {
                if (this.days[index].timestamp) {
                    this.daysSelected = this.daysSelected.filter(
                        (day: string) =>
                            setToTimestamp(day) !== this.lastSelectedDay
                    );
                }
                if (!this.days[index].isSelected) {
                    this.daysSelected.push(
                        timestampToHuman({
                            timestamp: this.lastSelectedDay,
                            format: FORMAT_DATE,
                            langs: this.langs,
                            timezoneOffset: this.options.timezoneOffset,
                        })
                    );
                }
            } else {
                if (!this.days[index].locked) {
                    this.removeCSSClasses();
                }
                this.daysSelected = [];
                this.daysSelected.push(
                    timestampToHuman({
                        timestamp: this.lastSelectedDay,
                        format: FORMAT_DATE,
                        langs: this.langs,
                        timezoneOffset: this.options.timezoneOffset,
                    })
                );
            }
        }

        toggleClass(event.target, this.cssClasses.isSelected);
        this.days[index].isSelected = !this.days[index].isSelected;
        if (this.options.range) {
            if (this.intervalRange.begin && this.intervalRange.end) {
                this.intervalRange.begin = undefined;
                this.intervalRange.end = undefined;
                this.removeCSSClasses();
            }
            if (this.intervalRange.begin && !this.intervalRange.end) {
                this.intervalRange.end = this.days[index].timestamp;
                this.daysSelected = this.getIntervalOfDates(
                    this.intervalRange.begin,
                    this.intervalRange.end
                );
                addClass(event.target, this.cssClasses.isEndRange);
                if (this.intervalRange.begin > this.intervalRange.end) {
                    this.intervalRange.begin = undefined;
                    this.intervalRange.end = undefined;
                    this.removeCSSClasses();
                }
            }

            if (!this.intervalRange.begin) {
                this.intervalRange.begin = this.days[index].timestamp;
            }

            addClass(event.target, this.cssClasses.isSelected);
        }

        this.options.onSelect.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    private onHandleMouse(event: MouseEvent): void {
        const index = getIndexForEventTarget(this.daysOfMonth, event.target);
        if (
            !this.intervalRange.begin ||
            (this.intervalRange.begin && this.intervalRange.end)
        ) {
            return;
        }
        this.removeCSSClasses();
        for (let i = 1; i <= Object.keys(this.days).length; i++) {
            this.days[i].isSelected = false;
            if (this.days[index].timestamp >= this.intervalRange.begin) {
                if (
                    this.days[i].timestamp >= this.intervalRange.begin &&
                    this.days[i].timestamp <= this.days[index].timestamp
                ) {
                    addClass(this.days[i].element, this.cssClasses.isSelected);
                    if (this.days[i].timestamp === this.intervalRange.begin) {
                        addClass(
                            this.days[i].element,
                            this.cssClasses.isBeginRange
                        );
                    }
                }
            }
        }
    }

    private createWeek(dayShort: string): void {
        const weekDay = document.createElement('span');
        addClass(weekDay, this.cssClasses.day);
        weekDay.textContent = dayShort;
        this.calendar.week.appendChild(weekDay);
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
        const newDay = document.createElement('div');
        let dayOptions: DayOptions = {
            day: num,
            timestamp: setToTimestamp(
                formatDate(date.getDate(), date.getMonth(), date.getFullYear())
            ),
            isWeekend: false,
            locked: false,
            isToday: false,
            isSelected: false,
            isHighlight: false,
            element: undefined,
        };

        this.days = this.days || [];
        newDay.textContent = dayOptions.day.toString();
        addClass(newDay, this.cssClasses.day);

        if (dayOptions.day === 1) {
            if (this.options.weekStart === HelloWeek.daysWeek.SUNDAY) {
                setStyle(
                    newDay,
                    this.options.rtl ? 'margin-right' : 'margin-left',
                    day * (100 / Object.keys(HelloWeek.daysWeek).length) + '%'
                );
            } else {
                if (day === HelloWeek.daysWeek.SUNDAY) {
                    setStyle(
                        newDay,
                        this.options.rtl ? 'margin-right' : 'margin-left',
                        (Object.keys(HelloWeek.daysWeek).length -
                            this.options.weekStart) *
                            (100 / Object.keys(HelloWeek.daysWeek).length) +
                            '%'
                    );
                } else {
                    setStyle(
                        newDay,
                        this.options.rtl ? 'margin-right' : 'margin-left',
                        (day - 1) *
                            (100 / Object.keys(HelloWeek.daysWeek).length) +
                            '%'
                    );
                }
            }
        }

        if (
            day === HelloWeek.daysWeek.SUNDAY ||
            day === HelloWeek.daysWeek.SATURDAY
        ) {
            addClass(newDay, this.cssClasses.isWeekend);
            dayOptions.isWeekend = true;
        }

        if (
            this.options.locked ||
            (this.options.disabledDaysOfWeek &&
                this.options.disabledDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays &&
                +this.date.setHours(0, 0, 0, 0) <=
                    +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
            (this.options.minDate &&
                +this.options.minDate >= dayOptions.timestamp) ||
            (this.options.maxDate &&
                +this.options.maxDate <= dayOptions.timestamp)
        ) {
            addClass(newDay, this.cssClasses.isDisabled);
            dayOptions.locked = true;
        }

        if (this.options.disableDates) {
            this.setDaysDisable(newDay, dayOptions);
        }

        if (
            this.todayDate === dayOptions.timestamp &&
            this.options.todayHighlight
        ) {
            addClass(newDay, this.cssClasses.isToday);
            dayOptions.isToday = true;
        }

        if (this.options.range) {
            const startRange = this.daysSelected[0];
            const endRange = this.daysSelected.at(-1);

            if (
                setToTimestamp(startRange.toString()) <= dayOptions.timestamp &&
                setToTimestamp(endRange.toString()) >= dayOptions.timestamp
            ) {
                addClass(newDay, this.cssClasses.isSelected);
                dayOptions.isSelected = true;
            }
        } else {
            this.daysSelected.find((day: number) => {
                if (
                    day === dayOptions.timestamp ||
                    setToTimestamp(day.toString()) === dayOptions.timestamp
                ) {
                    addClass(newDay, this.cssClasses.isSelected);
                    dayOptions.isSelected = true;
                }
            });
        }

        if (dayOptions.timestamp === this.intervalRange.begin) {
            addClass(newDay, this.cssClasses.isBeginRange);
        }

        if (dayOptions.timestamp === this.intervalRange.end) {
            addClass(newDay, this.cssClasses.isEndRange);
        }

        if (this.daysHighlight) {
            this.setDayHighlight(newDay, dayOptions);
        }

        if (this.calendar.month) {
            this.calendar.month.appendChild(newDay);
        }

        dayOptions.element = newDay;
        dayOptions = this.options.beforeCreateDay(dayOptions);
        this.days[dayOptions.day] = dayOptions;
    }

    private setDaysDisable(newDay: HTMLElement, dayOptions: DayOptions): void {
        if (isArray(this.options.disableDates[0])) {
            this.options.disableDates.forEach((date) => {
                if (
                    dayOptions.timestamp >= setToTimestamp(date[0]) &&
                    dayOptions.timestamp <= setToTimestamp(date[1])
                ) {
                    addClass(newDay, this.cssClasses.isDisabled);
                    dayOptions.locked = true;
                }
            });
            return;
        }

        if (isArray(this.options.disableDates)) {
            this.options.disableDates.forEach((date) => {
                if (
                    isString(date) &&
                    dayOptions.timestamp === setToTimestamp(date as string)
                ) {
                    addClass(newDay, this.cssClasses.isDisabled);
                    dayOptions.locked = true;
                }
            });
        }
    }

    private setDayHighlight(newDay: HTMLElement, dayOptions: DayOptions): void {
        this.daysHighlight.map((day, index) => {
            if (isArray(day.days[0])) {
                day.days.forEach((date) => {
                    if (
                        dayOptions.timestamp >= setToTimestamp(date[0]) &&
                        dayOptions.timestamp <= setToTimestamp(date[1])
                    ) {
                        this.setStyleDayHighlight(newDay, +index, dayOptions);
                    }
                });
                return;
            }
            if (isArray(day.days)) {
                day.days.forEach((date) => {
                    if (dayOptions.timestamp === setToTimestamp(date)) {
                        this.setStyleDayHighlight(newDay, +index, dayOptions);
                    }
                });
            }
        });
    }

    private setStyleDayHighlight(
        newDay: HTMLElement,
        key: number,
        dayOptions: DayOptions
    ) {
        addClass(newDay, this.cssClasses.isHighlight);
        if (this.daysHighlight[key].title) {
            dayOptions.title = this.daysHighlight[key].title;
            setDataAttr(newDay, 'data-title', this.daysHighlight[key].title);
        }

        if (this.daysHighlight[key].color) {
            setStyle(newDay, 'color', this.daysHighlight[key].color);
        }
        if (this.daysHighlight[key].backgroundColor) {
            setStyle(
                newDay,
                'background-color',
                this.daysHighlight[key].backgroundColor
            );
        }
        dayOptions.isHighlight = true;
    }

    private monthsAsString(monthIndex: number): string {
        return this.options.monthShort
            ? this.langs.monthsShort[monthIndex]
            : this.langs.months[monthIndex];
    }

    private weekAsString(weekIndex: number): string {
        return this.options.weekShort
            ? this.langs.daysShort[weekIndex]
            : this.langs.days[weekIndex];
    }

    private mounted(): void {
        const listDays: number[] = [];
        if (this.calendar.period) {
            this.calendar.period.innerHTML =
                this.monthsAsString(this.date.getMonth()) +
                ' ' +
                this.date.getFullYear();
        }

        this.calendar.week.textContent = '';
        for (
            let i = this.options.weekStart;
            i < this.langs.daysShort.length;
            i++
        ) {
            listDays.push(i);
        }

        for (let i = 0; i < this.options.weekStart; i++) {
            listDays.push(i);
        }

        for (const day of listDays) {
            this.createWeek(this.weekAsString(day));
        }

        this.createMonth();
    }

    private addEventsHandler(callback?: CallbackFunction): void {
        this.daysOfMonth.forEach((element: HTMLElement) => {
            element.addEventListener(
                'click',
                (
                    event: MouseEvent & {
                        target: HTMLElement;
                    }
                ) => {
                    this.onHandleClick(event, callback);
                }
            );

            if (this.options.range) {
                element.addEventListener('mouseover', (event: MouseEvent) => {
                    this.onHandleMouse(event);
                });
            }
        });
    }

    private removeEventsHandler(): void {
        this.daysOfMonth.forEach((element: HTMLElement) => {
            element.removeEventListener(
                'click',
                (
                    event: MouseEvent & {
                        target: HTMLElement;
                    }
                ) => {
                    this.onHandleClick(event);
                }
            );

            if (this.options.range) {
                element.removeEventListener(
                    'mouseover',
                    (event: MouseEvent) => {
                        this.onHandleMouse(event);
                    }
                );
            }
        });
    }

    private clearCalendar(): void {
        this.calendar.month.textContent = '';
    }

    private removeCSSClasses(): void {
        this.daysOfMonth.forEach((element: HTMLElement, i: number) => {
            removeClass(element, this.cssClasses.isSelected);
            removeClass(element, this.cssClasses.isBeginRange);
            removeClass(element, this.cssClasses.isEndRange);
            this.days[i + 1].isSelected = false;
        });
    }
}
