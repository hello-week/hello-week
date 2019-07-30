/* @enum {string} */
const cssClasses = {
    CALENDAR: "hello-week",
    DAY: "day",
    MONTH: "month",
    NAVIGATION: "navigation",
    NEXT: "next",
    PERIOD: "period",
    PREV: "prev",
    RTL: "rtl",
    WEEK: "week",
};
/* @enum {string} */
const cssStates = {
    IS_BEGIN_RANGE: "is-begin-range",
    IS_DISABLED: "is-disabled",
    IS_END_RANGE: "is-end-range",
    IS_HIGHLIGHT: "is-highlight",
    IS_SELECTED: "is-selected",
    IS_TODAY: "is-today",
    IS_WEEKEND: "is-weekend",
};
/* @enum {string} */
const daysWeek = {
    FRIDAY: 5,
    MONDAY: 1,
    SATURDAY: 6,
    SUNDAY: 0,
    THURSDAY: 4,
    TUESDAY: 2,
    WEDNESDAY: 3,
};

function error(msg) {
    throw new Error(`[Hello Week Error]: ${msg}`);
}

function getIndexForEventTarget(daysOfMonth, target) {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}
function extend(to, from) {
    if (typeof Object.assign === "function") {
        return Object.assign(from, to);
    }
    for (const key in from) {
        to[key] = from[key];
    }
    return to;
}
function isDef(v) {
    return v !== undefined && v !== null;
}
function isString(val) {
    return typeof val === "string";
}

const config = {
    daysHighlight: null,
    daysSelected: null,
    defaultDate: null,
    disableDates: null,
    disableDaysOfWeek: null,
    disablePastDays: false,
    format: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "UTC"
    },
    lang: "en",
    locked: false,
    maxDate: null,
    minDate: null,
    monthShort: false,
    multiplePick: false,
    nav: ["◀", "▶"],
    range: false,
    rtl: false,
    selector: ".hello-week",
    todayHighlight: true,
    weekShort: true,
    weekStart: 0,
    onLoad: () => {
        /** callback function */
    },
    onClear: () => {
        /** callback function */
    },
    onNavigation: () => {
        /** callback function */
    },
    onSelect: () => {
        /** callback function */
    }
};

function formatDate(day, month, year) {
    return `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + day).slice(-2)}`;
}
/**
 * Set date timestamp to human format.
 *
 * @param      {number}  timestamp
 * @param      {string}  format
 * @return     {string}
 */
function timestampToHuman(timestamp, lang, format) {
    const dt = new Date(timestamp);
    return new Intl.DateTimeFormat(lang ? lang : config.lang, format ? format : config.format).format(dt);
}
/**
 * Set date human format to timestamp.
 *
 * @param      {string}
 * @return     {number}
 */
function humanToTimestamp(date) {
    if (date && (!isNaN(Number(date)) || date.split("-").length !== 3)) {
        throw new Error(`The date ${date} is not valid!`);
    }
    if (date || typeof date === "string") {
        return new Date(date + "T00:00:00Z").getTime();
    }
    return new Date().setHours(0, 0, 0, 0);
}

function render(vnode, parentDom) {
    // Strings just convert to #text Nodes:
    if (vnode.split) {
        return document.createTextNode(vnode);
    }
    // create a DOM element with the nodeName of our VDOM element:
    const n = document.createElement(vnode.nodeName);
    // copy attributes onto the new node:
    const a = vnode.attributes || {};
    Object.keys(a).forEach(k => n.setAttribute(k, a[k]));
    // render (build) and then append child nodes:
    (vnode.children || []).forEach((c) => n.appendChild(render(c)));
    return parentDom ? parentDom.appendChild(n) : n;
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

function template(selector, options) {
    const calendar = {};
    calendar.navigation = render(h("div", { class: cssClasses.NAVIGATION }), selector);
    if (isDef(options.prev)) {
        calendar.prevMonth = render(h("div", { class: cssClasses.PREV }, options.prev), calendar.navigation);
    }
    calendar.period = render(h("div", { class: cssClasses.PERIOD }), calendar.navigation);
    if (isDef(options.next)) {
        calendar.nextMonth = render(h("div", { class: cssClasses.NEXT }, options.next), calendar.navigation);
    }
    calendar.week = render(h("div", { class: cssClasses.WEEK }), selector);
    calendar.month = render(h("div", { class: cssClasses.MONTH }), selector);
    return calendar;
}
function createElement(nodeName, attributes, children, parentDom) {
    return render(h(nodeName, attributes, children), parentDom);
}

function setAttr(el, name, value) {
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

function diff(start, end) {
    const dates = [];
    let currentDate = start;
    const addDays = (days) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.getTime();
    };
    while (currentDate <= end) {
        dates.push(timestampToHuman(currentDate));
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}

class HelloWeek {
    constructor(options = {}) {
        this.calendar = {};
        this.daysSelected = [];
        this.intervalRange = {};
        this.lastSelectedDay = 0;
        this.options = extend(options, config);
        this.initOptions = extend(options, config);
        this.selector = isString(this.options.selector)
            ? document.querySelector(this.options.selector)
            : this.options.selector;
        if (!isDef(this.selector)) {
            error("You need to specify a selector!");
        }
        if (this.options.selector !== cssClasses.CALENDAR) {
            addClass(this.selector, cssClasses.CALENDAR);
        }
        this.calendar = template(this.selector, {
            prev: this.options.nav[0],
            next: this.options.nav[1]
        });
        if (this.calendar.prevMonth && this.calendar.nextMonth) {
            this.calendar.prevMonth.addEventListener("click", () => this.prev());
            this.calendar.nextMonth.addEventListener("click", () => this.next());
        }
        if (this.options.rtl) {
            addClass(this.calendar.week, cssClasses.RTL);
            addClass(this.calendar.month, cssClasses.RTL);
        }
        this.readFile("langs/" + this.options.lang + ".json", (text) => {
            this.langs = JSON.parse(text);
            this.init();
        });
    }
    readFile(file, callback) {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", file, true);
        xobj.onreadystatechange = () => {
            if (xobj.readyState === 4 && xobj.status === 200) {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    /**
     * Destroy the calendar and remove the instance from the target element.
     */
    destroy() {
        this.removeStatesClass();
        this.selector.remove();
    }
    /**
     * Change the month to the previous, also you can send a callback function like a parameter.
     * @param {() => void} callback
     */
    prev(callback) {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();
        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    }
    /**
     * Change the month to the next, also you can send a callback function like a parameter.
     * @param {() => void} callback
     */
    next(callback) {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();
        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    }
    /**
     * Update and redraws the events for the current month.
     * @public
     */
    update() {
        this.clearCalendar();
        this.mounted();
    }
    /**
     * Reset calendar
     * @public
     */
    reset(options = {}, callback) {
        this.clearCalendar();
        this.options = extend(options, this.initOptions);
        this.init(callback);
    }
    /**
     * Move the calendar to current day.
     * @public
     */
    goToday() {
        this.date = this.todayDate;
        this.date.setDate(1);
        this.update();
    }
    /**
     * Move the calendar to arbitrary day.
     * @param {any} date
     * @public
     */
    goToDate(date = this.todayDate) {
        this.date = new Date(date);
        this.date.setDate(1);
        this.update();
    }
    /**
     * Returns the selected days with the format specified.
     * @return {any}
     */
    getDays() {
        return this.daysSelected.map((day) => timestampToHuman(day, this.options.format, this.langs));
    }
    /**
     * Gets the day selected.
     * @return {number}
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
     * @param {boolean} state
     */
    setRange(state) {
        this.options.range = state;
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
        this.options.minDate = new Date(date);
        this.options.minDate.setHours(0, 0, 0, 0);
        this.options.minDate.setDate(this.options.minDate.getDate() - 1);
    }
    /**
     * Set max date.
     * @param {string} date
     */
    setMaxDate(date) {
        this.options.maxDate = new Date(date);
        this.options.maxDate.setHours(0, 0, 0, 0);
        this.options.maxDate.setDate(this.options.maxDate.getDate() + 1);
    }
    /**
     * @param {() => void} callback
     */
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
        this.todayDate = humanToTimestamp();
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
    /**
     * Select day
     * @param {() => void} callback
     */
    selectDay(callback) {
        this.daysOfMonth = this.selector.querySelectorAll("." + cssClasses.MONTH + " ." + cssClasses.DAY);
        for (const i of Object.keys(this.daysOfMonth)) {
            this.handleClickInteraction(this.daysOfMonth[i], callback);
            if (this.options.range) {
                this.handleMouseInteraction(this.daysOfMonth[i]);
            }
        }
    }
    /**
     * Gets the interval of dates.
     * @param      {number}  startDate
     * @param      {number}  endDate
     */
    getIntervalOfDates(startDate, endDate) {
        const dates = [];
        let currentDate = startDate;
        const addDays = (days) => {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date.getTime();
        };
        while (currentDate <= endDate) {
            dates.push(timestampToHuman(currentDate));
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    }
    /**
     * @param {HTMLElement} target
     * @param {() => void} callback
     */
    handleClickInteraction(target, callback) {
        target.addEventListener("click", (event) => {
            const index = getIndexForEventTarget(this.daysOfMonth, event.target);
            if (this.days[index].locked) {
                return;
            }
            this.lastSelectedDay = this.days[index].timestamp;
            if (!this.options.range) {
                if (this.options.multiplePick) {
                    if (this.days[index].timestamp) {
                        this.daysSelected = this.daysSelected.filter((day) => humanToTimestamp(day) !== this.lastSelectedDay);
                    }
                    if (!this.days[index].isSelected) {
                        this.daysSelected.push(timestampToHuman(this.lastSelectedDay));
                    }
                }
                else {
                    if (!this.days[index].locked) {
                        this.removeStatesClass();
                    }
                    this.daysSelected = [];
                    this.daysSelected.push(timestampToHuman(this.lastSelectedDay));
                }
            }
            toggleClass(event.target, cssStates.IS_SELECTED);
            this.days[index].isSelected = !this.days[index].isSelected;
            if (this.options.range) {
                if (this.intervalRange.begin && this.intervalRange.end) {
                    this.intervalRange.begin = undefined;
                    this.intervalRange.end = undefined;
                    this.removeStatesClass();
                }
                if (this.intervalRange.begin && !this.intervalRange.end) {
                    this.intervalRange.end = this.days[index].timestamp;
                    this.daysSelected = diff(this.intervalRange.begin, this.intervalRange.end);
                    addClass(event.target, cssStates.IS_END_RANGE);
                    if (this.intervalRange.begin > this.intervalRange.end) {
                        this.intervalRange.begin = undefined;
                        this.intervalRange.end = undefined;
                        this.removeStatesClass();
                    }
                }
                if (!this.intervalRange.begin) {
                    this.intervalRange.begin = this.days[index].timestamp;
                }
                addClass(event.target, cssStates.IS_SELECTED);
            }
            this.options.onSelect.call(this);
            if (callback) {
                callback.call(this);
            }
        });
    }
    /**
     * @param {HTMLElement} target
     */
    handleMouseInteraction(target) {
        target.addEventListener("mouseover", (event) => {
            const index = getIndexForEventTarget(this.daysOfMonth, event.target);
            if (!this.intervalRange.begin ||
                (this.intervalRange.begin && this.intervalRange.end)) {
                return;
            }
            this.removeStatesClass();
            for (let i = 1; i <= Object.keys(this.days).length; i++) {
                this.days[i].isSelected = false;
                if (this.days[index].timestamp >= this.intervalRange.begin) {
                    if (this.days[i].locked) {
                        return;
                    }
                    if (this.days[i].timestamp >= this.intervalRange.begin &&
                        this.days[i].timestamp <= this.days[index].timestamp) {
                        this.days[i].isSelected = true;
                        addClass(this.days[i].element, cssStates.IS_SELECTED);
                        if (this.days[i].timestamp === this.intervalRange.begin) {
                            addClass(this.days[i].element, cssStates.IS_BEGIN_RANGE);
                        }
                    }
                }
            }
        });
    }
    /**
     * @param      {string}  dayShort
     */
    creatWeek(dayShort) {
        createElement("span", { class: cssClasses.DAY }, dayShort, this.calendar.week);
    }
    createMonth() {
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
        this.selectDay(() => {
            /** callback function */
        });
    }
    /**
     * Create days inside hello-week
     * @param {Date} date
     */
    createDay(date) {
        const num = date.getDate();
        const day = date.getDay();
        const dayOptions = {
            day: num,
            timestamp: humanToTimestamp(formatDate(date.getDate(), date.getMonth(), date.getFullYear())),
            isWeekend: false,
            locked: false,
            isToday: false,
            isSelected: false,
            isHighlight: false,
            element: undefined
        };
        this.days = this.days || {};
        const newDay = createElement("div", { class: cssClasses.DAY }, String(dayOptions.day), this.calendar.month);
        if (dayOptions.day === 1) {
            if (this.options.weekStart === daysWeek.SUNDAY) {
                setStyle(newDay, this.options.rtl ? "margin-right" : "margin-left", day * (100 / Object.keys(daysWeek).length) + "%");
            }
            else {
                if (day === daysWeek.SUNDAY) {
                    setStyle(newDay, this.options.rtl ? "margin-right" : "margin-left", (Object.keys(daysWeek).length -
                        this.options.weekStart) *
                        (100 / Object.keys(daysWeek).length) +
                        "%");
                }
                else {
                    setStyle(newDay, this.options.rtl ? "margin-right" : "margin-left", (day - 1) * (100 / Object.keys(daysWeek).length) + "%");
                }
            }
        }
        if (day === daysWeek.SUNDAY || day === daysWeek.SATURDAY) {
            addClass(newDay, cssStates.IS_WEEKEND);
            dayOptions.isWeekend = true;
        }
        if (this.options.locked ||
            (this.options.disableDaysOfWeek &&
                this.options.disableDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays &&
                +this.date.setHours(0, 0, 0, 0) <=
                    +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
            (this.options.minDate &&
                +this.options.minDate >= dayOptions.timestamp) ||
            (this.options.maxDate &&
                +this.options.maxDate <= dayOptions.timestamp)) {
            addClass(newDay, cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }
        if (this.options.disableDates) {
            this.setDaysDisable(newDay, dayOptions);
        }
        if (this.todayDate === dayOptions.timestamp &&
            this.options.todayHighlight) {
            addClass(newDay, cssStates.IS_TODAY);
            dayOptions.isToday = true;
        }
        this.daysSelected.find((daySelected) => {
            if (daySelected === dayOptions.timestamp ||
                humanToTimestamp(daySelected.toString()) ===
                    dayOptions.timestamp) {
                addClass(newDay, cssStates.IS_SELECTED);
                dayOptions.isSelected = true;
            }
        });
        if (dayOptions.timestamp === this.intervalRange.begin) {
            addClass(newDay, cssStates.IS_BEGIN_RANGE);
        }
        if (dayOptions.timestamp === this.intervalRange.end) {
            addClass(newDay, cssStates.IS_END_RANGE);
        }
        if (this.daysHighlight) {
            this.setDayHighlight(newDay, dayOptions);
        }
        dayOptions.element = newDay;
        this.days[dayOptions.day] = dayOptions;
    }
    /**
     * Sets the days disable.
     * @param      {HTMLElement}  newDay
     * @param      {any}  dayOptions
     */
    setDaysDisable(newDay, dayOptions) {
        if (this.options.disableDates[0] instanceof Array) {
            this.options.disableDates.map((date) => {
                if (dayOptions.timestamp >= humanToTimestamp(date[0]) &&
                    dayOptions.timestamp <= humanToTimestamp(date[1])) {
                    addClass(newDay, cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
        else {
            this.options.disableDates.map((date) => {
                if (dayOptions.timestamp === humanToTimestamp(date)) {
                    addClass(newDay, cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
    }
    /**
     * Set day highlight.
     * @param      {HTMLElement}  newDay
     * @param      {any}  dayOptions
     */
    setDayHighlight(newDay, dayOptions) {
        for (const key in this.daysHighlight) {
            if (this.daysHighlight[key].days[0] instanceof Array) {
                this.daysHighlight[key].days.map((date, index) => {
                    if (dayOptions.timestamp >= humanToTimestamp(date[0]) &&
                        dayOptions.timestamp <= humanToTimestamp(date[1])) {
                        this.setStyleDayHighlight(newDay, key, dayOptions);
                    }
                });
            }
            else {
                this.daysHighlight[key].days.map((date) => {
                    if (dayOptions.timestamp === humanToTimestamp(date)) {
                        this.setStyleDayHighlight(newDay, key, dayOptions);
                    }
                });
            }
        }
    }
    /**
     * Sets styles for days highlight.
     * @param      {HTMLElement}  newDay
     * @param      {any}  key
     * @param      {any}  dayOptions
     */
    setStyleDayHighlight(newDay, key, dayOptions) {
        addClass(newDay, cssStates.IS_HIGHLIGHT);
        if (this.daysHighlight[key].title) {
            dayOptions.tile = this.daysHighlight[key].title;
            setAttr(newDay, "data-title", this.daysHighlight[key].title);
        }
        if (this.daysHighlight[key].color) {
            setStyle(newDay, "color", this.daysHighlight[key].color);
        }
        if (this.daysHighlight[key].backgroundColor) {
            setStyle(newDay, "background-color", this.daysHighlight[key].backgroundColor);
        }
        dayOptions.isHighlight = true;
    }
    /**
     * @param      {number}  monthIndex
     * @return     {object}
     */
    monthsAsString(monthIndex) {
        return this.options.monthShort
            ? this.langs.monthsShort[monthIndex]
            : this.langs.months[monthIndex];
    }
    /**
     * @param      {number}  weekIndex
     * @return     {object}
     */
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
                    " " +
                    this.date.getFullYear();
        }
        /** define week format */
        this.calendar.week.textContent = "";
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
    /**
     * Clean calendar.
     */
    clearCalendar() {
        this.calendar.month.textContent = "";
    }
    /**
     * Removes all selected classes.
     */
    removeStatesClass() {
        for (const i of Object.keys(this.daysOfMonth)) {
            removeClass(this.daysOfMonth[i], cssStates.IS_SELECTED);
            removeClass(this.daysOfMonth[i], cssStates.IS_BEGIN_RANGE);
            removeClass(this.daysOfMonth[i], cssStates.IS_END_RANGE);
            this.days[+i + 1].isSelected = false;
        }
    }
}

export { HelloWeek };
