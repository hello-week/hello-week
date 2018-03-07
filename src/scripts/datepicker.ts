import '../styles/datepicker.scss';

type CallbackFunction = (...args: any[]) => void;

export class Datepicker {
    private options: any;
    private selector: any;
    private month: HTMLElement;
    private week: HTMLElement;
    private label: HTMLElement;
    private activeDates: any;
    private date: any;
    private langs: any;
    private todaysDate: any;
    private today: number;
    private selectedDay: HTMLElement;
    private multipleDays: Array<string> = [];

    constructor (options: any = {}) {

        this.options = Datepicker.extend(options);

        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;
        this.activeDates = null;
        this.date = new Date();
        this.todaysDate = new Date();

        this.month = document.querySelector('.' + Datepicker.CSS_CLASSES.MONTH);
        this.week = document.querySelector('.' + Datepicker.CSS_CLASSES.WEEK);
        this.label = document.querySelector('.' + Datepicker.CSS_CLASSES.LABEL);

        this.init(() => { /** callback function */ });
    }

    public static readonly CSS_CLASSES: any = {
        MONTH: 'datepicker__month',
        DAY: 'datepicker__day',
        WEEK: 'datepicker__week',
        WEEK_DAY: 'datepicker__week__day',
        LABEL: 'datepicker__label',
        IS_ACTIVE: 'is-active',
        IS_SELECTED: 'is-selected',
        IS_DISABLED: 'is-disabled',
        IS_TODAY: 'is-today',
        IS_WEEKEND: 'is-weekend'
    };

    public init(callback: CallbackFunction) {

        this.date.setDate(1);
        this.updted();
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    }

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

    public selectDay(callback: CallbackFunction): void {
        this.activeDates = document.querySelectorAll('.' + Datepicker.CSS_CLASSES.IS_ACTIVE);
        for (const i of Object.keys(this.activeDates)) {
            this.activeDates[i].addEventListener('click', (event: any) => {
                this.selectedDay = event.target;
                if (this.options.multiplePick) {
                    this.multipleDays.push(this.selectedDay.dataset.timestamp);
                    if (event.target.classList.contains(Datepicker.CSS_CLASSES.IS_SELECTED)) {
                        this.multipleDays = this.multipleDays.filter((day: string) => day !== this.selectedDay.dataset.timestamp);
                    }
                } else {
                    this.removeActiveClass();
                    this.multipleDays = [];
                    this.multipleDays.push(this.selectedDay.dataset.timestamp);
                }

                event.target.classList.toggle(Datepicker.CSS_CLASSES.IS_SELECTED);

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

    public creatWeek(dayShort: number) {
        const weekDay = <any>document.createElement('span');
        weekDay.classList.add(Datepicker.CSS_CLASSES.WEEK_DAY);
        weekDay.textContent = dayShort;
        this.week.appendChild(weekDay);
    }

    public createDay (num: number, day: number): void {
        let timestamp = Date.parse(this.date);
        timestamp = timestamp / 1000;
        const newDay = <any>document.createElement('div');
        newDay.textContent = num;
        newDay.classList.add(Datepicker.CSS_CLASSES.DAY);
        newDay.setAttribute('data-timestamp', timestamp);

        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%';
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%';
            }
        }
        console.log(day);
        if (day === 0 || day === 1) {
            newDay.classList.add(Datepicker.CSS_CLASSES.IS_WEEKEND);
        }

        if ((this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) ||
            (this.options.minDate && timestamp <= this.options.minDate) ||
            (this.options.maxDate && timestamp >= this.options.maxDate)) {
            newDay.classList.add(Datepicker.CSS_CLASSES.IS_DISABLED);
        } else {
            newDay.classList.add(Datepicker.CSS_CLASSES.IS_ACTIVE);
        }

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add(Datepicker.CSS_CLASSES.IS_TODAY);
            this.today = timestamp;
        }

        if (this.month) {
            this.month.appendChild(newDay);
        }
    }

    public monthsAsString(monthIndex: any): any {
        return this.langs.months[monthIndex];
    }

    public updted(): void {
        this.createMonth();
        this.readFile('/dist/langs/' + this.options.lang + '.json', (text: any) => {
            this.langs = JSON.parse(text);
            this.label.textContent = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
            const weekFormat = this.options.weekShort ? this.langs.daysShort : this.langs.days;
            this.week.textContent = '';
            for (const day of Object.keys(weekFormat)) {
                this.creatWeek(weekFormat[day]);
            }
        });
    }

    public clearCalendar(): void {
        this.month.textContent = '';
    }

    public removeActiveClass(): void {
        for (const i of Object.keys(this.activeDates)) {
            this.activeDates[i].classList.remove(Datepicker.CSS_CLASSES.IS_SELECTED);
        }
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

    private static extend(options: CallbackFunction) {
        const settings: any = {
            selector: '.datepicker',
            lang: 'en',
            format: false,
            weekShort: true,
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

import { Datepicker as MyDatepicker } from './datepicker';
export namespace MyModule {
    export const Datepicker = MyDatepicker;
}

(<any>window).Datepicker = MyModule.Datepicker;
