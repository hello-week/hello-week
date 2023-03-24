function createHTMLElement(el, className, parentElement, textNode = null) {
    let elem = el.querySelector('.' + className);
    if (!elem) {
        elem = document.createElement('div');
        addClass(elem, className);
        if (textNode !== null) {
            const text = document.createTextNode(textNode);
            elem.appendChild(text);
        }
        parentElement.appendChild(elem);
    }
    return elem;
}
function setDataAttr(el, name, value) {
    return el.setAttribute(name, value);
}
function setStyle(el, prop, value) {
    return el.style.setProperty(prop, value);
}
function addClass(el, className) {
    return el.classList.add(className);
}
function removeClass(el, className) {
    return el.classList.remove(className);
}
function toggleClass(el, className) {
    return el.classList.toggle(className);
}

const defaultOptions = {
    selector: '.hello-week',
    lang: 'en',
    langFolder: '../dist/langs/',
    format: 'DD/MM/YYYY',
    monthShort: false,
    weekShort: true,
    defaultDate: null,
    minDate: null,
    maxDate: null,
    disabledDaysOfWeek: null,
    disableDates: null,
    weekStart: 0,
    timezoneOffset: new Date().getTimezoneOffset(),
    daysSelected: null,
    daysHighlight: null,
    multiplePick: false,
    disablePastDays: false,
    todayHighlight: true,
    range: false,
    locked: false,
    rtl: false,
    nav: ['◀', '▶'],
    onClear: () => {
    },
    onLoad: () => {
    },
    onNavigation: () => {
    },
    onSelect: () => {
    },
    beforeCreateDay: (data) => data,
};

function extend(options, configurations) {
    return Object.assign(configurations || defaultOptions, options);
}

function setTimeZone({ date, timezoneOffset, }) {
    const dt = date ? new Date(date) : new Date();
    timezoneOffset = timezoneOffset ? timezoneOffset : dt.getTimezoneOffset();
    dt.setTime(dt.getTime() + timezoneOffset * 60 * 1000);
    return dt;
}
function timestampToHuman({ timestamp, format, langs, timezoneOffset, }) {
    const dt = setTimeZone({ date: timestamp, timezoneOffset });
    format = format.replace('dd', dt.getDate().toString());
    format = format.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
    format = format.replace('mm', (dt.getMonth() + 1).toString());
    format = format.replace('MMM', langs.months[dt.getMonth()]);
    format = format.replace('MM', (dt.getMonth() + 1 > 9
        ? dt.getMonth() + 1
        : '0' + (dt.getMonth() + 1)).toString());
    format = format.replace('mmm', langs.monthsShort[dt.getMonth()]);
    format = format.replace('yyyy', dt.getFullYear().toString());
    format = format.replace('YYYY', dt.getFullYear().toString());
    format = format.replace('YY', dt.getFullYear().toString().substring(2));
    format = format.replace('yy', dt.getFullYear().toString().substring(2));
    return format;
}
function formatDate(day, month, year) {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}
function setToTimestamp(date) {
    if (typeof date === 'object') {
        return date.setHours(0, 0, 0, 0);
    }
    if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
        throw new Error(`The date ${date} is not valid!`);
    }
    if (date || typeof date === 'string') {
        return new Date(date).setHours(0, 0, 0, 0);
    }
    return new Date().setHours(0, 0, 0, 0);
}

function isString(val) {
    return typeof val === 'string';
}
function isNull(val) {
    return val === null;
}
function isArray(obj) {
    return obj !== null && Array.isArray(obj);
}

function getIndexForEventTarget(daysOfMonth, target) {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

const CSS_CLASSES = {
    calendar: 'hello-week',
    month: 'month',
    day: 'day',
    week: 'week',
    navigation: 'navigation',
    period: 'period',
    prev: 'prev',
    next: 'next',
    rtl: 'rtl',
    isHighlight: 'is-highlight',
    isSelected: 'is-selected',
    isBeginRange: 'is-begin-range',
    isEndRange: 'is-end-range',
    isDisabled: 'is-disabled',
    isToday: 'is-today',
    isWeekend: 'is-weekend',
};
const FORMAT_DATE = 'YYYY-MM-DD';
const DAYS_WEEK = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

class HelloWeek {
    static get daysWeek() {
        return DAYS_WEEK;
    }
    constructor(options) {
        this.calendar = {
            navigation: undefined,
            period: undefined,
            prevMonth: undefined,
            nextMonth: undefined,
            week: undefined,
            month: undefined,
        };
        this.cssClasses = CSS_CLASSES;
        this.intervalRange = {
            begin: 0,
            end: 0,
        };
        this.daysSelected = [];
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
        this.calendar.navigation = createHTMLElement(this.selector, this.cssClasses.navigation, this.selector);
        if (this.options.nav) {
            const [prev, next] = this.options.nav;
            this.calendar.prevMonth = createHTMLElement(this.selector, this.cssClasses.prev, this.calendar.navigation, prev);
            this.calendar.period = createHTMLElement(this.selector, this.cssClasses.period, this.calendar.navigation);
            this.calendar.nextMonth = createHTMLElement(this.selector, this.cssClasses.next, this.calendar.navigation, next);
            this.calendar.prevMonth.addEventListener('click', () => {
                this.prev(() => {
                });
            });
            this.calendar.nextMonth.addEventListener('click', () => {
                this.next(() => {
                });
            });
        }
        else {
            this.calendar.period = createHTMLElement(this.selector, this.cssClasses.period, this.calendar.navigation);
        }
        this.calendar.week = createHTMLElement(this.selector, this.cssClasses.week, this.selector);
        this.calendar.month = createHTMLElement(this.selector, this.cssClasses.month, this.selector);
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
    destroy(options) {
        this.removeEventsHandler();
        this.calendar.prevMonth.removeEventListener('click', () => this.prev());
        this.calendar.nextMonth.removeEventListener('click', () => this.next());
        this.selector.innerHTML = '';
        if (options === null || options === void 0 ? void 0 : options.removeElement) {
            this.selector.remove();
        }
    }
    prev(callback) {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();
        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    }
    next(callback) {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();
        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    }
    update() {
        this.clearCalendar();
        this.mounted();
    }
    reset(options, callback) {
        this.clearCalendar();
        this.options = extend(options, HelloWeek.initOptions);
        this.init(callback);
    }
    goToday() {
        this.date = new Date();
        this.date.setDate(1);
        this.update();
    }
    goToDate(date) {
        this.date = new Date(date || this.todayDate);
        this.date.setDate(1);
        this.update();
    }
    getDays() {
        return this.daysSelected.map((day) => timestampToHuman({
            timestamp: day,
            format: this.options.format,
            langs: this.langs,
            timezoneOffset: this.options.timezoneOffset,
        }));
    }
    getDaySelected() {
        return this.lastSelectedDay;
    }
    getDaysHighlight() {
        return this.daysHighlight;
    }
    getMonth() {
        return this.date.getMonth() + 1;
    }
    getYear() {
        return this.date.getFullYear();
    }
    setDaysHighlight(daysHighlight) {
        this.daysHighlight = [...this.daysHighlight, ...daysHighlight];
    }
    setMultiplePick(state) {
        this.options.multiplePick = state;
    }
    setDisablePastDays(state) {
        this.options.disablePastDays = state;
    }
    setTodayHighlight(state) {
        this.options.todayHighlight = state;
    }
    setRange(state) {
        this.options.range = state;
    }
    setLocked(state) {
        this.options.locked = state;
    }
    setMinDate(date) {
        this.options.minDate = new Date(date);
        this.options.minDate.setHours(0, 0, 0, 0);
        this.options.minDate.setDate(this.options.minDate.getDate() - 1);
    }
    setMaxDate(date) {
        this.options.maxDate = new Date(date);
        this.options.maxDate.setHours(0, 0, 0, 0);
        this.options.maxDate.setDate(this.options.maxDate.getDate() + 1);
    }
    init(callback) {
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
    selectDay(callback) {
        this.daysOfMonth = this.selector.querySelectorAll('.' + this.cssClasses.month + ' .' + this.cssClasses.day);
        this.addEventsHandler(callback);
    }
    getIntervalOfDates(startDate, endDate) {
        const dates = [];
        let currentDate = startDate;
        const addDays = function (days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date.getTime();
        };
        while (currentDate <= endDate) {
            dates.push(timestampToHuman({
                timestamp: currentDate,
                format: FORMAT_DATE,
                langs: this.langs,
                timezoneOffset: this.options.timezoneOffset,
            }));
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    }
    onHandleClick(event, callback) {
        const index = getIndexForEventTarget(this.daysOfMonth, event.target);
        if (this.days[index].locked)
            return;
        this.lastSelectedDay = this.days[index].timestamp;
        if (!this.options.range) {
            if (this.options.multiplePick) {
                if (this.days[index].timestamp) {
                    this.daysSelected = this.daysSelected.filter((day) => setToTimestamp(day) !== this.lastSelectedDay);
                }
                if (!this.days[index].isSelected) {
                    this.daysSelected.push(timestampToHuman({
                        timestamp: this.lastSelectedDay,
                        format: FORMAT_DATE,
                        langs: this.langs,
                        timezoneOffset: this.options.timezoneOffset,
                    }));
                }
            }
            else {
                if (!this.days[index].locked) {
                    this.removeCSSClasses();
                }
                this.daysSelected = [];
                this.daysSelected.push(timestampToHuman({
                    timestamp: this.lastSelectedDay,
                    format: FORMAT_DATE,
                    langs: this.langs,
                    timezoneOffset: this.options.timezoneOffset,
                }));
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
                this.daysSelected = this.getIntervalOfDates(this.intervalRange.begin, this.intervalRange.end);
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
    onHandleMouse(event) {
        const index = getIndexForEventTarget(this.daysOfMonth, event.target);
        if (!this.intervalRange.begin ||
            (this.intervalRange.begin && this.intervalRange.end)) {
            return;
        }
        this.removeCSSClasses();
        for (let i = 1; i <= Object.keys(this.days).length; i++) {
            this.days[i].isSelected = false;
            if (this.days[index].timestamp >= this.intervalRange.begin) {
                if (this.days[i].timestamp >= this.intervalRange.begin &&
                    this.days[i].timestamp <= this.days[index].timestamp) {
                    addClass(this.days[i].element, this.cssClasses.isSelected);
                    if (this.days[i].timestamp === this.intervalRange.begin) {
                        addClass(this.days[i].element, this.cssClasses.isBeginRange);
                    }
                }
            }
        }
    }
    createWeek(dayShort) {
        const weekDay = document.createElement('span');
        addClass(weekDay, this.cssClasses.day);
        weekDay.textContent = dayShort;
        this.calendar.week.appendChild(weekDay);
    }
    createMonth() {
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
        this.selectDay();
    }
    createDay(date) {
        const num = date.getDate();
        const day = date.getDay();
        const newDay = document.createElement('div');
        let dayOptions = {
            day: num,
            timestamp: setToTimestamp(formatDate(date.getDate(), date.getMonth(), date.getFullYear())),
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
                setStyle(newDay, this.options.rtl ? 'margin-right' : 'margin-left', day * (100 / Object.keys(HelloWeek.daysWeek).length) + '%');
            }
            else {
                if (day === HelloWeek.daysWeek.SUNDAY) {
                    setStyle(newDay, this.options.rtl ? 'margin-right' : 'margin-left', (Object.keys(HelloWeek.daysWeek).length -
                        this.options.weekStart) *
                        (100 / Object.keys(HelloWeek.daysWeek).length) +
                        '%');
                }
                else {
                    setStyle(newDay, this.options.rtl ? 'margin-right' : 'margin-left', (day - 1) *
                        (100 / Object.keys(HelloWeek.daysWeek).length) +
                        '%');
                }
            }
        }
        if (day === HelloWeek.daysWeek.SUNDAY ||
            day === HelloWeek.daysWeek.SATURDAY) {
            addClass(newDay, this.cssClasses.isWeekend);
            dayOptions.isWeekend = true;
        }
        if (this.options.locked ||
            (this.options.disabledDaysOfWeek &&
                this.options.disabledDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays &&
                +this.date.setHours(0, 0, 0, 0) <=
                    +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
            (this.options.minDate &&
                +this.options.minDate >= dayOptions.timestamp) ||
            (this.options.maxDate &&
                +this.options.maxDate <= dayOptions.timestamp)) {
            addClass(newDay, this.cssClasses.isDisabled);
            dayOptions.locked = true;
        }
        if (this.options.disableDates) {
            this.setDaysDisable(newDay, dayOptions);
        }
        if (this.todayDate === dayOptions.timestamp &&
            this.options.todayHighlight) {
            addClass(newDay, this.cssClasses.isToday);
            dayOptions.isToday = true;
        }
        if (this.options.range) {
            const startRange = this.daysSelected[0];
            const endRange = this.daysSelected.at(-1);
            if (setToTimestamp(startRange.toString()) <= dayOptions.timestamp &&
                setToTimestamp(endRange.toString()) >= dayOptions.timestamp) {
                addClass(newDay, this.cssClasses.isSelected);
                dayOptions.isSelected = true;
            }
        }
        else {
            this.daysSelected.find((day) => {
                if (day === dayOptions.timestamp ||
                    setToTimestamp(day.toString()) === dayOptions.timestamp) {
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
    setDaysDisable(newDay, dayOptions) {
        if (isArray(this.options.disableDates[0])) {
            this.options.disableDates.forEach((date) => {
                if (dayOptions.timestamp >= setToTimestamp(date[0]) &&
                    dayOptions.timestamp <= setToTimestamp(date[1])) {
                    addClass(newDay, this.cssClasses.isDisabled);
                    dayOptions.locked = true;
                }
            });
            return;
        }
        if (isArray(this.options.disableDates)) {
            this.options.disableDates.forEach((date) => {
                if (isString(date) &&
                    dayOptions.timestamp === setToTimestamp(date)) {
                    addClass(newDay, this.cssClasses.isDisabled);
                    dayOptions.locked = true;
                }
            });
        }
    }
    setDayHighlight(newDay, dayOptions) {
        this.daysHighlight.map((day, index) => {
            if (isArray(day.days[0])) {
                day.days.forEach((date) => {
                    if (dayOptions.timestamp >= setToTimestamp(date[0]) &&
                        dayOptions.timestamp <= setToTimestamp(date[1])) {
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
    setStyleDayHighlight(newDay, key, dayOptions) {
        addClass(newDay, this.cssClasses.isHighlight);
        if (this.daysHighlight[key].title) {
            dayOptions.title = this.daysHighlight[key].title;
            setDataAttr(newDay, 'data-title', this.daysHighlight[key].title);
        }
        if (this.daysHighlight[key].color) {
            setStyle(newDay, 'color', this.daysHighlight[key].color);
        }
        if (this.daysHighlight[key].backgroundColor) {
            setStyle(newDay, 'background-color', this.daysHighlight[key].backgroundColor);
        }
        dayOptions.isHighlight = true;
    }
    monthsAsString(monthIndex) {
        return this.options.monthShort
            ? this.langs.monthsShort[monthIndex]
            : this.langs.months[monthIndex];
    }
    weekAsString(weekIndex) {
        return this.options.weekShort
            ? this.langs.daysShort[weekIndex]
            : this.langs.days[weekIndex];
    }
    mounted() {
        const listDays = [];
        if (this.calendar.period) {
            this.calendar.period.innerHTML =
                this.monthsAsString(this.date.getMonth()) +
                    ' ' +
                    this.date.getFullYear();
        }
        this.calendar.week.textContent = '';
        for (let i = this.options.weekStart; i < this.langs.daysShort.length; i++) {
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
    addEventsHandler(callback) {
        this.daysOfMonth.forEach((element) => {
            element.addEventListener('click', (event) => {
                this.onHandleClick(event, callback);
            });
            if (this.options.range) {
                element.addEventListener('mouseover', (event) => {
                    this.onHandleMouse(event);
                });
            }
        });
    }
    removeEventsHandler() {
        this.daysOfMonth.forEach((element) => {
            element.removeEventListener('click', (event) => {
                this.onHandleClick(event);
            });
            if (this.options.range) {
                element.removeEventListener('mouseover', (event) => {
                    this.onHandleMouse(event);
                });
            }
        });
    }
    clearCalendar() {
        this.calendar.month.textContent = '';
    }
    removeCSSClasses() {
        this.daysOfMonth.forEach((element, i) => {
            removeClass(element, this.cssClasses.isSelected);
            removeClass(element, this.cssClasses.isBeginRange);
            removeClass(element, this.cssClasses.isEndRange);
            this.days[i + 1].isSelected = false;
        });
    }
}

export { HelloWeek as default };
