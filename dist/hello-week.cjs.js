'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

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
    lang: 'en',
    langFolder: './langs/',
    format: 'DD/MM/YYYY',
    monthShort: false,
    weekShort: true,
    defaultDate: null,
    minDate: null,
    maxDate: null,
    disableDaysOfWeek: null,
    timezoneOffset: new Date().getTimezoneOffset(),
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
    },
    onClear: () => {
    },
    onNavigation: () => {
    },
    onSelect: (data) => data,
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
    if (vnode.split)
        return document.createTextNode(vnode);
    const node = document.createElement(vnode.nodeName);
    if (isDef(vnode.attributes)) {
        diffProps(vnode, node);
    }
    (vnode.children || []).forEach((c) => node.appendChild(render(c)));
    return parentDom ? parentDom.appendChild(node) : node;
}
function diffProps(vnode, node) {
    for (const name of Object.keys(vnode.attributes)) {
        if (name === 'class') {
            classProps(vnode, node, name);
        }
        else if (name === 'style') {
            styleProps(vnode, node, name);
        }
        else if (name === 'data') {
            dataProps(vnode, node, name);
        }
        else {
            setAttr(node, name, vnode.attributes[name]);
        }
    }
}
function dataProps(vnode, node, name) {
    for (const prop of Object.keys(vnode.attributes[name])) {
        setAttr(node, `data-${name}`, vnode.attributes[name][prop]);
    }
}
function classProps(vnode, node, name) {
    if (isString(vnode.attributes[name])) {
        node.className = vnode.attributes[name];
    }
    else if (isArray(vnode.attributes[name])) {
        vnode.attributes[name].forEach((value) => {
            addClass(node, value);
        });
    }
}
function styleProps(vnode, node, name) {
    if (isString(vnode.attributes[name])) {
        node.style = vnode.attributes[name];
    }
    else if (isObject(vnode.attributes[name])) {
        for (const prop of Object.keys(vnode.attributes[name])) {
            node.style[prop] = vnode.attributes[name][prop];
        }
    }
}
function h(nodeName, attributes, ...args) {
    const vnode = { nodeName };
    if (attributes)
        vnode.attributes = attributes;
    if (args.length)
        vnode.children = [].concat(...args);
    return vnode;
}
function setAttr(el, name, value) {
    return el.setAttribute(name, value);
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

function toDate(date, timezoneOffset) {
    const dt = setTimeZone(date, timezoneOffset);
    return defaultFormat(dt.getDate(), dt.getMonth(), dt.getFullYear());
}
function defaultFormat(day, month, year) {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}
function formatDate(date, langs, formats, timezoneOffset) {
    const dt = setTimeZone(date, timezoneOffset);
    formats = formats ? formats : defaults.format;
    formats = formats.replace('dd', dt.getDate().toString());
    formats = formats.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
    formats = formats.replace('mm', (dt.getMonth() + 1).toString());
    formats = formats.replace('MMM', langs.months[dt.getMonth()]);
    formats = formats.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString());
    formats = formats.replace('mmm', langs.monthsShort[dt.getMonth()]);
    formats = formats.replace('yyyy', dt.getFullYear().toString());
    formats = formats.replace('YYYY', dt.getFullYear().toString());
    formats = formats.replace('YY', dt
        .getFullYear()
        .toString()
        .substring(2));
    formats = formats.replace('yy', dt
        .getFullYear()
        .toString()
        .substring(2));
    return formats;
}
function setTimeZone(date, timezoneOffset) {
    const dt = isDef(date) ? new Date(date) : new Date();
    timezoneOffset = timezoneOffset ? timezoneOffset : dt.getTimezoneOffset();
    dt.setTime(dt.getTime() + timezoneOffset * 60 * 1000);
    return dt;
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
    if (!isDef(options.selector)) {
        throw new Error('You need to specify a selector!');
    }
    if (isString(options.selector)) {
        self.selector = options.selector ? document.querySelector(options.selector) : options.selector;
    }
    else {
        self.selector = options.selector;
    }
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

function setMinDate(dt) {
    const min = date(dt);
    return toDate(min.setDate(min.getDate() - 1));
}
function setMaxDate(dt) {
    const max = date(dt);
    return toDate(max.setDate(max.getDate() + 1));
}

class HelloWeek {
    constructor(props) {
        this.todayDate = toDate(new Date());
        this.date = new Date();
        this.intervalRange = {};
        this.daysSelected = [];
        this.props = extend(extend({}, defaults), props);
        this.prevProps = extend(extend({}, defaults), props);
        const { calendar, selector } = template(this.props, {
            prev: {
                cb: () => this.prev()
            },
            next: {
                cb: () => this.next()
            }
        });
        this.selector = selector;
        this.calendar = calendar;
        this.isRTL = this.props.rtl ? margins.RIGHT : margins.LEFT;
        new Promise(function (resolve) { resolve(_interopNamespace(require(this.props.langFolder + this.props.lang + '.js'))); })
            .then((data) => data.default)
            .then((lang) => {
            this.langs = lang;
            this.willMount();
        });
    }
    destroy() {
        this.removeStatesClass();
        this.selector.remove();
    }
    prev(callback) {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();
        this.props.onNavigation();
        if (callback) {
            callback();
        }
    }
    next(callback) {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();
        this.props.onNavigation();
        if (callback) {
            callback();
        }
    }
    update() {
        this.clearCalendar();
        this.mount();
    }
    reset(props, callback) {
        this.clearCalendar();
        this.props = extend(this.prevProps, props);
        this.willMount(callback);
    }
    goToDate(date = this.todayDate) {
        this.date = new Date(date);
        this.date.setDate(1);
        this.update();
    }
    getDaySelected() {
        return this.daysSelected
            .sort((a, b) => formatDateToCompare(a) - formatDateToCompare(b))
            .map((day) => formatDate(day, this.langs, this.props.format));
    }
    getLastDaySelected() {
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
        this.props.multiplePick = state;
    }
    setDisablePastDays(state) {
        this.props.disablePastDays = state;
    }
    setTodayHighlight(state) {
        this.props.todayHighlight = state;
    }
    setRange(value) {
        if (isArray(this.props.range)) {
            this.intervalRange.begin = this.props.range[0];
            this.intervalRange.end = this.props.range[1];
        }
        else {
            this.props.range = value;
        }
    }
    setLocked(state) {
        this.props.locked = state;
    }
    setMinDate(date) {
        this.props.minDate = setMinDate(date);
    }
    setMaxDate(date) {
        this.props.maxDate = setMaxDate(date);
    }
    willMount(callback) {
        this.daysHighlight = this.props.daysHighlight ? this.props.daysHighlight : [];
        this.daysSelected = this.props.daysSelected ? this.props.daysSelected : [];
        if (this.daysSelected.length && !this.props.multiplePick) {
            throw new Error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option is FALSE!`);
        }
        if (this.props.defaultDate) {
            this.date = setTimeZone(this.props.defaultDate, this.props.timezoneOffset);
            this.defaultDate = setTimeZone(this.props.defaultDate, this.props.timezoneOffset);
            this.defaultDate.setDate(this.defaultDate.getDate());
        }
        this.date.setDate(1);
        if (this.props.minDate) {
            this.setMinDate(this.props.minDate);
        }
        if (this.props.maxDate) {
            this.setMaxDate(this.props.maxDate);
        }
        if (this.props.range) {
            this.setRange(this.props.range);
        }
        this.mount();
        this.props.onLoad();
        if (callback) {
            callback();
        }
    }
    selectDay(callback) {
        this.daysOfMonth = this.selector.querySelectorAll('.' + cssClasses.MONTH + ' .' + cssClasses.DAY);
        for (const i of Object.keys(this.daysOfMonth)) {
            this.handleClickInteraction(this.daysOfMonth[i], callback);
            if (this.props.range) {
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
            if (!this.props.range) {
                if (this.props.multiplePick) {
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
            if (this.props.range) {
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
            this.props.onSelect(this.days[index]);
            if (callback) {
                callback(this.days[index]);
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
        if (this.props.locked ||
            (this.props.disableDaysOfWeek && this.props.disableDaysOfWeek.includes(day)) ||
            (this.props.disablePastDays && isSameOrBefore(this.date, this.defaultDate)) ||
            (this.props.minDate && isSameOrAfter(this.props.minDate, dayOptions.date)) ||
            (this.props.maxDate && isSameOrBefore(this.props.maxDate, dayOptions.date))) {
            dayOptions.attributes.class.push(cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }
        if (this.props.disableDates) {
            this.disabledDays(dayOptions);
        }
        if (this.props.todayHighlight && isSame(this.todayDate, dayOptions.date)) {
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
            this.highlightDays(dayOptions);
        }
        if (dayOptions.day === 1) {
            if (this.props.weekStart === daysWeek.SUNDAY) {
                dayOptions.attributes.style[this.isRTL] = day * (100 / Object.keys(daysWeek).length) + '%';
            }
            else {
                if (day === daysWeek.SUNDAY) {
                    dayOptions.attributes.style[this.isRTL] =
                        (Object.keys(daysWeek).length - this.props.weekStart) * (100 / Object.keys(daysWeek).length) + '%';
                }
                else {
                    dayOptions.attributes.style[this.isRTL] = (day - 1) * (100 / Object.keys(daysWeek).length) + '%';
                }
            }
        }
        dayOptions.node = h('div', dayOptions.attributes, dayOptions.day.toString());
        dayOptions = this.props.beforeCreateDay(dayOptions);
        dayOptions.element = render(dayOptions.node, this.calendar.month);
        this.days[dayOptions.day] = dayOptions;
    }
    disabledDays(dayOptions) {
        if (isArray(this.props.disableDates[0])) {
            this.props.disableDates.map((date) => {
                if (isSameOrAfter(dayOptions.date, date[0]) && isSameOrBefore(dayOptions.date, date[1])) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
        else {
            this.props.disableDates.map((date) => {
                if (isSame(dayOptions.date, date)) {
                    dayOptions.attributes.class.push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
    }
    highlightDays(dayOptions) {
        for (const day in this.daysHighlight) {
            if (this.daysHighlight[day].days[0] instanceof Array) {
                this.daysHighlight[day].days.map((date) => {
                    if (isSameOrAfter(dayOptions.date, date[0]) && isSameOrBefore(dayOptions.date, date[1])) {
                        this.computedAttributes(day, dayOptions);
                    }
                });
            }
            else {
                this.daysHighlight[day].days.map((date) => {
                    if (isSame(dayOptions.date, date)) {
                        this.computedAttributes(day, dayOptions);
                    }
                });
            }
        }
    }
    computedAttributes(day, dayOptions) {
        const { attributes, days, ...rest } = this.daysHighlight[day];
        dayOptions = extend(dayOptions, rest);
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
        return this.props.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
    }
    weekAsString(weekIndex) {
        return this.props.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
    }
    mount() {
        if (this.calendar.period) {
            this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
        }
        const listDays = [];
        this.calendar.week.textContent = '';
        for (let i = this.props.weekStart; i < this.langs.daysShort.length; i++) {
            listDays.push(i);
        }
        for (let i = 0; i < this.props.weekStart; i++) {
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

exports.HelloWeek = HelloWeek$1;
exports.createElement = h;
exports.default = HelloWeek;
exports.el = h;
exports.render = render;
