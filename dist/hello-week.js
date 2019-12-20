const cssClasses = {
    CALENDAR: 'hello-week',
    DAY: 'day',
    MONTH: 'month',
    NAVIGATION: 'navigation',
    NEXT: 'next',
    PERIOD: 'period',
    PREV: 'prev',
    RTL: 'rtl',
    WEEK: 'week'
};
const cssStates = {
    IS_BEGIN_RANGE: 'is-begin-range',
    IS_DISABLED: 'is-disabled',
    IS_END_RANGE: 'is-end-range',
    IS_HIGHLIGHT: 'is-highlight',
    IS_SELECTED: 'is-selected',
    IS_RANGE: 'is-range',
    IS_TODAY: 'is-today',
    IS_WEEKEND: 'is-weekend'
};
const daysWeek = {
    FRIDAY: 5,
    MONDAY: 1,
    SATURDAY: 6,
    SUNDAY: 0,
    THURSDAY: 4,
    TUESDAY: 2,
    WEDNESDAY: 3
};
const margins = {
    RIGHT: 'margin-right',
    LEFT: 'margin-left'
};

const defaults = {
    selector: '.hello-week',
    lang: 'en-GB',
    langFolder: '../langs/',
    format: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    },
    monthShort: false,
    weekShort: true,
    defaultDate: null,
    minDate: null,
    maxDate: null,
    disableDaysOfWeek: null,
    disableDates: null,
    weekStart: 0,
    daysSelected: null,
    daysHighlight: null,
    multiplePick: false,
    disablePastDays: false,
    todayHighlight: true,
    range: false,
    locked: false,
    rtl: false,
    nav: ['◀', '▶'],
    onLoad: () => {
        /** callback */
    },
    onClear: () => {
        /** callback */
    },
    onNavigation: () => {
        /** callback */
    },
    onSelect: () => {
        /** callback */
    },
    beforeCreateDay: (data) => data
};

function isDef(v) {
    return v !== undefined && v !== null;
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
function isArray(obj) {
    return obj !== null && Array.isArray(obj);
}
function isString(val) {
    return typeof val === 'string';
}

function render(vnode, parentDom) {
    // Strings just convert to #text Nodes:
    if (vnode.split) {
        return document.createTextNode(vnode);
    }
    // create a DOM element with the nodeName of our VDOM element:
    const node = document.createElement(vnode.nodeName);
    // copy attributes onto the new node:
    const attributes = vnode.attributes || {};
    Object.keys(attributes).forEach((key) => {
        if (key === 'class') {
            if (isString(attributes[key])) {
                node.className = attributes[key];
            }
            else if (isArray(attributes[key])) {
                attributes[key].forEach((value) => {
                    addClass(node, value);
                });
            }
        }
        else if (key === 'style') {
            if (isString(attributes[key])) {
                node.style = attributes[key];
            }
            else if (isObject(attributes[key])) {
                Object.keys(attributes[key]).forEach((props) => {
                    node.style[props] = attributes[key][props];
                });
            }
        }
        else if (key === 'dataset') {
            Object.keys(attributes[key]).forEach((props) => {
                node.setAttribute('data-' + props, attributes[key][props]);
            });
        }
        else {
            node.setAttribute(key, attributes[key]);
        }
    });
    // render (build) and then append child nodes:
    (vnode.children || []).forEach((c) => node.appendChild(render(c)));
    return parentDom ? parentDom.appendChild(node) : node;
}
function h(nodeName, attributes, ...args) {
    const vnode = { nodeName };
    if (attributes) {
        vnode.attributes = attributes;
    }
    if (args.length) {
        vnode.children = [].concat(...args);
    }
    return vnode;
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
function existElement(className, where) {
    return isDef(where) ? where.querySelector(`.${className}`) : document.querySelector(`.${className}`);
}

function extend(to, from) {
    return Object.assign(to, from);
}

function getIndexForEventTarget(daysOfMonth, target) {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

function toDate(date) {
    const dt = new Date(date);
    return defaultFormat(dt.getDate(), dt.getMonth(), dt.getFullYear());
}
function defaultFormat(day, month, year) {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}
function formatDate(date, langs = defaults.lang, options = defaults.format) {
    console.log(Intl.DateTimeFormat(langs, options).format(new Date(date)));
    return new Intl.DateTimeFormat(langs, options).format(new Date(date));
}
function formatDateToCompare(date) {
    const dt = new Date(date);
    return Number('' + dt.getFullYear() + (dt.getMonth() + 1) + (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
}

function isAfter(input, date) {
    return formatDateToCompare(input) > formatDateToCompare(date);
}
function isBefore(input, date) {
    return formatDateToCompare(input) < formatDateToCompare(date);
}
function isBetween(to, from, date) {
    return isAfter(date, to) && isBefore(date, from);
}
function isSame(input, date) {
    return formatDateToCompare(input) === formatDateToCompare(date);
}
function isSameOrAfter(input, date) {
    return isSame(input, date) || isAfter(input, date);
}
function isSameOrBefore(input, date) {
    return isSame(input, date) || isBefore(input, date);
}

function template(options, args) {
    const self = {};
    if (!isString(options.selector) && !isDef(options.selector)) {
        throw new Error('You need to specify a selector!');
    }
    self.selector = options.selector ? document.querySelector(options.selector) : options.selector;
    if (!isDef(self.selector)) {
        self.selector = render(h('div', { class: [options.selector, cssClasses.CALENDAR] }));
    }
    else {
        if (options.selector !== cssClasses.CALENDAR) {
            addClass(self.selector, cssClasses.CALENDAR);
        }
    }
    self.calendar = {};
    self.calendar.navigation = existElement(cssClasses.NAVIGATION, self.selector);
    if (!isDef(self.calendar.navigation)) {
        self.calendar.navigation = render(h('div', { class: cssClasses.NAVIGATION }), self.selector);
    }
    if (isDef(options.nav[0])) {
        self.calendar.prevMonth = render(h('div', { class: cssClasses.PREV }, options.nav[0]), self.calendar.navigation);
        self.calendar.prevMonth.addEventListener('click', () => args.prev.cb());
    }
    self.calendar.period = existElement(cssClasses.PERIOD, self.selector);
    if (!isDef(self.calendar.period)) {
        self.calendar.period = render(h('div', { class: cssClasses.PERIOD }), self.calendar.navigation);
    }
    if (isDef(options.nav[1])) {
        self.calendar.nextMonth = render(h('div', { class: cssClasses.NEXT }, options.nav[1]), self.calendar.navigation);
        self.calendar.nextMonth.addEventListener('click', () => args.next.cb());
    }
    self.calendar.week = existElement(cssClasses.WEEK, self.selector);
    if (!isDef(self.calendar.week)) {
        self.calendar.week = render(h('div', { class: cssClasses.WEEK }), self.selector);
    }
    self.calendar.month = existElement(cssClasses.MONTH, self.selector);
    if (!isDef(self.calendar.month)) {
        self.calendar.month = render(h('div', { class: cssClasses.MONTH }), self.selector);
    }
    if (options.rtl) {
        addClass(self.calendar.week, cssClasses.RTL);
        addClass(self.calendar.month, cssClasses.RTL);
    }
    return self;
}

function getIntervalOfDates(startDate, endDate, langs) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
        const dt = new Date(this.valueOf());
        dt.setDate(dt.getDate() + days);
        return dt.getTime();
    };
    while (currentDate <= endDate) {
        dates.push(formatDate(currentDate, langs));
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}

function date(dt) {
    if (isDef(dt)) {
        return new Date(dt);
    }
    return new Date();
}

/**
 * Set min date.
 * @param {string} date
 */
function setMinDate(dt) {
    const min = date(dt);
    return toDate(min.setDate(min.getDate() - 1));
}
/**
 * Set max date.
 * @param {string} date
 */
function setMaxDate(dt) {
    const max = date(dt);
    return toDate(max.setDate(max.getDate() + 1));
}

class HelloWeek {
    constructor(options) {
        this.todayDate = toDate(new Date());
        this.date = new Date();
        this.defaultDate = new Date();
        this.intervalRange = {};
        this.daysSelected = [];
        this.options = extend(extend({}, defaults), options);
        this.defaultsOptions = extend(extend({}, defaults), options);
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
            .then((data) => data.default)
            .then((lang) => {
            this.langs = lang;
            this.init();
        });
    }
    destroy() {
        this.removeStatesClass();
        this.selector.remove();
    }
    /**
     * Change the month to the previous, also you can send a callback function like a parameter.
     */
    prev(callback) {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();
        this.options.onNavigation();
        if (callback) {
            callback();
        }
    }
    /**
     * Change the month to the next, also you can send a callback function like a parameter.
     */
    next(callback) {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();
        this.options.onNavigation();
        if (callback) {
            callback();
        }
    }
    /**
     * Update and redraws the events for the current month.
     */
    update() {
        this.clearCalendar();
        this.mounted();
    }
    /**
     * Reset calendar
     */
    reset(options, callback) {
        this.clearCalendar();
        this.options = extend(options, this.defaultsOptions);
        this.init(callback);
    }
    /**
     * Move the calendar to arbitrary day.
     */
    goToDate(date = this.todayDate) {
        this.date = new Date(date);
        this.date.setDate(1);
        this.update();
    }
    /**
     * Returns the selected days with the format specified.
     */
    getDaySelected() {
        return this.daysSelected
            .sort((a, b) => formatDateToCompare(a) - formatDateToCompare(b))
            .map((day) => formatDate(day, this.options.lang, this.options.format));
    }
    /**
     * Gets last day selected.
     */
    getLastDaySelected() {
        return this.lastSelectedDay;
    }
    /**
     * Returns the highlight dates.
     */
    getDaysHighlight() {
        return this.daysHighlight;
    }
    /**
     * Returns the current month selected.
     */
    getMonth() {
        return this.date.getMonth() + 1;
    }
    /**
     * Returns the current year selected.
     */
    getYear() {
        return this.date.getFullYear();
    }
    /**
     * Set highlight dates,
     */
    setDaysHighlight(daysHighlight) {
        this.daysHighlight = [...this.daysHighlight, ...daysHighlight];
    }
    /**
     * Sets calendar with multiple pick.
     */
    setMultiplePick(state) {
        this.options.multiplePick = state;
    }
    /**
     * Sets calendar with disable past days.
     */
    setDisablePastDays(state) {
        this.options.disablePastDays = state;
    }
    /**
     * Sets calendar with today highlight.
     */
    setTodayHighlight(state) {
        this.options.todayHighlight = state;
    }
    /**
     * Sets calendar range.
     */
    setRange(value) {
        if (isArray(this.options.range)) {
            this.intervalRange.begin = this.options.range[0];
            this.intervalRange.end = this.options.range[1];
        }
        else {
            this.options.range = value;
        }
    }
    /**
     * Sets calendar locked.
     */
    setLocked(state) {
        this.options.locked = state;
    }
    /**
     * Set min date.
     */
    setMinDate(date) {
        this.options.minDate = setMinDate(date);
    }
    /**
     * Set max date.
     */
    setMaxDate(date) {
        this.options.maxDate = setMaxDate(date);
    }
    init(callback) {
        this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
        this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];
        if (this.daysSelected.length && !this.options.multiplePick) {
            throw new Error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option is FALSE!`);
        }
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
        this.options.onLoad();
        if (callback) {
            callback();
        }
    }
    selectDay(callback) {
        this.daysOfMonth = this.selector.querySelectorAll('.' + cssClasses.MONTH + ' .' + cssClasses.DAY);
        for (const i of Object.keys(this.daysOfMonth)) {
            this.handleClickInteraction(this.daysOfMonth[i], callback);
            if (this.options.range) {
                this.handleMouseInteraction(this.daysOfMonth[i]);
            }
        }
    }
    handleClickInteraction(target, callback) {
        target.addEventListener('click', (event) => {
            const index = getIndexForEventTarget(this.daysOfMonth, event.target);
            if (this.days[index].locked) {
                return;
            }
            this.lastSelectedDay = this.days[index].date;
            if (!this.options.range) {
                if (this.options.multiplePick) {
                    if (this.days[index].date) {
                        this.daysSelected = this.daysSelected.filter((day) => formatDateToCompare(day) !== formatDateToCompare(this.lastSelectedDay));
                    }
                    if (!this.days[index].isSelected) {
                        this.daysSelected.push(this.lastSelectedDay);
                    }
                }
                else {
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
            this.options.onSelect();
            if (callback) {
                callback();
            }
        });
    }
    handleMouseInteraction(target) {
        target.addEventListener('mouseover', (event) => {
            const index = getIndexForEventTarget(this.daysOfMonth, event.target);
            if (!this.intervalRange.begin || (this.intervalRange.begin && this.intervalRange.end)) {
                return;
            }
            this.removeStatesClass();
            for (let i = 1; i <= Object.keys(this.days).length; i++) {
                this.days[i].isSelected = false;
                if (isSameOrAfter(this.days[index].date, this.intervalRange.begin)) {
                    if (isSameOrAfter(this.days[i].date, this.intervalRange.begin) &&
                        isSameOrBefore(this.days[i].date, this.days[index].date)) {
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
    creatWeek(dayShort) {
        render(h('span', { class: cssClasses.DAY }, dayShort), this.calendar.week);
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
        let dayOptions = {
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
        if (this.options.locked ||
            (this.options.disableDaysOfWeek && this.options.disableDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays && isSameOrBefore(this.date, this.defaultDate)) ||
            (this.options.minDate && isSameOrAfter(this.options.minDate, dayOptions.date)) ||
            (this.options.maxDate && isSameOrBefore(this.options.maxDate, dayOptions.date))) {
            dayOptions.attributes.class.push(cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }
        if (this.options.disableDates) {
            this.setDaysDisable(dayOptions);
        }
        if (this.options.todayHighlight && isSame(this.todayDate, dayOptions.date)) {
            dayOptions.attributes.class.push(cssStates.IS_TODAY);
            dayOptions.isToday = true;
        }
        this.daysSelected.find((daySelected) => {
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
            this.setDayHighlight(dayOptions);
        }
        if (dayOptions.day === 1) {
            if (this.options.weekStart === daysWeek.SUNDAY) {
                dayOptions.attributes.style[this.isRTL] = day * (100 / Object.keys(daysWeek).length) + '%';
            }
            else {
                if (day === daysWeek.SUNDAY) {
                    dayOptions.attributes.style[this.isRTL] =
                        (Object.keys(daysWeek).length - this.options.weekStart) * (100 / Object.keys(daysWeek).length) + '%';
                }
                else {
                    dayOptions.attributes.style[this.isRTL] = (day - 1) * (100 / Object.keys(daysWeek).length) + '%';
                }
            }
        }
        dayOptions.node = h('div', dayOptions.attributes, dayOptions.day.toString());
        dayOptions = this.options.beforeCreateDay(dayOptions);
        dayOptions.element = render(dayOptions.node, this.calendar.month);
        this.days[dayOptions.day] = dayOptions;
    }
    setDaysDisable(dayOptions) {
        if (isArray(this.options.disableDates[0])) {
            this.options.disableDates.map((date) => {
                if (isSameOrAfter(dayOptions.date, date[0]) && isSameOrBefore(dayOptions.date, date[1])) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
        else {
            this.options.disableDates.map((date) => {
                if (isSame(dayOptions.date, date)) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
    }
    setDayHighlight(dayOptions) {
        for (const day in this.daysHighlight) {
            if (this.daysHighlight[day].days[0] instanceof Array) {
                this.daysHighlight[day].days.map((date) => {
                    if (isSameOrAfter(dayOptions.date, date[0]) && isSameOrBefore(dayOptions.date, date[1])) {
                        this.setStyleDayHighlight(day, dayOptions);
                    }
                });
            }
            else {
                this.daysHighlight[day].days.map((date) => {
                    if (isSame(dayOptions.date, date)) {
                        this.setStyleDayHighlight(day, dayOptions);
                    }
                });
            }
        }
    }
    setStyleDayHighlight(day, dayOptions) {
        const { attributes } = this.daysHighlight[day];
        for (const key in attributes) {
            if (dayOptions.attributes[key] && attributes[key]) {
                dayOptions.attributes[key] = extend(dayOptions.attributes[key], attributes[key]);
            }
            else if (attributes[key]) {
                dayOptions.attributes[key] = attributes[key];
            }
        }
        dayOptions.attributes.class.push(cssStates.IS_HIGHLIGHT);
        dayOptions.isHighlight = true;
    }
    monthsAsString(monthIndex) {
        return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
    }
    weekAsString(weekIndex) {
        return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
    }
    mounted() {
        const listDays = [];
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
    clearCalendar() {
        this.calendar.month.textContent = '';
    }
    removeStatesClass() {
        for (const i of Object.keys(this.daysOfMonth)) {
            removeClass(this.daysOfMonth[i], cssStates.IS_SELECTED);
            removeClass(this.daysOfMonth[i], cssStates.IS_RANGE);
            removeClass(this.daysOfMonth[i], cssStates.IS_BEGIN_RANGE);
            removeClass(this.daysOfMonth[i], cssStates.IS_END_RANGE);
            this.days[+i + 1].isSelected = false;
        }
    }
}

const HelloWeek$1 = HelloWeek;
window.HelloWeek = HelloWeek$1;

export default HelloWeek;
export { HelloWeek$1 as HelloWeek, h as el };
