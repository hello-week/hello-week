import '../styles/datepicker.scss';

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

    constructor (options: any = {}) {

        console.log('Pla')
        this.options = Datepicker.extend(options);
        this.selector = typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;
        this.activeDates = null;
        this.date = new Date();
        this.todaysDate = new Date();

        this.month = document.querySelector('.datepicker__month');
        this.week = document.querySelector('.datepicker__week');
        this.label = document.querySelector('.datepicker__label');

        this.readFile("dist/langs/" + this.options.lang + ".json", (text: any) => {
            this.langs = JSON.parse(text);
            this.label.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();

            const weekFormat = this.options.weekShort ? this.langs.daysShort : this.langs.days;
            for (let day = 0; day < weekFormat.length; day ++) {
                this.creatWeek(weekFormat[day]);
            }
        });

        this.date.setDate(1)
        this.createMonth()
    }

    private static extend(options: any) {
        const settings: any = {
            selector: '.datepicker',
            lang: 'en',
            format: "mm/dd/yyyy",
            weekShort: true,
            multiplePick: true,
            disablePastDays: false,
            onInit: () => {},
            onChange: () => {}
        };

        const userSttings = options;
        for (const attrname in userSttings) {
            settings[attrname] = userSttings[attrname];
        }

        return settings;
    }

    public prev(): void {
        this.clearCalendar();
        var prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.createMonth();
    }

    public next(): void {
        this.clearCalendar();
        var nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.createMonth();
    }

    public creatWeek(dayShort: number) {
        const weekDay = <any>document.createElement('span');
        weekDay.className = 'datepicker__week__day';
        weekDay.innerHTML = dayShort;
        this.week.appendChild(weekDay);
    }

    public createDay (num: number, day: number, year: number): void {
        var newDay = <any>document.createElement('div');
        var dateEl = <any>document.createElement('span');
        dateEl.innerHTML = num;
        newDay.className = 'datepicker__day';
        newDay.setAttribute('data-calendar-date', this.date)

        /** if it's the first day of the month */
        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%'
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
            }
        }

        if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
            newDay.classList.add('is-disabled');
        } else {
            newDay.classList.add('is-active');
            newDay.setAttribute('data-calendar-status', 'active');
        }

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add('is-today');
        }

        newDay.appendChild(dateEl);
        console.log(this.month);
        if (this.month) {
            this.month.appendChild(newDay);
        }
    };

    public dateClicked(): void {
        this.activeDates = document.querySelectorAll('[data-calendar-status="active"]');
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].addEventListener('click', (event: any) => {
                var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0]
                if (picked) {
                    console.log(event);
                    // picked.innerHTML = this.dataset.calendarDate
                }
                this.removeActiveClass();
                // this.classList.add('is-selected');
            })
        }
    };

    public createMonth(): void {
        var currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(
                this.date.getDate(),
                this.date.getDay(),
                this.date.getFullYear()
            )
            this.date.setDate(this.date.getDate() + 1)
        }

        this.date.setDate(1)
        this.date.setMonth(this.date.getMonth() - 1)
        this.dateClicked();
    };

    public monthsAsString(monthIndex: any): any {
        return this.langs.months[monthIndex];
    };

    public clearCalendar(): void {
        this.month.innerHTML = ''
    };

    public removeActiveClass(): void {
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].classList.remove('is-selected')
        }
    };

    /**
     * Read json file with langs
     * @param {any} file
     * @param {any} callback
     */
    public readFile(file: any, callback: any): void {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && <any>xobj.status == "200") {
                callback(xobj.responseText);
            }
        }
        xobj.send(null);
    }
}

import { Datepicker as MyDatepicker } from "./datepicker";
export namespace MyModule {
    export const Datepicker = MyDatepicker;
}

(<any>window).Datepicker = MyModule.Datepicker;
