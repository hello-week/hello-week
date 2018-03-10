import '../styles/hello-week.scss';

type CallbackFunction = (...args: any[]) => void;

export class HelloWeek {
    private options: any;
    private selector: any;
    private month: HTMLElement;
    private week: HTMLElement;
    private label: HTMLElement;
    private activeDates: any;
    private date: any;
    private langs: any;
    private todaysDate: any;
    public today: string;
    public lastSelectedDay: string;
    public selectedDays: any = [];

    constructor (options: any = {}) {
        this.options = HelloWeek.extend(options);

        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;

        // Early throw if selector doesn't exists
        if (this.selector === null) {
            throw new Error('You need to specify a selector!');
        }

        this.activeDates = null;
        this.date = new Date();
        this.todaysDate = new Date();

        this.month = this.selector.querySelector('.' + HelloWeek.CSS_CLASSES.MONTH);
        this.week = this.selector.querySelector('.' + HelloWeek.CSS_CLASSES.WEEK);
        this.label = this.selector.querySelector('.' + HelloWeek.CSS_CLASSES.LABEL);

        this.readFile('./dist/langs/' + this.options.lang + '.json', (text: any) => {
            this.langs = JSON.parse(text);
            this.init(() => { /** callback function */ });
        });

    }

    public static readonly CSS_CLASSES: any = {
        MONTH: 'hello-week__month',
        DAY: 'hello-week__day',
        WEEK: 'hello-week__week',
        WEEK_DAY: 'hello-week__week__day',
        LABEL: 'hello-week__label',
        IS_ACTIVE: 'is-active',
        IS_SELECTED: 'is-selected',
        IS_DISABLED: 'is-disabled',
        IS_TODAY: 'is-today',
        IS_WEEKEND: 'is-weekend',
    };

    /**
     * Call
     * @param {CallbackFunction} callback
     */
    public init(callback: CallbackFunction) {
        this.date.setDate(1);
        this.updted();
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    }

    /**
     * Prev month
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
     * Next month
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
     * Select day
     * @param {CallbackFunction} callback
     */
    public selectDay(callback: CallbackFunction): void {
        this.activeDates = document.querySelectorAll('.' + HelloWeek.CSS_CLASSES.IS_ACTIVE);
        for (const i of Object.keys(this.activeDates)) {
            this.activeDates[i].addEventListener('click', (event: any) => {
                const selectDay = event.target;

                if (this.options.format) {
                    // Formated
                    this.lastSelectedDay = this.formatDate(parseInt(selectDay.dataset.timestamp) * 1000, this.options.format);
                } else {
                    // Timestamp
                    this.lastSelectedDay = selectDay.dataset.timestamp;
                }

                if (this.options.multiplePick) {
                    this.selectedDays.push(this.lastSelectedDay);
                    if (event.target.classList.contains(HelloWeek.CSS_CLASSES.IS_SELECTED)) {
                        this.selectedDays = this.selectedDays.filter((day: string) => day !== this.lastSelectedDay);
                    }
                } else {
                    this.removeActiveClass();
                    this.selectedDays = [];
                    this.selectedDays.push(this.lastSelectedDay);
                }
                event.target.classList.toggle(HelloWeek.CSS_CLASSES.IS_SELECTED);

                this.options.onSelect.call(this);
                if (callback) {
                    callback.call(this);
                }
            });
        }
    }

    public createMonth(): void {
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date.getDate(), this.date.getDay());
            this.date.setDate(this.date.getDate() + 1);
        }

        this.date.setDate(1);
        this.date.setMonth(this.date.getMonth() - 1);
        this.selectDay(() => { /** callback function */ });
    }

    public creatWeek(dayShort: number): void {
        const weekDay = <any>document.createElement('span');
        weekDay.classList.add(HelloWeek.CSS_CLASSES.WEEK_DAY);
        weekDay.textContent = dayShort;
        this.week.appendChild(weekDay);
    }

    /**
     * Create days inside hello-week
     * @param {number} num
     * @param {number} day
     */
    public createDay (num: number, day: number): void {
        const unixTimestamp = Date.parse(this.date);
        const timestamp = unixTimestamp / 1000;
        const newDay = <any>document.createElement('div');

        newDay.textContent = num;
        newDay.classList.add(HelloWeek.CSS_CLASSES.DAY);
        newDay.setAttribute('data-timestamp', timestamp);

        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%';
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%';
            }
        }

        if (day === 0 || day === 1) {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_WEEKEND);
        }

        if ((this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) ||
            (this.options.minDate && timestamp <= this.options.minDate) ||
            (this.options.maxDate && timestamp >= this.options.maxDate)) {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_DISABLED);
        } else {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_ACTIVE);
        }

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add(HelloWeek.CSS_CLASSES.IS_TODAY);
            this.today = timestamp.toString();
            if (this.options.format) {
                this.today = this.formatDate(unixTimestamp, this.options.format);
            }
        }

        if (this.options.format) {
            this.selectedDays.find( (day: string) => {
                if (day === this.formatDate(unixTimestamp, this.options.format)) {
                    newDay.classList.toggle(HelloWeek.CSS_CLASSES.IS_SELECTED);
                }
            });
        } else {
            this.selectedDays.find( (day: string) => {
                if (day === timestamp.toString()) {
                    newDay.classList.toggle(HelloWeek.CSS_CLASSES.IS_SELECTED);
                }
            });
        }

        if (this.month) {
            this.month.appendChild(newDay);
        }
    }

    public monthsAsString(monthIndex: any): any {
        return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
    }

    public weekAsString(weekIndex: any): any {
        return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
    }

    public updted(): void {
        this.label.textContent = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();

        /** Define week format */
        const weekFormat = this.options.weekShort ? this.langs.daysShort : this.langs.days;
        this.week.textContent = '';
        for (const day of Object.keys(this.langs.daysShort)) {
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
            format: false,
            weekShort: true,
            monthShort: false,
            disablePastDays: false,
            multiplePick: true,
            minDate: false,
            maxDate: false,
            onLoad: () => { /** callback function */ },
            onChange: () => { /** callback function */ },
            onSelect: () => { /** callback function */ },
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
