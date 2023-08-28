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
    format = format.replace('mmm', langs.monthsShort[dt.getMonth()]);
    format = format.replace('MMM', langs.months[dt.getMonth()]);
    format = format.replace('mm', (dt.getMonth() + 1).toString());
    format = format.replace('MM', (dt.getMonth() + 1 > 9
        ? dt.getMonth() + 1
        : '0' + (dt.getMonth() + 1)).toString());
    format = format.replace('yyyy', dt.getFullYear().toString());
    format = format.replace('YYYY', dt.getFullYear().toString());
    format = format.replace('yy', dt.getFullYear().toString().substring(2));
    format = format.replace('YY', dt.getFullYear().toString().substring(2));
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
function isArray$1(obj) {
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
const DAYS_WEEK$1 = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

function isSameDay(day1, day2) {
    return (day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear());
}
function isDateAfter(date, dateToCompare) {
    return date.getTime() > dateToCompare.getTime();
}
function isDateBefore(date, dateToCompare) {
    return date.getTime() < dateToCompare.getTime();
}
function isSameMonthAndYear(source, target) {
    return (target &&
        source.getFullYear() === target.getFullYear() &&
        source.getMonth() === target.getMonth());
}
function isSameDate(source, target) {
    return (isSameMonthAndYear(source, target) &&
        source.getDate() === target.getDate());
}
function isToday(date) {
    const today = new Date();
    return isSameDate(today, date);
}
function isDateInRange(date, startDate, endDate) {
    return ((isSameDay(date, startDate) || isDateAfter(date, startDate)) &&
        (isSameDay(date, endDate) || isDateBefore(date, endDate)));
}

function isArray(obj) {
    return obj !== null && Array.isArray(obj);
}

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
const WEEK_LENGTH = WEEKDAYS.length;
const DAYS_WEEK = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

class Calendar {
    constructor(options) {
        this.days = [];
        const defaultOptions = Object.assign({
            lang: 'en-UK',
            defaultDate: new Date(),
            formatDate: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'short',
            },
            weekStart: 0,
            disabledPastDates: false,
            locked: false,
        }, options);
        this.options = defaultOptions;
        this.date = new Date(defaultOptions.defaultDate || '');
        this.date.setDate(1);
        this.today = new Date(new Date().setHours(0, 0, 0, 0));
        this.createMonth();
    }
    setOptions(options) {
        if (typeof options === 'function') {
            this.options = options(this.options);
        }
        else {
            this.options = options;
        }
        this.createMonth();
    }
    prevMonth() {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.createMonth();
    }
    nextMonth() {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.createMonth();
    }
    prevYear() {
        const prevYear = this.date.getFullYear() - 1;
        this.date.setFullYear(prevYear);
        this.createMonth();
    }
    nextYear() {
        const nextYear = this.date.getFullYear() + 1;
        this.date.setFullYear(nextYear);
        this.createMonth();
    }
    getWeekDays() {
        const { formatDate: format, lang, weekStart } = this.options;
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstOfMonth = new Date(year, month, 1);
        const firstDayOfWeek = firstOfMonth.getDay();
        const weeks = [[]];
        const orderedWeekday = WEEKDAYS.slice(weekStart).concat(WEEKDAYS.slice(0, weekStart));
        const orderedWeekdayIndex = orderedWeekday.indexOf(firstDayOfWeek);
        let currentWeek = weeks[0];
        let currentDate = firstOfMonth;
        for (let i = 0; i < orderedWeekdayIndex; i++) {
            currentWeek.push(null);
        }
        while (currentDate.getMonth() === month) {
            if (currentWeek.length === WEEK_LENGTH) {
                currentWeek = [];
                weeks.push(currentWeek);
            }
            currentWeek.push(currentDate.toLocaleDateString(lang, {
                weekday: format === null || format === void 0 ? void 0 : format.weekday,
            }));
            currentDate = new Date(year, month, currentDate.getDate() + 1);
        }
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        return weeks[1];
    }
    getDays() {
        return this.days;
    }
    getToday(options) {
        const { lang, formatDate } = this.options;
        const format = (options === null || options === void 0 ? void 0 : options.format) || formatDate;
        return this.today.toLocaleDateString(lang, Object.assign(Object.assign({}, format), { weekday: undefined }));
    }
    getMonth(options) {
        const { lang, formatDate } = this.options;
        const format = (options === null || options === void 0 ? void 0 : options.format) || (formatDate === null || formatDate === void 0 ? void 0 : formatDate.month);
        return this.date.toLocaleDateString(lang, { month: format });
    }
    getYear(options) {
        const { lang, formatDate } = this.options;
        const format = (options === null || options === void 0 ? void 0 : options.format) || (formatDate === null || formatDate === void 0 ? void 0 : formatDate.year);
        return this.date.toLocaleDateString(lang, { year: format });
    }
    createMonth() {
        this.days = [];
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
    }
    createDay(date) {
        const { lang, formatDate: format, selectedDates, highlightedToday, highlightedDates, maxDate, minDate, locked, disabledDaysOfWeek, disabledPastDates, disabledDates, } = this.options;
        const day = date.getDate();
        const weekday = date.getDay();
        const dayOptions = {
            date: new Date(date.setHours(0, 0, 0, 0)),
            dateObject: {
                day: date.toLocaleDateString(lang, { day: format === null || format === void 0 ? void 0 : format.day }),
                month: date.toLocaleDateString(lang, { month: format === null || format === void 0 ? void 0 : format.month }),
                year: date.toLocaleDateString(lang, { year: format === null || format === void 0 ? void 0 : format.year }),
                weekday: date.toLocaleDateString(lang, {
                    weekday: format === null || format === void 0 ? void 0 : format.weekday,
                }),
            },
            dateFormatted: date.toLocaleDateString(lang, {
                day: format === null || format === void 0 ? void 0 : format.day,
                month: format === null || format === void 0 ? void 0 : format.month,
                year: format === null || format === void 0 ? void 0 : format.year,
            }),
            details: {
                today: false,
                weekend: false,
                selected: false,
                highlighted: false,
                range: false,
                locked: false,
                disabled: false,
            },
        };
        if (isToday(date)) {
            dayOptions.details.today = true;
            if (highlightedToday) {
                dayOptions.details.highlighted = true;
            }
        }
        if (weekday === DAYS_WEEK.SUNDAY || weekday === DAYS_WEEK.SATURDAY) {
            dayOptions.details.weekend = true;
        }
        if (selectedDates &&
            selectedDates.some((day) => {
                if (isArray(day)) {
                    const [startDate, endDate] = day;
                    return isDateInRange(date, startDate, endDate);
                }
                else {
                    return isSameDay(day, date);
                }
            })) {
            dayOptions.details.selected = true;
            dayOptions.details.range = isArray(selectedDates[0]);
        }
        if (highlightedDates &&
            highlightedDates.some((day) => {
                if (isArray(day)) {
                    const [startDate, endDate] = day;
                    return isDateInRange(date, startDate, endDate);
                }
                else {
                    return isSameDay(day, date);
                }
            })) {
            dayOptions.details.highlighted = true;
        }
        if ((disabledDates &&
            disabledDates.some((day) => {
                if (isArray(day)) {
                    const [startDate, endDate] = day;
                    return isDateInRange(date, startDate, endDate);
                }
                else {
                    return isSameDay(day, date);
                }
            })) ||
            (disabledDaysOfWeek && disabledDaysOfWeek.includes(weekday)) ||
            (disabledPastDates && isDateBefore(date, this.today))) {
            dayOptions.details.disabled = true;
        }
        if (locked ||
            (minDate && isDateAfter(date, minDate)) ||
            (maxDate && isDateBefore(date, maxDate))) {
            dayOptions.details.locked = true;
        }
        this.days[day - 1] = dayOptions;
    }
}

function h(nodeName, attrs, ...children) {
    return { nodeName, attributes: attrs || {}, children };
}

const DOM_FORCE_UPDATE = 'forceUpdate';
function isEventProp(name) {
    return /^on/.test(name);
}
function extractEventName(name) {
    return name.slice(2).toLowerCase();
}
function isCustomProp(name) {
    return isEventProp(name) || name === DOM_FORCE_UPDATE;
}
function setBooleanProp(el, name, value) {
    if (value) {
        el.setAttribute(name, value.toString());
        Object.assign(el, { [name]: true });
    }
    else {
        Object.assign(el, { [name]: false });
    }
}
function removeBooleanProp(el, name) {
    el.removeAttribute(name);
    Object.assign(el, { [name]: false });
}
function setProp(el, name, value) {
    if (isCustomProp(name))
        return;
    if (name === 'className') {
        el.setAttribute('class', value.toString());
    }
    else if (name === 'style') {
        Object.assign(el.style, value);
    }
    else if (typeof value === 'boolean') {
        setBooleanProp(el, name, value);
    }
    else {
        el.setAttribute(name, value.toString());
    }
}
function removeProp(el, name, value) {
    if (isCustomProp(name))
        return;
    if (name === 'className') {
        el.removeAttribute('class');
    }
    else if (typeof value === 'boolean') {
        removeBooleanProp(el, name);
    }
    else {
        el.removeAttribute(name);
    }
}
function addEventListeners(el, props) {
    for (const name in props) {
        if (isEventProp(name)) {
            el.addEventListener(extractEventName(name), props[name]);
        }
    }
}
function createElement(tagName) {
    return document.createElement(tagName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}

function setProps(el, props) {
    for (const name in props) {
        setProp(el, name, props[name]);
    }
}
function renderNode(vnode) {
    let el;
    if (typeof vnode === 'string')
        return createTextNode(vnode);
    if (typeof vnode.nodeName === 'string') {
        el = createElement(vnode.nodeName);
        setProps(el, vnode.attributes);
        console.log('addEventListeners');
        addEventListeners(el, vnode.attributes);
    }
    if (typeof vnode.nodeName === 'function') {
        const component = new vnode.nodeName(vnode.attributes);
        el = renderNode(component.render(component.props, component.state));
        component.base = el;
    }
    (vnode.children || []).forEach((child) => {
        el.appendChild(renderNode(child));
    });
    return el;
}
function diff(dom, vnode) {
    if (typeof vnode === 'string') {
        dom.nodeValue = vnode;
        return dom;
    }
    if (typeof vnode.nodeName === 'function') {
        const component = new vnode.nodeName(vnode.attributes);
        const rendered = component.render(component.props, component.state);
        diff(dom, rendered);
        return dom;
    }
    if (vnode.children.length > dom.childNodes.length) {
        console.log('ADD');
        dom.appendChild(renderNode(vnode.children[vnode.children.length - 1]));
    }
    if (vnode.children.length < dom.childNodes.length) {
        console.log('UNMOUNT', vnode.children.length, dom.childNodes.length);
        dom.children[dom.children.length - 1].parentElement.replaceChildren();
        vnode.children.forEach((child) => dom.appendChild(renderNode(child)));
        console.log('UNMOUNT', dom.childNodes);
    }
    if (vnode.children.length === dom.childNodes.length) {
        const newProps = vnode.attributes;
        const oldProps = dom.attributes;
        const props = Object.assign({}, newProps, oldProps);
        for (const name in props) {
            if (!newProps[name]) {
                removeProp(dom, name, oldProps[name]);
            }
            else if (!oldProps[name] || newProps[name] !== oldProps[name]) {
                setProp(dom, name, newProps[name]);
            }
        }
    }
    dom.childNodes.forEach((child, i) => diff(child, vnode.children[i]));
    return dom;
}
function mount(vnode, parent) {
    const newDom = renderNode(vnode);
    parent.appendChild(newDom);
    return newDom;
}

function updateComponent(component) {
    const rendered = component.render(component.props, component.state);
    component.base = diff(component.base, rendered);
}
class Component {
    constructor(props) {
        this.props = props;
        this.state = null;
    }
    setState(state) {
        if (typeof state === "function") {
            this.state = state(this.state);
        }
        else {
            this.state = state;
        }
        updateComponent(this);
    }
    render(props, state) {
        const attributes = Object.assign(Object.assign({}, props), state);
        return h(this, attributes);
    }
}

const classNames = (...classes) => classes.filter(Boolean).join(' ');

class Day extends Component {
    constructor(props) {
        super(props);
    }
    render({ day, onClick }) {
        return h('div', {
            onClick: () => {
                if (onClick)
                    onClick(day);
            },
            className: classNames('day', day.details.disabled && 'is-disabled', day.details.highlighted && 'is-highlighted', day.details.locked && 'is-locked', day.details.range && 'is-range', day.details.selected && 'is-selected', day.details.today && 'is-today', day.details.weekend && 'is-weekend'),
            style: day.date.getDate() === 1 && {
                marginLeft: `${day.date.getDay() * (100 / 7)}%`,
            },
        }, day.date.getDate().toString());
    }
}

class Navigation extends Component {
    constructor(props) {
        super(props);
        Navigation.cssClases = {
            ROOT: "navigation",
        };
    }
    render({ month, year, onPrevMonth, onNextMonth }) {
        return h('div', { className: Navigation.cssClases.ROOT }, h('div', {
            className: 'prev',
            onClick: () => {
                if (onPrevMonth)
                    onPrevMonth();
            },
        }, '◀'), h('div', { className: 'period' }, `${month} ${year}`), h('div', {
            className: 'next',
            onClick: () => {
                if (onNextMonth)
                    onNextMonth();
            },
        }, '▶'));
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.calendar = new Calendar({
            lang: props.lang,
            defaultDate: new Date("2023-09-10"),
            formatDate: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'narrow',
            },
            weekStart: 0,
            selectedDates: [new Date('2023-07-01'), new Date('2023-07-10')],
            highlightedDates: [
                new Date('2023-07-10'),
                new Date('2023-07-15'),
                new Date(),
            ],
            disabledPastDates: false,
            disabledDates: [[new Date('2023-07-15'), new Date('2023-07-20')]],
            minDate: undefined,
            maxDate: undefined,
        });
        this.state = {
            month: this.getMonth(),
            year: this.getYear(),
            weekDays: this.calendar.getWeekDays(),
            days: this.calendar.getDays(),
            selectedDates: this.calendar
                .getDays()
                .map((day) => day.details.selected && day.date)
                .filter(Boolean),
        };
    }
    getMonth() {
        return this.calendar.getMonth({ format: 'long' });
    }
    getYear() {
        return this.calendar.getYear();
    }
    update() {
        this.setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { month: this.getMonth(), year: this.getYear(), days: this.calendar.getDays() });
        });
    }
    onHandleDayClick(day) {
        console.log('Day', day);
        this.setState((prevState) => {
            return Object.assign(Object.assign({}, prevState), { days: prevState.days.map((dayOptions) => {
                    if (isSameDay(day.date, dayOptions.date)) {
                        return Object.assign(Object.assign({}, day), { details: Object.assign(Object.assign({}, dayOptions.details), { selected: !dayOptions.details.selected }) });
                    }
                    return dayOptions;
                }) });
        });
    }
    render({ onNavigate }, { month, year, weekDays, days }) {
        console.log("days", days);
        return h('div', {
            className: 'hello-week',
        }, h(Navigation, {
            month,
            year,
            onPrevMonth: () => {
                this.calendar.prevMonth();
                this.update();
                if (onNavigate)
                    onNavigate();
            },
            onNextMonth: () => {
                this.calendar.nextMonth();
                this.update();
                if (onNavigate)
                    onNavigate();
            },
        }), h('div', { className: 'week' }, ...weekDays.map((day) => h('div', {
            onClick: () => { },
            className: 'day',
        }, day))), h('div', { className: 'month' }, ...days.map((day) => h(Day, {
            day,
            onClick: (day) => this.onHandleDayClick(day),
        }))));
    }
}
class HelloWeekNext {
    constructor({ selector, defaultDate, onNavigate }) {
        const Root = h(App, { selector, defaultDate, onNavigate });
        mount(Root, document.querySelector(selector));
    }
}

class HelloWeek {
    static get daysWeek() {
        return DAYS_WEEK$1;
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
        new HelloWeekNext({ selector: '#root', lang: 'en-UK' });
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
        if (isArray$1(this.options.disableDates[0])) {
            this.options.disableDates.forEach((date) => {
                if (dayOptions.timestamp >= setToTimestamp(date[0]) &&
                    dayOptions.timestamp <= setToTimestamp(date[1])) {
                    addClass(newDay, this.cssClasses.isDisabled);
                    dayOptions.locked = true;
                }
            });
            return;
        }
        if (isArray$1(this.options.disableDates)) {
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
            if (isArray$1(day.days[0])) {
                day.days.forEach((date) => {
                    if (dayOptions.timestamp >= setToTimestamp(date[0]) &&
                        dayOptions.timestamp <= setToTimestamp(date[1])) {
                        this.setStyleDayHighlight(newDay, +index, dayOptions);
                    }
                });
                return;
            }
            if (isArray$1(day.days)) {
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
