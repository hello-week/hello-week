import '../styles/hello-week.scss';
import { CSS_CLASSES, CSS_STATES, DAYS_WEEK } from './constants';
import { Utils} from './utils';

type CallbackFunction = (...args: any[]) => void;

export class HelloWeek {
    private options: any;
    private selector: any;
    private calendar: any = {};
    private date: any;
    private today: any;
    private minDate: Date;
    private maxDate: Date;
    private defaultDate: any;
    private langs: any;
    private daysOfMonth: any;
    private interval: any = [];
    private selectedDates: any = [];
    private selectedTemporary: any = [];
    private lastSelectedDay: string;
    private days: any;

    /* @return enum {CSS_CLASSES} */
    static get cssClasses() {
        return CSS_CLASSES;
    }

    /* @return enum {CSS_STATES} */
    static get cssStates() {
        return CSS_STATES;
    }

    /* @return enum {DAYS_WEEK} */
    static get daysWeek() {
        return DAYS_WEEK;
    }

    constructor (options: any = {}) {
        this.options = Utils.extend(options);
        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;

        // early throw if selector doesn't exists
        if (this.selector === null) {
            throw new Error('You need to specify a selector!');
        }

        this.calendar.header = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.NAVIGATION, this.selector);
        if (this.options.nav) {
            this.calendar.prevMonth = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.PREV, this.calendar.header, this.options.nav[0]);
            this.calendar.period = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.LABEL, this.calendar.header);
            this.calendar.nextMonth = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.NEXT, this.calendar.header, this.options.nav[1]);
            this.calendar.prevMonth.addEventListener('click', () => { this.prev( () => { /** callback function */ } ); });
            this.calendar.nextMonth.addEventListener('click', () => { this.next( () => { /** callback function */ } ); });
        } else {
            this.calendar.period = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.LABEL, this.calendar.header);
        }

        this.calendar.week = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.WEEK, this.selector);
        this.calendar.month = Utils.creatHTMLElement(this.selector, HelloWeek.cssClasses.MONTH, this.selector);

        Utils.readFile(this.options.langFolder + this.options.lang + '.json', (text: any) => {
            this.langs = JSON.parse(text);
            this.init(() => { /** callback function */ });
        });
    }

    public destroy(): void {
        this.__removeSelectedClass();
    }

    /**
     * @param {CallbackFunction} callback
     * @public
     */
    public init(callback: CallbackFunction) {
        this.today = new Date();
        this.today = this.today.setHours(0,0,0,0);
        this.date = new Date();
        this.defaultDate = new Date();
        if (this.options.defaultDate) {
            this.date = new Date(this.options.defaultDate);
            this.defaultDate = new Date(this.options.defaultDate);
            this.defaultDate.setDate(this.defaultDate.getDate());
        }
        this.date.setDate(1);

        if (this.options.minDate) {
            this.minDate = new Date(this.options.minDate);
            this.minDate.setHours(0,0,0,0);
            this.minDate.setDate(this.minDate.getDate() - 1);
        }

        if (this.options.maxDate) {
            this.maxDate = new Date(this.options.maxDate);
            this.maxDate.setHours(0,0,0,0);
            this.maxDate.setDate(this.maxDate.getDate() + 1);
        }

        this.__updted();
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Method change the month to the previous, also you can send a callback function like a parameter.
     * @param {CallbackFunction} callback
     * @public
     */
    public prev(callback: CallbackFunction): void {
        const prevMonth = this.date.getMonth() - 1;
        this.__clearCalendar();
        this.date.setMonth(prevMonth);
        this.__updted();

        this.options.onChange.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Method change the month to the next, also you can send a callback function like a parameter.
     * @param {CallbackFunction} callback
     * @public
     */
    public next(callback: CallbackFunction): void {
        this.__clearCalendar();
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.__updted();

        this.options.onChange.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Returns the current day with the format specified.
     * @param  {boolean} formated
     * @return {string}
     * @public
     */
    public getSelectedDates(): string {
        return this.selectedDates;
    }

    /**
     * Method move the calendar to current day.
     * @public
     */
    public goToday(): void {
        this.__clearCalendar();
        this.date = this.today;
        this.date.setDate(1);
        this.__updted();
    }

    /**
     * Method clean selected days in calendar.
     * @public
     */
    public clear(callback: CallbackFunction): void {
        this.__clearCalendar();
        this.date.setDate(1);
        this.selectedDates = [];
        this.selectedTemporary = [];
        this.__updted();

        this.options.onClear.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Sets the range.
     * @public
     */
    public setRange(): void {
        this.options.range = !this.options.range;
    }

    /**
     * Select day
     * @param {CallbackFunction} callback
     * @private
     */
    private __selectDay(callback: CallbackFunction): void {
        this.daysOfMonth = this.selector.querySelectorAll('.' + HelloWeek.cssClasses.MONTH + ' .' + HelloWeek.cssClasses.DAY);
        for (const i of Object.keys(this.daysOfMonth)) {
            this.__handleClickInteraction(this.daysOfMonth[i], callback);
            if (this.options.range) {
                this.__handleMouseInteraction(this.daysOfMonth[i]);
            }
        }
    }

    /**
     * @param {HTMLElement} selectDay
     * @private
     */
    private __setRangeDays(selectDay: HTMLElement) {
        const index = Utils.getIndexForEventTarget(this.daysOfMonth, selectDay);
        const indexOfStartInterval = Utils.getIndexForEventTarget(this.daysOfMonth, this.interval[0]);
        const indexOfEndInterval = Utils.getIndexForEventTarget(this.daysOfMonth, this.interval[1]);

        if (this.interval.length === 2) {
            this.interval = [];
            this.selectedDates = [];
            this.selectedTemporary = [];
            this.interval.push(selectDay);
            this.__removeSelectedClass();
            selectDay.classList.add(HelloWeek.cssStates.IS_SELECTED);
        } else {
            if (this.interval[0] && this.days[index].timestamp < this.days[indexOfStartInterval].timestamp) {
                selectDay.classList.remove(HelloWeek.cssStates.IS_SELECTED);
                return;
            }
            this.interval.push(selectDay);
            if (this.interval.length > 1) {
                this.interval[1].classList.add(HelloWeek.cssStates.IS_SELECTED);
            }
        }
    }

    /**
     * @param {HTMLElement} target
     * @param {CallbackFunction} callback
     * @private
     */
    private __handleClickInteraction(target: HTMLElement, callback: CallbackFunction): void {
        target.addEventListener('click', (event: any) => {
            const selectDay = event.target;
            const index = Utils.getIndexForEventTarget(this.daysOfMonth, selectDay);
            if (this.days[index].isDisabled) {
                return;
            }

            this.lastSelectedDay = this.days[index].timestamp;
            if (!this.options.range) {
                if (this.options.multiplePick) {
                    this.selectedDates.push(this.lastSelectedDay);
                    if (this.days[index].timestamp) {
                        this.selectedDates = this.selectedDates.filter((day: string) => day !== this.lastSelectedDay);
                        this.selectedTemporary = this.selectedTemporary.filter((day: string) => day !== this.lastSelectedDay);
                    }
                } else {
                    if (!this.days[index].isDisabled) {
                        this.__removeSelectedClass();
                    }
                    this.selectedDates = [];
                    this.selectedTemporary = [];
                    this.selectedDates.push(this.lastSelectedDay);
                    this.selectedTemporary.push(this.lastSelectedDay);
                }
            }

            if (!this.days[index].isDisabled) {
                selectDay.classList.add(HelloWeek.cssStates.IS_SELECTED);
                this.days[index].isSelected = true;
            }

            if (this.options.range) {
                this.__setRangeDays(selectDay);
            }

            this.options.onSelect.call(this);
            if (callback) {
                callback.call(this);
            }
        });
    }

    private __handleMouseInteraction(target: HTMLElement): void {
        target.addEventListener('mouseover', (event: any) => {
            const selectDay = event.target;
            const index = Utils.getIndexForEventTarget(this.daysOfMonth, selectDay);
            const indexOfInterval = Utils.getIndexForEventTarget(this.daysOfMonth, this.interval[0]);
            if ((this.interval.length > 1) || this.interval[0] && this.days[index].timestamp < this.days[indexOfInterval].timestamp ) {
                return;
            }

            if (this.interval.length > 0 && this.interval.length < 2) {
                this.selectedDates = [];
                let element = this.interval[0];
                for (const elm of this.selector.querySelectorAll('.' + HelloWeek.cssStates.IS_SELECTED)) {
                    if(!this.interval.includes(elm)) {
                        (<HTMLElement>elm).classList.remove(HelloWeek.cssStates.IS_SELECTED);
                    }
                }
                this.selectedDates.push(this.days[indexOfInterval].timestamp);
                while(element.nextElementSibling && element !== selectDay) {
                    element = element.nextElementSibling;
                    const indexOfElement = Utils.getIndexForEventTarget(this.daysOfMonth, element);
                    if (!this.days[indexOfElement].isDisabled) {
                        this.selectedDates.push(this.days[indexOfElement].timestamp);
                        element.classList.add(HelloWeek.cssStates.IS_SELECTED);
                        this.days[indexOfElement].isSelected = true;
                        // temporary array with selected days
                        this.selectedTemporary.push(this.days[indexOfElement].timestamp);
                    }
                }
            }
        });
    }

    /**
     * @param      {number}  dayShort
     * @private
     */
    private __creatWeek(dayShort: number): void {
        const weekDay = <any>document.createElement('span');
        weekDay.classList.add(HelloWeek.cssClasses.DAY);
        weekDay.textContent = dayShort;
        this.calendar.week.appendChild(weekDay);
    }

    /**
     * @private
     */
    private __createMonth(): void {
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {

            this.__createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
        this.__selectDay(() => { /** callback function */ });
    }

    /**
     * Create days inside hello-week
     * @param {Date} date
     * @private
     */
    private __createDay (date: Date): void {
        const num = date.getDate();
        const day = date.getDay();
        const newDay = <any>document.createElement('div');
        const dayOptions = {
            day: num,
            timestamp: new Date(this.date).setHours(0,0,0,0),
            isWeekend: false,
            isDisabled: false,
            isToday: false,
            isSelected: false,
            isHighlight: false,
        };

        this.days = this.days || {};
        newDay.textContent = dayOptions.day;
        newDay.classList.add(HelloWeek.cssClasses.DAY);

        if (dayOptions.day === 1) {
            if (this.options.weekStart === HelloWeek.daysWeek.SUNDAY) {
                newDay.style.marginLeft = ((day) * (100 / Object.keys(HelloWeek.daysWeek).length)) + '%';
            } else {
                if (day === HelloWeek.daysWeek.SUNDAY) {
                    newDay.style.marginLeft = ((Object.keys(HelloWeek.daysWeek).length - this.options.weekStart) * (100 / Object.keys(HelloWeek.daysWeek).length)) + '%';
                } else {
                    newDay.style.marginLeft = ((day - 1) * (100 / Object.keys(HelloWeek.daysWeek).length)) + '%';
                }
            }
        }

        if (day === HelloWeek.daysWeek.SUNDAY || day === HelloWeek.daysWeek.SATURDAY) {
            newDay.classList.add(HelloWeek.cssStates.IS_WEEKEND);
            dayOptions.isWeekend = true;
        }
        if (this.options.disabledDaysOfWeek && this.options.disabledDaysOfWeek.includes(day)
            || this.options.disablePastDays && +this.date.setHours(0,0,0,0) <= +this.defaultDate.setHours(0,0,0,0) - 1
            || this.options.minDate && (+this.minDate >= dayOptions.timestamp)
            || this.options.maxDate && (+this.maxDate <= dayOptions.timestamp)) {
            newDay.classList.add(HelloWeek.cssStates.IS_DISABLED);
            dayOptions.isDisabled = true;
        }

        if (this.options.disableDates) {
            this.__setDaysDisable(newDay, dayOptions);
        }

        if (this.today === dayOptions.timestamp) {
            newDay.classList.add(HelloWeek.cssStates.IS_TODAY);
            dayOptions.isToday = true;
        }

        // @todo: fix selected days on change month.
        this.selectedDates.find( (day: number) => {
            if (day === dayOptions.timestamp) {
                newDay.classList.add(HelloWeek.cssStates.IS_SELECTED);
                dayOptions.isSelected = true;
            }
        });


        if (this.options.daysHighlight) {
            this.__setDaysHighlight(newDay, dayOptions);
        }

        if (this.calendar.month) {
            this.calendar.month.appendChild(newDay);
        }

        if (this.selectedTemporary.length > 0 && dayOptions.day === 1) {
            this.interval[0] = newDay;
        }

        this.days[dayOptions.day] = dayOptions;
    }

    /**
     * Sets the days disable.
     * @param      {HTMLElement}  newDay
     * @param      {any}  dayOptions
     * @private
     */
    private __setDaysDisable(newDay: HTMLElement, dayOptions: any): void {
        if (this.options.disableDates[0] instanceof Array) {
            this.options.disableDates.map((date: any) => {
                if (dayOptions.timestamp >= +new Date(date[0]) && dayOptions.timestamp <= +new Date(date[1])) {
                    newDay.classList.add(HelloWeek.cssStates.IS_DISABLED);
                    dayOptions.isDisabled = true;
                }
            });
        } else {
            this.options.disableDates.map((date: any) => {
                if (dayOptions.timestamp === +new Date(date)) {
                    newDay.classList.add(HelloWeek.cssStates.IS_DISABLED);
                    dayOptions.isDisabled = true;
                }
            });
        }
    }

    /**
     * Sets the days highlight.
     * @param      {HTMLElement}  newDay
     * @param      {any}  dayOptions
     * @private
     */
    private __setDaysHighlight(newDay: HTMLElement, dayOptions: any): void {
        if (newDay.classList.contains(HelloWeek.cssStates.IS_DISABLED)) {
            return;
        }
        for (const key in this.options.daysHighlight) {
            if (this.options.daysHighlight[key].days[0] instanceof Array) {
                this.options.daysHighlight[key].days.map((date: any, index: number) => {
                    if (dayOptions.timestamp >= new Date(new Date(date[0]).setHours(0,0,0,0)).getTime() && dayOptions.timestamp <= new Date(new Date(date[1]).setHours(0,0,0,0)).getTime()) {
                        newDay.classList.add(HelloWeek.cssStates.IS_HIGHLIGHT);
                        dayOptions.isHighlight = true;
                        if (this.options.daysHighlight[key].title) {
                            dayOptions.tile = this.options.daysHighlight[key].title;
                        }
                        if (this.options.daysHighlight[key].color) {
                            newDay.style.color = this.options.daysHighlight[key].color;
                        }
                        if (this.options.daysHighlight[key].backgroundColor) {
                            newDay.style.backgroundColor = this.options.daysHighlight[key].backgroundColor;
                        }
                    }
                });
            } else {
                this.options.daysHighlight[key].days.map((date: any) => {
                    if (new Date(new Date(dayOptions.timestamp).setHours(0,0,0,0)).getTime() === new Date(new Date(date).setHours(0,0,0,0)).getTime()) {
                        newDay.classList.add(HelloWeek.cssStates.IS_HIGHLIGHT);
                        dayOptions.isHighlight = true;
                        if (this.options.daysHighlight[key].title) {
                            dayOptions.tile = this.options.daysHighlight[key].title;
                        }
                        if (this.options.daysHighlight[key].color) {
                            newDay.style.color = this.options.daysHighlight[key].color;
                        }
                        if (this.options.daysHighlight[key].backgroundColor) {
                            newDay.style.backgroundColor = this.options.daysHighlight[key].backgroundColor;
                        }
                    }
                });
            }
        }
    }

    /**
     * @param      {number}  monthIndex
     * @return     {object}
     * @private
     */
    private __monthsAsString(monthIndex: number): any {
        return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
    }

    /**
     * @param      {number}  weekIndex
     * @return     {object}
     * @private
     */
    private __weekAsString(weekIndex: number): any {
        return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
    }

    /**
     * @private
     */
    private __updted(): void {
        const listDays: number[] = [];
        if (this.calendar.period) {
            this.calendar.period.innerHTML = this.__monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
        }
        /** define week format */
        this.calendar.week.textContent = '';
        for (let i = this.options.weekStart; i < this.langs.daysShort.length; i++) {
            listDays.push(i);
        }

        for (let i = 0; i < this.options.weekStart; i++) {
            listDays.push(i);
        }

        for (const day of listDays) {
            this.__creatWeek(this.__weekAsString(day));
        }

        this.__createMonth();
    }

    /**
     * Clean calendar.
     * @private
     */
    private __clearCalendar(): void {
        this.calendar.month.textContent = '';
    }

    /**
     * Removes all selected classes.
     * @private
     */
    private __removeSelectedClass(): void {
        for (const i of Object.keys(this.daysOfMonth)) {
            this.daysOfMonth[i].classList.remove(HelloWeek.cssStates.IS_SELECTED);
            this.days[+i + 1].isSelected = false;
        }
    }
}

import { HelloWeek as MyHelloWeek } from './hello-week';
export namespace MyModule {
    export const HelloWeek = MyHelloWeek;
}

(<any>window).HelloWeek = MyModule.HelloWeek;
