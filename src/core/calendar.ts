import {
    cssClasses,
    cssStates,
    daysWeek,
    margins,
    useOptions,
    useLangs,
} from '../shared/index';
import {
    extend,
    getIndexForEventTarget,
    isArray,
    isObject,
    isFuncation,
    el,
    render,
    addClass,
    removeClass,
    toggleClass,
} from './../util/index';
import { isBetween, isSame, isSameOrAfter, isSameOrBefore } from './compare';
import { template } from './template';
import { getIntervalOfDates } from './interval';
import { setMinDate, setMaxDate } from './min-max';
import { toDate, setTimeZone, formatDate, formatDateToCompare } from './format';
import {
    Options,
    DayOptions,
    Langs,
    CalendarTemplate,
    StoreOptions,
    StoreLangs,
} from '../interfaces/index';

export class HelloWeek {
    private options: StoreOptions;
    private langs: StoreLangs;
    private selector: HTMLElement;
    private daysOfMonth: NodeListOf<Element>;
    private todayDate: string = toDate(new Date());
    private date: Date = new Date();
    private defaultDate?: Date;
    private calendar: CalendarTemplate;
    private days: { [day: number]: DayOptions };
    private isRTL: string;
    private daysHighlight: any;
    private intervalRange: any = {};
    private daysSelected: any = [];
    private lastSelectedDay: Date | string;

    constructor(options: Options) {
        this.langs = useLangs;
        this.options = useOptions;
        this.options.set(options);

        const { calendar, selector } = template(this.options.get(), {
            prev: {
                cb: () => this.prev(),
            },
            next: {
                cb: () => this.next(),
            },
        });

        this.selector = selector;
        this.calendar = calendar;
        this.beforeCreate();
    }

    destroy(): void {
        this.removeStatesClass();
        this.selector.remove();
    }

    /**
     *  Moves the calendar one month back.
     *  @return void
     */
    prev(): void {
        const { onNavigation } = this.options.get();
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();

        onNavigation();
    }

    /**
     *  Moves the calendar one month forward.
     *  @return void
     */
    next(): void {
        const { onNavigation } = this.options.get();
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();

        onNavigation();
    }

    /**
     *  Moves the calendar one year back.
     * @return {void}
     */
    prevYear(): void {
        const { onNavigation } = this.options.get();
        const prevYear = this.date.getFullYear() - 1;
        this.date.setFullYear(prevYear);
        this.update();

        onNavigation();
    }

    /**
     *  Moves the calendar one year forward.
     * @return {void}
     */
    nextYear(): void {
        const { onNavigation } = this.options.get();
        const nextYear = this.date.getFullYear() + 1;
        this.date.setFullYear(nextYear);
        this.update();

        onNavigation();
    }

    /**
     * Update and redraws the events for the current month.
     * @return {void}
     */
    update(): void {
        this.clearCalendar();
        this.mounted();
    }

    /**
     *  Move the calendar to arbitrary day
     * @param {string = this.todayDate} date
     * @return {void}
     */
    goToDate(date: string = this.todayDate): void {
        this.date = new Date(date);
        this.date.setDate(1);
        this.update();
    }

    /**
     * Returns the selected days with the format specified.
     * @return {any}
     */
    getDaySelected(): any {
        const { format } = this.options.get();
        return this.daysSelected
            .sort(
                (a: string, b: string) =>
                    formatDateToCompare(a) - formatDateToCompare(b)
            )
            .map((day: number) => formatDate(day, format));
    }

    /**
     * Gets last day selected.
     * @return {Date} lastSelectedDay
     */
    getLastDaySelected(): Date | string {
        return this.lastSelectedDay;
    }

    /**
     * Returns the highlight dates.
     * @return {string}
     */
    getDaysHighlight(): string {
        return this.daysHighlight;
    }

    /**
     * Returns the current month selected.
     * @return {number}
     */
    getMonth(): number {
        return this.date.getMonth() + 1;
    }

    /**
     * Returns the current year selected.
     * @return {number}
     */
    getYear(): number {
        return this.date.getFullYear();
    }

    /**
     * Set new options
     * @param {Partial<Options>} options
     * @param {Options) => Options}    callback
     */
    setOptions(
        options?: Partial<Options>,
        callback?: (data: Options) => Options
    ): void {
        if (isObject(options)) {
            this.options.set(options);
        }

        if (isFuncation(callback)) {
            this.options.set(callback(this.options.get()));
        }

        this.update();
    }

    /**
     * Set days highlight.
     * @param {[number]} daysHighlight
     */
    setDaysHighlight(daysHighlight: [number]): void {
        this.daysHighlight = [...this.daysHighlight, ...daysHighlight];
    }

    /**
     * Sets interval of dates.
     * @param {string[] | number[]} value
     */
    setIntervalRange(value: string[] | number[]) {
        const { range } = this.options.get();

        if (range && value && isArray(value)) {
            const [begin, end] = value;
            this.intervalRange = { begin, end };
        }
    }

    /**
     * Set min date.
     * @param {number | string} date
     */
    setMinDate(date: number | string) {
        this.options.set({ minDate: setMinDate(date) });
    }

    /**
     * Set max date.
     * @param {number | string} date
     */
    setMaxDate(date: number | string) {
        this.options.set({ maxDate: setMaxDate(date) });
    }

    private beforeCreate() {
        const { rtl, langFolder, lang } = this.options.get();
        this.isRTL = rtl ? margins.RIGHT : margins.LEFT;

        import(langFolder + lang + '.js')
            .then((data: any) => data.default)
            .then((data: Langs) => {
                this.langs.set(data);
                this.beforeMount();
            });
    }

    private beforeMount() {
        const {
            daysHighlight,
            daysSelected,
            defaultDate,
            timezoneOffset,
            minDate,
            maxDate,
            beforeLoad,
            onLoad,
        } = this.options.get();

        this.daysHighlight = daysHighlight ? daysHighlight : [];
        this.daysSelected = daysSelected ? daysSelected : [];

        beforeLoad();

        if (defaultDate) {
            this.date = setTimeZone(defaultDate, timezoneOffset);
            this.defaultDate = setTimeZone(defaultDate, timezoneOffset);
            this.defaultDate.setDate(this.defaultDate.getDate());
        }
        this.date.setDate(1);

        if (minDate) {
            this.setMinDate(minDate);
        }

        if (maxDate) {
            this.setMaxDate(maxDate);
        }

        this.mounted();
        onLoad();
    }

    private selectDay(callback?: () => void): void {
        const { range } = this.options.get();
        this.daysOfMonth = this.selector.querySelectorAll(
            '.' + cssClasses.MONTH + ' .' + cssClasses.DAY
        );
        for (const i of Object.keys(this.daysOfMonth)) {
            this.handleClickInteraction(this.daysOfMonth[i], callback);
            if (range) {
                this.handleMouseInteraction(this.daysOfMonth[i]);
            }
        }
    }

    private handleClickInteraction(
        target: HTMLElement,
        callback?: (data: any) => void
    ): void {
        const { range, multiplePick, onSelect } = this.options.get();
        target.addEventListener('click', (event: any) => {
            const index = getIndexForEventTarget(
                this.daysOfMonth,
                event.target
            );
            if (this.days[index].locked) {
                return;
            }

            this.lastSelectedDay = this.days[index].date;
            if (!range) {
                if (multiplePick) {
                    if (this.days[index].date) {
                        this.daysSelected = this.daysSelected.filter(
                            (day: Date) =>
                                formatDateToCompare(day) !==
                                formatDateToCompare(this.lastSelectedDay)
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
            if (range) {
                if (this.intervalRange.begin && this.intervalRange.end) {
                    this.intervalRange = {};
                    this.removeStatesClass();
                }
                if (this.intervalRange.begin && !this.intervalRange.end) {
                    this.intervalRange.end = this.days[index].date;
                    this.daysSelected = getIntervalOfDates(
                        this.intervalRange.begin,
                        this.intervalRange.end
                    );
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

            onSelect(this.days[index]);
            if (callback) {
                callback(this.days[index]);
            }
        });
    }

    private handleMouseInteraction(target: HTMLElement): void {
        target.addEventListener('mouseover', (event: any) => {
            const index = getIndexForEventTarget(
                this.daysOfMonth,
                event.target
            );
            if (
                !this.intervalRange.begin ||
                (this.intervalRange.begin && this.intervalRange.end)
            ) {
                return;
            }
            this.removeStatesClass();
            for (let i = 1; i <= Object.keys(this.days).length; i++) {
                this.days[i].isSelected = false;
                if (
                    isSameOrAfter(
                        this.days[index].date,
                        this.intervalRange.begin
                    )
                ) {
                    if (
                        isSameOrAfter(
                            this.days[i].date,
                            this.intervalRange.begin
                        ) &&
                        isSameOrBefore(this.days[i].date, this.days[index].date)
                    ) {
                        addClass(this.days[i].element, cssStates.IS_SELECTED);
                        addClass(this.days[i].element, cssStates.IS_RANGE);
                        if (
                            isSame(this.days[i].date, this.intervalRange.begin)
                        ) {
                            addClass(
                                this.days[i].element,
                                cssStates.IS_BEGIN_RANGE
                            );
                        }
                    }
                }
            }
        });
    }

    private creatWeek(dayShort: string): void {
        render(
            el('span', { class: cssClasses.DAY }, dayShort),
            this.calendar.week
        );
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
        let dayOptions: DayOptions = {
            day: num,
            date: toDate(date),
            isWeekend: false,
            locked: false,
            isToday: false,
            isRange: false,
            isSelected: false,
            isHighlight: false,
            events: undefined,
            attributes: {
                class: [cssClasses.DAY],
                style: {},
            },
            node: undefined,
            element: undefined,
        };
        const {
            locked,
            disableDaysOfWeek,
            disablePastDays,
            minDate,
            maxDate,
            disableDates,
            todayHighlight,
            weekStart,
            beforeCreateDay,
        } = this.options.get();
        this.days = this.days || {};

        if (day === daysWeek.SUNDAY || day === daysWeek.SATURDAY) {
            dayOptions.attributes.class.push(cssStates.IS_WEEKEND);
            dayOptions.isWeekend = true;
        }

        if (
            locked ||
            (disableDaysOfWeek && disableDaysOfWeek.includes(day)) ||
            (disablePastDays && isSameOrBefore(this.date, this.defaultDate)) ||
            (minDate && isSameOrAfter(minDate, dayOptions.date)) ||
            (maxDate && isSameOrBefore(maxDate, dayOptions.date))
        ) {
            dayOptions.attributes.class.push(cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }

        if (disableDates) {
            this.disabledDays(dayOptions);
        }

        if (isSame(this.todayDate, dayOptions.date)) {
            dayOptions.isToday = true;
            if (todayHighlight) {
                dayOptions.attributes.class.push(cssStates.IS_TODAY);
            }
        }

        this.daysSelected.find((daySelected: number) => {
            if (isSame(daySelected, dayOptions.date)) {
                dayOptions.attributes.class.push(cssStates.IS_SELECTED);
                dayOptions.isSelected = true;
            }
        });

        if (
            isBetween(
                this.intervalRange.begin,
                this.intervalRange.end,
                dayOptions.date
            )
        ) {
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
            if (weekStart === daysWeek.SUNDAY) {
                dayOptions.attributes.style[this.isRTL] =
                    day * (100 / Object.keys(daysWeek).length) + '%';
            } else {
                if (day === daysWeek.SUNDAY) {
                    dayOptions.attributes.style[this.isRTL] =
                        (Object.keys(daysWeek).length - weekStart) *
                            (100 / Object.keys(daysWeek).length) +
                        '%';
                } else {
                    dayOptions.attributes.style[this.isRTL] =
                        (day - 1) * (100 / Object.keys(daysWeek).length) + '%';
                }
            }
        }

        dayOptions.node = el(
            'div',
            dayOptions.attributes,
            dayOptions.day.toString()
        );
        dayOptions = beforeCreateDay(dayOptions);
        dayOptions.element = render(dayOptions.node, this.calendar.month);
        this.days[dayOptions.day] = dayOptions;
    }

    private disabledDays(dayOptions: any): void {
        const { disableDates } = this.options.get();
        if (isArray(disableDates[0])) {
            disableDates.map((date: any) => {
                if (
                    isSameOrAfter(dayOptions.date, date[0]) &&
                    isSameOrBefore(dayOptions.date, date[1])
                ) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        } else {
            disableDates.map((date: any) => {
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
                    if (
                        isSameOrAfter(dayOptions.date, date[0]) &&
                        isSameOrBefore(dayOptions.date, date[1])
                    ) {
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
        const { attributes, ...rest } = this.daysHighlight[day];
        delete rest.days;
        dayOptions = extend(dayOptions, rest);
        for (const key in attributes) {
            if (dayOptions.attributes[key] && attributes[key]) {
                dayOptions.attributes[key] = extend(
                    dayOptions.attributes[key],
                    attributes[key]
                );
            } else if (attributes[key]) {
                dayOptions.attributes[key] = attributes[key];
            }
        }
        dayOptions.attributes.class.push(cssStates.IS_HIGHLIGHT);
        dayOptions.isHighlight = true;
    }

    private monthsAsString(monthIndex: number): any {
        const { monthShort } = this.options.get();
        const { monthsShort, months } = this.langs.get();
        return monthShort ? monthsShort[monthIndex] : months[monthIndex];
    }

    private weekAsString(weekIndex: number): any {
        const { weekShort } = this.options.get();
        const { daysShort, days } = this.langs.get();
        return weekShort ? daysShort[weekIndex] : days[weekIndex];
    }

    private mounted(): void {
        if (this.calendar.period) {
            this.calendar.period.innerHTML =
                this.monthsAsString(this.date.getMonth()) +
                ' ' +
                this.date.getFullYear();
        }

        const listDays: number[] = [];
        const { weekStart } = this.options.get();
        const { daysShort } = this.langs.get();
        this.calendar.week.textContent = '';
        for (let i = weekStart; i < daysShort.length; i++) {
            listDays.push(i);
        }

        for (let i = 0; i < weekStart; i++) {
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
