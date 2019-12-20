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

const defaults = {
    selector: '.hello-week',
    lang: 'en',
    langFolder: '../langs/',
    format: 'DD/MM/YYYY',
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

function error(...msg) {
    throw new Error(`[Hello Week Error]: ${msg}`);
}

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

function isBetween(to, from, date) {
    return date > to && date < from;
}
function isSame(input, date) {
    return input === date;
}

function template(options, args) {
    const self = {};
    if (!isString(options.selector) && !isDef(options.selector)) {
        error('You need to specify a selector!');
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

/**
 * Set date timestamp to human format.
 *
 * @param      {number}  timestamp
 * @param      {string}  format
 * @return     {string}
 */
function timestampToHuman(timestamp, langs, format = 'YYYY-MM-DD') {
    const dt = new Date(timestamp);
    format = format.replace('dd', dt.getDate().toString());
    format = format.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
    format = format.replace('mm', (dt.getMonth() + 1).toString());
    format = format.replace('MMM', langs.months[dt.getMonth()]);
    format = format.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString());
    format = format.replace('mmm', langs.monthsShort[dt.getMonth()]);
    format = format.replace('yyyy', dt.getFullYear().toString());
    format = format.replace('YYYY', dt.getFullYear().toString());
    format = format.replace('YY', dt
        .getFullYear()
        .toString()
        .substring(2));
    format = format.replace('yy', dt
        .getFullYear()
        .toString()
        .substring(2));
    return format;
}
/**
 * Set date human format to timestamp.
 *
 * @param      {string}
 * @return     {number}
 */
function humanToTimestamp(date) {
    if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
        throw new Error(`The date ${date} is not valid!`);
    }
    if (date || typeof date === 'string') {
        return new Date(date + 'T00:00:00Z').getTime();
    }
    return new Date().setHours(0, 0, 0, 0);
}
function setToTimestamp(date) {
    if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
        throw new Error(`The date ${date} is not valid!`);
    }
    if (date || typeof date === 'string') {
        return new Date(date + 'T00:00:00Z').getTime();
    }
    return new Date().setHours(0, 0, 0, 0);
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
        dates.push(timestampToHuman(currentDate, langs));
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}

function format(day, month, year) {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
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
    min.setHours(0, 0, 0, 0);
    return min.setDate(min.getDate() - 1);
}
/**
 * Set max date.
 * @param {string} date
 */
function setMaxDate(dt) {
    const max = date(dt);
    max.setHours(0, 0, 0, 0);
    return max.setDate(max.getDate() + 1);
}

class HelloWeek {
    constructor(options) {
        this.calendar = {};
        this.intervalRange = {};
        this.daysSelected = [];
        this.options = extend(extend({}, defaults), options);
        this.defaultsOptions = extend(extend({}, defaults), options);
        const calendar = template(this.options, {
            prev: {
                cb: () => this.prev()
            },
            next: {
                cb: () => this.next()
            }
        });
        this.selector = calendar.selector;
        this.calendar = calendar.calendar;
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
    reset(options = {}, callback) {
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
    getDays() {
        return this.daysSelected.map((day) => timestampToHuman(day, this.langs, this.options.format));
    }
    /**
     * Gets the day selected.
     */
    getDaySelected() {
        return this.lastSelectedDay;
    }
    /**
     * Returns the highlight dates.
     * @return {object}
     */
    getDaysHighlight() {
        return this.daysHighlight;
    }
    /**
     * Returns the current month selected.
     * @return {string}
     */
    getMonth() {
        return this.date.getMonth() + 1;
    }
    /**
     * Returns the current year selected.
     * @return {string}
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
     * @param {boolean} state
     */
    setMultiplePick(state) {
        this.options.multiplePick = state;
    }
    /**
     * Sets calendar with disable past days.
     * @param {boolean} state
     */
    setDisablePastDays(state) {
        this.options.disablePastDays = state;
    }
    /**
     * Sets calendar with today highlight.
     * @param {boolean} state
     */
    setTodayHighlight(state) {
        this.options.todayHighlight = state;
    }
    /**
     * Sets calendar range.
     */
    setRange(value) {
        if (isArray(this.options.range)) {
            this.intervalRange.begin = humanToTimestamp(this.options.range[0]);
            this.intervalRange.end = humanToTimestamp(this.options.range[1]);
        }
        else {
            this.options.range = value;
        }
    }
    /**
     * Sets calendar locked.
     * @param {boolean} state
     */
    setLocked(state) {
        this.options.locked = state;
    }
    /**
     * Set min date.
     * @param {string} date
     */
    setMinDate(date) {
        this.options.minDate = setMinDate(date);
    }
    /**
     * Set max date.
     * @param {string} date
     */
    setMaxDate(date) {
        this.options.maxDate = setMaxDate(date);
    }
    init(callback) {
        this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
        this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];
        if (this.daysSelected.length > 1 && !this.options.multiplePick) {
            error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option
                is ${this.options.multiplePick}!`);
        }
        this.todayDate = setToTimestamp() - new Date().getTimezoneOffset() * 1000 * 60;
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
        if (this.options.range) {
            this.setRange(this.options.range);
        }
        this.mounted();
        this.options.onLoad();
        if (callback) {
            callback();
        }
    }
    /**
     * Select day
     * @private
     */
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
            this.lastSelectedDay = this.days[index].timestamp;
            if (!this.options.range) {
                if (this.options.multiplePick) {
                    if (this.days[index].timestamp) {
                        this.daysSelected = this.daysSelected.filter((day) => setToTimestamp(day) !== this.lastSelectedDay);
                    }
                    if (!this.days[index].isSelected) {
                        this.daysSelected.push(timestampToHuman(this.lastSelectedDay, this.langs));
                    }
                }
                else {
                    if (!this.days[index].locked) {
                        this.removeStatesClass();
                    }
                    this.daysSelected = [];
                    this.daysSelected.push(timestampToHuman(this.lastSelectedDay, this.langs));
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
                    this.intervalRange.end = this.days[index].timestamp;
                    this.daysSelected = getIntervalOfDates(this.intervalRange.begin, this.intervalRange.end, this.langs);
                    addClass(event.target, cssStates.IS_END_RANGE);
                    if (this.intervalRange.begin > this.intervalRange.end) {
                        this.intervalRange = {};
                        this.removeStatesClass();
                    }
                }
                if (!this.intervalRange.begin) {
                    this.intervalRange.begin = this.days[index].timestamp;
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
                if (this.days[index].timestamp >= this.intervalRange.begin) {
                    if (this.days[i].timestamp >= this.intervalRange.begin &&
                        this.days[i].timestamp <= this.days[index].timestamp) {
                        addClass(this.days[i].element, cssStates.IS_SELECTED);
                        addClass(this.days[i].element, cssStates.IS_RANGE);
                        if (isSame(this.days[i].timestamp, this.intervalRange.begin)) {
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
        while (isSame(this.date.getMonth(), currentMonth)) {
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
            timestamp: humanToTimestamp(format(date.getDate(), date.getMonth(), date.getFullYear())),
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
        if (isSame(day, daysWeek.SUNDAY) || isSame(day, daysWeek.SATURDAY)) {
            dayOptions.attributes.class.push(cssStates.IS_WEEKEND);
            dayOptions.isWeekend = true;
        }
        if (this.options.locked ||
            (this.options.disableDaysOfWeek && this.options.disableDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays && +this.date.setHours(0, 0, 0, 0) <= +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
            (this.options.minDate && +this.options.minDate >= dayOptions.timestamp) ||
            (this.options.maxDate && +this.options.maxDate <= dayOptions.timestamp)) {
            dayOptions.attributes.class.push(cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }
        if (this.options.disableDates) {
            this.setDaysDisable(dayOptions);
        }
        if (this.options.todayHighlight && isSame(this.todayDate, dayOptions.timestamp)) {
            dayOptions.attributes.class.push(cssStates.IS_TODAY);
            dayOptions.isToday = true;
        }
        this.daysSelected.find((daySelected) => {
            if (isSame(daySelected, dayOptions.timestamp) ||
                isSame(humanToTimestamp(daySelected.toString()), dayOptions.timestamp)) {
                dayOptions.attributes.class.push(cssStates.IS_SELECTED);
                dayOptions.isSelected = true;
            }
        });
        if (isBetween(this.intervalRange.begin, this.intervalRange.end, dayOptions.timestamp)) {
            dayOptions.attributes.class.push(cssStates.IS_RANGE);
            dayOptions.isRange = true;
        }
        if (isSame(dayOptions.timestamp, this.intervalRange.begin)) {
            dayOptions.attributes.class.push(cssStates.IS_BEGIN_RANGE);
        }
        if (isSame(dayOptions.timestamp, this.intervalRange.end)) {
            dayOptions.attributes.class.push(cssStates.IS_END_RANGE);
        }
        if (this.daysHighlight) {
            this.setDayHighlight(dayOptions);
        }
        if (dayOptions.day === 1) {
            if (this.options.weekStart === daysWeek.SUNDAY) {
                dayOptions.attributes.style[this.options.rtl ? 'margin-right' : 'margin-left'] =
                    day * (100 / Object.keys(daysWeek).length) + '%';
            }
            else {
                if (day === daysWeek.SUNDAY) {
                    dayOptions.attributes.style[this.options.rtl ? 'margin-right' : 'margin-left'] =
                        (Object.keys(daysWeek).length - this.options.weekStart) * (100 / Object.keys(daysWeek).length) + '%';
                }
                else {
                    dayOptions.attributes.style[this.options.rtl ? 'margin-right' : 'margin-left'] =
                        (day - 1) * (100 / Object.keys(daysWeek).length) + '%';
                }
            }
        }
        dayOptions.node = h('div', dayOptions.attributes, dayOptions.day.toString());
        dayOptions = this.options.beforeCreateDay(dayOptions);
        dayOptions.element = render(dayOptions.node, this.calendar.month);
        this.days[dayOptions.day] = dayOptions;
    }
    setDaysDisable(dayOptions) {
        if (this.options.disableDates[0] instanceof Array) {
            this.options.disableDates.map((date) => {
                if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
        else {
            this.options.disableDates.map((date) => {
                if (isSame(dayOptions.timestamp, setToTimestamp(date))) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
    }
    setDayHighlight(dayOptions) {
        for (const key in this.daysHighlight) {
            if (this.daysHighlight[key].days[0] instanceof Array) {
                this.daysHighlight[key].days.map((date) => {
                    if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
                        this.setStyleDayHighlight(key, dayOptions);
                    }
                });
            }
            else {
                this.daysHighlight[key].days.map((date) => {
                    if (isSame(dayOptions.timestamp, setToTimestamp(date))) {
                        this.setStyleDayHighlight(key, dayOptions);
                    }
                });
            }
        }
    }
    setStyleDayHighlight(key, dayOptions) {
        const { attributes } = this.daysHighlight[key];
        for (const k in attributes) {
            if (dayOptions.attributes[k] && attributes[k]) {
                dayOptions.attributes[k] = extend(dayOptions.attributes[k], attributes[k]);
            }
            else if (attributes[k]) {
                dayOptions.attributes[k] = attributes[k];
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
