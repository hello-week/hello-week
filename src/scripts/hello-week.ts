import '../styles/hello-week.scss';

type CallbackFunction = (...args: any[]) => void;

export class HelloWeek {
    private options: any;
    private selector: any;
    private month: HTMLElement;
    private week: HTMLElement;
    private label: HTMLElement;
    private activeDates: any = null;
    private date: any;
    private langs: any;
    private interval: any = [];
    public currentDay: any;
    public lastSelectedDay: string;
    public selectedDays: any = [];

    public static readonly CSS_CLASSES: any = {
        MONTH        : 'hello-week__month',
        DAY          : 'hello-week__day',
        WEEK         : 'hello-week__week',
        WEEK_DAY     : 'hello-week__week__day',
        LABEL        : 'hello-week__label',
        IS_ACTIVE    : 'is-active',
        IS_HIGHLIGHT : 'is-highlight',
        IS_SELECTED  : 'is-selected',
        IS_DISABLED  : 'is-disabled',
        IS_TODAY     : 'is-today',
        IS_WEEKEND   : 'is-weekend',
    };

    public static readonly DAYS_WEEK: any = {
        SUNDAY    : 0,
        MONDAY    : 1,
        TUESDAY   : 2,
        WEDNESDAY : 3,
        THURSDAY  : 4,
        FRIDAY    : 5,
        SATURDAY  : 6,
    };

    constructor (options: any = {}) {
        this.options = HelloWeek.extend(options);
        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;

        // Early throw if selector doesn't exists
        if (this.selector === null) {
            throw new Error('You need to specify a selector!');
        }

        this.date = new Date();
        this.currentDay = new Date();

        this.month = this.selector.querySelector('.' + HelloWeek.CSS_CLASSES.MONTH);
        this.week = this.selector.querySelector('.' + HelloWeek.CSS_CLASSES.WEEK);
        this.label = this.selector.querySelector('.' + HelloWeek.CSS_CLASSES.LABEL);

        this.readFile(this.options.langFolder + this.options.lang + '.json', (text: any) => {
            this.langs = JSON.parse(text);
            this.init(() => { /** callback function */ });
        });
    }

    /**
     * Call
     * @param {CallbackFunction} callback
     */
    public init(callback: CallbackFunction) {

        if (this.options.defaultDate) {
            this.date = new Date(this.options.defaultDate);
        }

        this.date.setDate(1);
        this.updted();
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Public method
     * Method change the month to the previous, also you can send a callback function like a parameter.
     * @param {CallbackFunction} callback
     */
    public prev(callback: CallbackFunction): void {
        this.clearCalendar();
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.updted();

        this.options.onChange.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Public method
     * Method change the month to the next, also you can send a callback function like a parameter.
     * @param {CallbackFunction} callback
     */
    public next(callback: CallbackFunction): void {
        this.clearCalendar();
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.updted();

        this.options.onChange.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Public method
     * Method returns the current day with the format if specified, timestamp in another case.
     */
    public getToday(): string {
        const unixTimestamp = new Date(this.currentDay).setHours(0,0,0,0);
        return this.options.format ? this.formatDate(this.currentDay, this.options.format) : (unixTimestamp / 1000).toString();
    }

    /**
     * Public method
     * Method move the calendar to current day.
     */
    public today(): void {
        this.clearCalendar();
        this.date = new Date();
        this.date.setDate(1);
        this.updted();
    }

    /**
     * Public method
     * Method clean selected days in calendar.
     */
    public clear(callback: CallbackFunction): void {
        this.clearCalendar();
        this.date.setDate(1);
        this.selectedDays = [];
        this.updted();

        this.options.onClear.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    public range(): void {
        this.options.range = !this.options.range;
    }

    /**
     * Select day
     * @param {CallbackFunction} callback
     */
    public selectDay(callback: CallbackFunction): void {
        this.activeDates = this.selector.querySelectorAll('.' + HelloWeek.CSS_CLASSES.IS_ACTIVE);
        for (const i of Object.keys(this.activeDates)) {
            this.activeDates[i].addEventListener('click', (event: any) => {
                const selectDay = event.target;
                if (selectDay.classList.contains(HelloWeek.CSS_CLASSES.IS_DISABLED)) {
                    return;
                }

                this.lastSelectedDay = this.options.format ?
                    this.formatDate(parseInt(selectDay.dataset.timestamp) * 1000, this.options.format) :
                    selectDay.dataset.timestamp;

                if (!this.options.range) {
                    if (this.options.multiplePick) {
                        this.selectedDays.push(this.lastSelectedDay);
                        if (selectDay.classList.contains(HelloWeek.CSS_CLASSES.IS_SELECTED)) {
                            this.selectedDays = this.selectedDays.filter((day: string) => day !== this.lastSelectedDay);
                        }
                    } else {
                        if (!selectDay.classList.contains(HelloWeek.CSS_CLASSES.IS_DISABLED)) {
                            this.removeActiveClass();
                        }
                        this.selectedDays = [];
                        this.selectedDays.push(this.lastSelectedDay);
                    }
                }

                if (!selectDay.classList.contains(HelloWeek.CSS_CLASSES.IS_DISABLED)) {
                    selectDay.classList.toggle(HelloWeek.CSS_CLASSES.IS_SELECTED);
                }

                if (this.options.range) {
                    if (this.interval.length === 2) {
                        this.interval = [];
                        this.selectedDays = [];
                        this.interval.push(selectDay);
                        this.removeActiveClass();
                        selectDay.classList.add(HelloWeek.CSS_CLASSES.IS_SELECTED);
                    } else {
                        this.interval.push(selectDay);

                        if (this.interval.length > 1) {
                            this.interval[1].classList.add(HelloWeek.CSS_CLASSES.IS_SELECTED);
                        }
                    }
                }

                this.options.onSelect.call(this);
                if (callback) {
                    callback.call(this);
                }
            });

            this.activeDates[i].addEventListener('mouseover', (event: any) => {
                if (!this.options.range || this.interval.length > 1) {
                    return;
                }
                if (this.interval.length > 0 && this.interval.length < 2) {
                    this.selectedDays = [];
                    let element = this.interval[0];
                    for (const elm of this.selector.querySelectorAll('.' + HelloWeek.CSS_CLASSES.IS_SELECTED)) {
                        if(!this.interval.includes(elm)) {
                            (<HTMLElement>elm).classList.remove(HelloWeek.CSS_CLASSES.IS_SELECTED);
                        }
                    }
                    this.selectedDays.push(this.options.format ?
                        this.formatDate(parseInt(element.dataset.timestamp) * 1000, this.options.format) :
                        element.dataset.timestamp);
                    while(element.nextElementSibling && element !== event.target) {
                        element = element.nextElementSibling;
                        if (!element.classList.contains(HelloWeek.CSS_CLASSES.IS_DISABLED)) {
                            this.selectedDays.push(this.options.format ?
                                    this.formatDate(parseInt(element.dataset.timestamp) * 1000, this.options.format) :
                                    element.dataset.timestamp);
                            element.classList.add(HelloWeek.CSS_CLASSES.IS_SELECTED);
                        }
                    }
                }
            });
        }
    }

    public creatWeek(dayShort: number): void {
        const weekDay = <any>document.createElement('span');
        weekDay.classList.add(HelloWeek.CSS_CLASSES.WEEK_DAY);
        weekDay.textContent = dayShort;
        this.week.appendChild(weekDay);
    }

    public createMonth(): void {
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date.getDate(), this.date.getDay());
            // jump while
            this.date.setDate(this.date.getDate() + 1);
        }

        // put correct month
        this.date.setMonth(this.date.getMonth() - 1);
        this.selectDay(() => { /** callback function */ });
    }

    /**
     * Create days inside hello-week
     * @param {number} num
     * @param {number} day
     */
    public createDay (num: number, day: number): void {
        const unixTimestamp = new Date(this.date).setHours(0,0,0,0);
        const timestamp = unixTimestamp / 1000;
        const newDay = <any>document.createElement('div');

        newDay.textContent = num;
        newDay.classList.add(HelloWeek.CSS_CLASSES.DAY);
        newDay.setAttribute('data-timestamp', timestamp);

        if (num === 1) {
            if (this.options.weekStart === HelloWeek.DAYS_WEEK.SUNDAY) {
                newDay.style.marginLeft = ((day) * (100 / 7)) + '%';
            } else {
                if (day === HelloWeek.DAYS_WEEK.SUNDAY) {
                    newDay.style.marginLeft = ((7 - this.options.weekStart) * (100 / 7)) + '%';
                } else {
                    newDay.style.marginLeft = ((day - 1) * (100 / 7)) + '%';
                }
            }
        }

        if (day === HelloWeek.DAYS_WEEK.SUNDAY || day === HelloWeek.DAYS_WEEK.SATURDAY) {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_WEEKEND);
        }

        if (this.options.disabledDaysOfWeek) {
            if (this.options.disabledDaysOfWeek.includes(day)) {
                newDay.classList.add(HelloWeek.CSS_CLASSES.IS_DISABLED);
            }
        }

        if ((this.options.disablePastDays &&
                this.date.getTime() <= this.currentDay.getTime() - 1) ||
                (this.options.minDate && timestamp <= this.options.minDate) ||
                (this.options.maxDate && timestamp >= this.options.maxDate)) {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_DISABLED);
        } else {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_ACTIVE);
        }

        if (this.options.disableDates) {
            this.setDaysDisable(unixTimestamp, newDay);
        }

        if (new Date(this.date).setHours(0,0,0,0) === new Date(this.currentDay).setHours(0,0,0,0) && this.options.todayHighlight) {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_TODAY);
        }

        if (this.options.format) {
            this.selectedDays.find( (day: string) => {
                if (day === this.formatDate(unixTimestamp, this.options.format)) {
                    newDay.classList.toggle(HelloWeek.CSS_CLASSES.IS_SELECTED);
                }
            });
        } else {
            this.selectedDays.find( (day: number) => {
                if (day === timestamp) {
                    newDay.classList.toggle(HelloWeek.CSS_CLASSES.IS_SELECTED);
                }
            });
        }

        if (this.options.daysHighlight) {
            this.setDaysHighlight(unixTimestamp, newDay);
        }

        if (this.month) {
            this.month.appendChild(newDay);
        }
    }

    private setDaysDisable(unixTimestamp: number, newDay: HTMLElement): void {
        if (this.options.disableDates[0] instanceof Array) {
            this.options.disableDates.map((date: any) => {
                if (unixTimestamp >= new Date(new Date(date[0]).setHours(0,0,0,0)).getTime() &&
                        unixTimestamp <= new Date(new Date(date[1]).setHours(0,0,0,0)).getTime()) {
                    newDay.classList.add(HelloWeek.CSS_CLASSES.IS_DISABLED);
                }
            });
        } else {
            this.options.disableDates.map((date: any) => {
                if (new Date(new Date(unixTimestamp).setHours(0,0,0,0)).getTime() === new Date(new Date(date).setHours(0,0,0,0)).getTime()) {
                    newDay.classList.add(HelloWeek.CSS_CLASSES.IS_DISABLED);
                }
            });
        }
    }

    private setDaysHighlight(unixTimestamp: number, newDay: HTMLElement): void {
        if (newDay.classList.contains(HelloWeek.CSS_CLASSES.IS_DISABLED)) {
            return;
        }
        for (const key in this.options.daysHighlight) {
            if (this.options.daysHighlight[key].days[0] instanceof Array) {
                this.options.daysHighlight[key].days.map((date: any, index: number) => {
                    if (unixTimestamp >= new Date(new Date(date[0]).setHours(0,0,0,0)).getTime() &&
                        unixTimestamp <= new Date(new Date(date[1]).setHours(0,0,0,0)).getTime()) {
                        newDay.classList.add(HelloWeek.CSS_CLASSES.IS_HIGHLIGHT);
                        if (this.options.daysHighlight[key].title) {
                            newDay.setAttribute('data-title', this.options.daysHighlight[key].title);
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
                    if (new Date(new Date(unixTimestamp).setHours(0,0,0,0)).getTime() === new Date(new Date(date).setHours(0,0,0,0)).getTime()) {
                        newDay.classList.add(HelloWeek.CSS_CLASSES.IS_HIGHLIGHT);
                        if (this.options.daysHighlight[key].title) {
                            newDay.setAttribute('data-title', this.options.daysHighlight[key].title);
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

    public monthsAsString(monthIndex: any): any {
        return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
    }

    public weekAsString(weekIndex: any): any {
        return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
    }

    public updted(): void {
        const listDays: number[] = [];
        this.label.textContent = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
        /** Define week format */
        this.week.textContent = '';
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

    public clearCalendar(): void {
        this.month.textContent = '';
    }

    public removeActiveClass(): void {
        for (const i of Object.keys(this.activeDates)) {
            this.activeDates[i].classList.remove(HelloWeek.CSS_CLASSES.IS_SELECTED);
        }
    }

    public destroy(): void {
        this.removeActiveClass();
    }

    public readFile(file: string, callback: CallbackFunction): void {
         const xobj = new XMLHttpRequest();
         xobj.overrideMimeType('application/json');
         xobj.open('GET', file, true);
         xobj.onreadystatechange = () => {
             if (xobj.readyState === 4 && <any>xobj.status === 200) {
                 callback(xobj.responseText);
             }
         };
         xobj.send(null);
    }

    public formatDate(timestamp: number, format: string): string {
         const dt = new Date(timestamp);
         format = format.replace('dd', dt.getDate().toString());
         format = format.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
         format = format.replace('mm', (dt.getMonth() + 1).toString());
         format = format.replace('MMM', this.langs.months[dt.getMonth()]);
         format = format.replace('MM', ((dt.getMonth() + 1) > 9 ? (dt.getMonth() + 1) : '0' + (dt.getMonth() + 1)).toString());
         format = format.replace('mmm', this.langs.monthsShort[dt.getMonth()]);
         format = format.replace('yyyy', dt.getFullYear().toString());
         format = format.replace('YYYY', dt.getFullYear().toString());
         format = format.replace('YY', (dt.getFullYear().toString()).substring(2));
         format = format.replace('yy', (dt.getFullYear().toString()).substring(2));
         return format;
    }

    private static extend(options: CallbackFunction): object {
        const settings: any = {
            selector: '.hello-week',
            lang: 'en',
            langFolder: './dist/langs/',
            format: false,
            weekShort: true,
            monthShort: false,
            multiplePick: false,
            defaultDate: false,
            todayHighlight: true,
            disablePastDays: false,
            disabledDaysOfWeek: false,
            disableDates: false,
            weekStart: 0,
            daysHighlight: false,
            range: false,
            minDate: false,
            maxDate: false,
            onLoad: () => { /** callback function */ },
            onChange: () => { /** callback function */ },
            onSelect: () => { /** callback function */ },
            onClear: () => { /** callback function */ },
        };

        const defaultSettings = <any>options;
        for (const i of Object.keys(defaultSettings)) {
            settings[i] = defaultSettings[i];
        }

        return settings;
    }
}

import { HelloWeek as MyHelloWeek } from './hello-week';
export namespace MyModule {
    export const HelloWeek = MyHelloWeek;
}

(<any>window).HelloWeek = MyModule.HelloWeek;
