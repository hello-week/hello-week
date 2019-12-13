/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var cssClasses = {
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
var cssStates = {
    IS_BEGIN_RANGE: 'is-begin-range',
    IS_DISABLED: 'is-disabled',
    IS_END_RANGE: 'is-end-range',
    IS_HIGHLIGHT: 'is-highlight',
    IS_SELECTED: 'is-selected',
    IS_RANGE: 'is-range',
    IS_TODAY: 'is-today',
    IS_WEEKEND: 'is-weekend'
};
var daysWeek = {
    FRIDAY: 5,
    MONDAY: 1,
    SATURDAY: 6,
    SUNDAY: 0,
    THURSDAY: 4,
    TUESDAY: 2,
    WEDNESDAY: 3
};

var defaults = {
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
    onLoad: function () {
        /** callback */
    },
    onClear: function () {
        /** callback */
    },
    onNavigation: function () {
        /** callback */
    },
    onSelect: function () {
        /** callback */
    }
};

function error() {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    throw new Error("[Hello Week Error]: " + msg);
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
    var node = document.createElement(vnode.nodeName);
    // copy attributes onto the new node:
    var attributes = vnode.attributes || {};
    Object.keys(attributes).forEach(function (key) {
        if (key === 'class') {
            if (isString(attributes[key])) {
                node.className = attributes[key];
            }
            else if (isArray(attributes[key])) {
                attributes[key].forEach(function (value) {
                    addClass(node, value);
                });
            }
        }
        else if (key === 'style') {
            if (isString(attributes[key])) {
                node.style = attributes[key];
            }
            else if (isObject(attributes[key])) {
                Object.keys(attributes[key]).forEach(function (props) {
                    node.style.setProperty(props, attributes[key][props]);
                });
            }
        }
    });
    // render (build) and then append child nodes:
    (vnode.children || []).forEach(function (c) { return node.appendChild(render(c)); });
    return parentDom ? parentDom.appendChild(node) : node;
}
function h(nodeName, attributes) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var vnode = { nodeName: nodeName };
    if (attributes) {
        vnode.attributes = attributes;
    }
    if (args.length) {
        vnode.children = [].concat.apply([], args);
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
    return isDef(where) ? where.querySelector("." + className) : document.querySelector("." + className);
}

function extend(to, from) {
    return Object.assign(to, from);
}

function readFile(file, callback) {
    fetch(file)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        callback(data);
    });
}
function checkUrl(str) {
    var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return regexp.test(str);
}

function getIndexForEventTarget(daysOfMonth, target) {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

function isBetween(to, from, date) {
    return (date > to) && (date < from);
}

function template(options, args) {
    var self = {};
    if (!isString(options.selector) && !isDef(options.selector)) {
        error('You need to specify a selector!');
    }
    self.selector = options.selector ? document.querySelector(options.selector) : options.selector;
    if (!isDef(self.selector)) {
        self.selector = render(h('div', { "class": options.selector + " " + cssClasses.CALENDAR }));
    }
    else {
        if (options.selector !== cssClasses.CALENDAR) {
            addClass(self.selector, cssClasses.CALENDAR);
        }
    }
    self.calendar = {};
    self.calendar.navigation = existElement(cssClasses.NAVIGATION, self.selector);
    if (!isDef(self.calendar.navigation)) {
        self.calendar.navigation = render(h('div', { "class": cssClasses.NAVIGATION }), self.selector);
    }
    if (isDef(options.nav[0])) {
        self.calendar.prevMonth = render(h('div', { "class": cssClasses.PREV }, options.nav[0]), self.calendar.navigation);
        self.calendar.prevMonth.addEventListener('click', function () { return args.prev.cb(); });
    }
    self.calendar.period = existElement(cssClasses.PERIOD, self.selector);
    if (!isDef(self.calendar.period)) {
        self.calendar.period = render(h('div', { "class": cssClasses.PERIOD }), self.calendar.navigation);
    }
    if (isDef(options.nav[1])) {
        self.calendar.nextMonth = render(h('div', { "class": cssClasses.NEXT }, options.nav[1]), self.calendar.navigation);
        self.calendar.nextMonth.addEventListener('click', function () { return args.next.cb(); });
    }
    self.calendar.week = existElement(cssClasses.WEEK, self.selector);
    if (!isDef(self.calendar.week)) {
        self.calendar.week = render(h('div', { "class": cssClasses.WEEK }), self.selector);
    }
    self.calendar.month = existElement(cssClasses.MONTH, self.selector);
    if (!isDef(self.calendar.month)) {
        self.calendar.month = render(h('div', { "class": cssClasses.MONTH }), self.selector);
    }
    if (options.rtl) {
        addClass(self.calendar.week, cssClasses.RTL);
        addClass(self.calendar.month, cssClasses.RTL);
    }
    return self;
}

function format(day, month, year) {
    return year + "-" + ('0' + (month + 1)).slice(-2) + "-" + ('0' + day).slice(-2);
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
    var min = date(dt);
    min.setHours(0, 0, 0, 0);
    return min.setDate(min.getDate() - 1);
}
/**
 * Set max date.
 * @param {string} date
 */
function setMaxDate(dt) {
    var max = date(dt);
    max.setHours(0, 0, 0, 0);
    return max.setDate(max.getDate() + 1);
}

/**
 * Set date timestamp to human format.
 *
 * @param      {number}  timestamp
 * @param      {string}  format
 * @return     {string}
 */
function timestampToHuman(timestamp, langs, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    var dt = new Date(timestamp);
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
        throw new Error("The date " + date + " is not valid!");
    }
    if (date || typeof date === 'string') {
        return new Date(date + 'T00:00:00Z').getTime();
    }
    return new Date().setHours(0, 0, 0, 0);
}
function setToTimestamp(date) {
    if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
        throw new Error("The date " + date + " is not valid!");
    }
    if (date || typeof date === 'string') {
        return new Date(date + 'T00:00:00Z').getTime();
    }
    return new Date().setHours(0, 0, 0, 0);
}

var HelloWeek = /** @class */ (function () {
    function HelloWeek(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.calendar = {};
        this.intervalRange = {};
        this.daysSelected = [];
        this.options = extend(extend({}, defaults), options);
        this.defaultsOptions = extend(extend({}, defaults), options);
        var calendar = template(this.options, {
            prev: {
                cb: function () { return _this.prev(); }
            },
            next: {
                cb: function () { return _this.next(); }
            }
        });
        this.selector = calendar.selector;
        this.calendar = calendar.calendar;
        if (checkUrl(this.options.langFolder)) {
            readFile(this.options.langFolder, function (text) {
                _this.langs = text;
                _this.init(function () {
                    /** callback function */
                });
            });
        }
        else {
            readFile(this.options.langFolder + this.options.lang + '.json', function (text) {
                _this.langs = text;
                _this.init(function () {
                    /** callback function */
                });
            });
        }
    }
    HelloWeek.prototype.destroy = function () {
        this.removeStatesClass();
        this.selector.remove();
    };
    /**
     * Change the month to the previous, also you can send a callback function like a parameter.
     */
    HelloWeek.prototype.prev = function (callback) {
        var prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();
        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    };
    /**
     * Change the month to the next, also you can send a callback function like a parameter.
     */
    HelloWeek.prototype.next = function (callback) {
        var nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();
        this.options.onNavigation.call(this);
        if (callback) {
            callback.call(this);
        }
    };
    /**
     * Update and redraws the events for the current month.
     */
    HelloWeek.prototype.update = function () {
        this.clearCalendar();
        this.mounted();
    };
    /**
     * Reset calendar
     */
    HelloWeek.prototype.reset = function (options, callback) {
        if (options === void 0) { options = {}; }
        this.clearCalendar();
        this.options = extend(options, this.defaultsOptions);
        this.init(callback);
    };
    /**
     * Move the calendar to arbitrary day.
     * @param {any} date
     */
    HelloWeek.prototype.goToDate = function (date) {
        if (date === void 0) { date = this.todayDate; }
        this.date = new Date(date);
        this.date.setDate(1);
        this.update();
    };
    /**
     * Returns the selected days with the format specified.
     * @return {any}
     */
    HelloWeek.prototype.getDays = function () {
        var _this = this;
        return this.daysSelected.map(function (day) { return timestampToHuman(day, _this.langs, _this.options.format); });
    };
    /**
     * Gets the day selected.
     * @return {number}
     */
    HelloWeek.prototype.getDaySelected = function () {
        return this.lastSelectedDay;
    };
    /**
     * Returns the highlight dates.
     * @return {object}
     */
    HelloWeek.prototype.getDaysHighlight = function () {
        return this.daysHighlight;
    };
    /**
     * Returns the current month selected.
     * @return {string}
     */
    HelloWeek.prototype.getMonth = function () {
        return this.date.getMonth() + 1;
    };
    /**
     * Returns the current year selected.
     * @return {string}
     */
    HelloWeek.prototype.getYear = function () {
        return this.date.getFullYear();
    };
    /**
     * Set highlight dates,
     */
    HelloWeek.prototype.setDaysHighlight = function (daysHighlight) {
        this.daysHighlight = __spreadArrays(this.daysHighlight, daysHighlight);
    };
    /**
     * Sets calendar with multiple pick.
     * @param {boolean} state
     */
    HelloWeek.prototype.setMultiplePick = function (state) {
        this.options.multiplePick = state;
    };
    /**
     * Sets calendar with disable past days.
     * @param {boolean} state
     */
    HelloWeek.prototype.setDisablePastDays = function (state) {
        this.options.disablePastDays = state;
    };
    /**
     * Sets calendar with today highlight.
     * @param {boolean} state
     */
    HelloWeek.prototype.setTodayHighlight = function (state) {
        this.options.todayHighlight = state;
    };
    /**
     * Sets calendar range.
     */
    HelloWeek.prototype.setRange = function (value) {
        if (isArray(this.options.range)) {
            this.intervalRange.begin = humanToTimestamp(this.options.range[0]);
            this.intervalRange.end = humanToTimestamp(this.options.range[1]);
        }
        else {
            this.options.range = value;
        }
    };
    /**
     * Sets calendar locked.
     * @param {boolean} state
     */
    HelloWeek.prototype.setLocked = function (state) {
        this.options.locked = state;
    };
    /**
     * Set min date.
     * @param {string} date
     */
    HelloWeek.prototype.setMinDate = function (date) {
        this.options.minDate = setMinDate(date);
    };
    /**
     * Set max date.
     * @param {string} date
     */
    HelloWeek.prototype.setMaxDate = function (date) {
        this.options.maxDate = setMaxDate(date);
    };
    HelloWeek.prototype.init = function (callback) {
        this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
        this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];
        if (this.daysSelected.length > 1 && !this.options.multiplePick) {
            error("There are " + this.daysSelected.length + " dates selected, but the multiplePick option\n                is " + this.options.multiplePick + "!");
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
        this.options.onLoad.call(this);
        if (callback) {
            callback.call(this);
        }
    };
    /**
     * Select day
     * @private
     */
    HelloWeek.prototype.selectDay = function (callback) {
        this.daysOfMonth = this.selector.querySelectorAll('.' + cssClasses.MONTH + ' .' + cssClasses.DAY);
        for (var _i = 0, _a = Object.keys(this.daysOfMonth); _i < _a.length; _i++) {
            var i = _a[_i];
            this.handleClickInteraction(this.daysOfMonth[i], callback);
            if (this.options.range) {
                this.handleMouseInteraction(this.daysOfMonth[i]);
            }
        }
    };
    HelloWeek.prototype.getIntervalOfDates = function (startDate, endDate) {
        var dates = [];
        var currentDate = startDate;
        var addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date.getTime();
        };
        while (currentDate <= endDate) {
            dates.push(timestampToHuman(currentDate, this.langs));
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };
    HelloWeek.prototype.handleClickInteraction = function (target, callback) {
        var _this = this;
        target.addEventListener('click', function (event) {
            var index = getIndexForEventTarget(_this.daysOfMonth, event.target);
            if (_this.days[index].locked) {
                return;
            }
            _this.lastSelectedDay = _this.days[index].timestamp;
            if (!_this.options.range) {
                if (_this.options.multiplePick) {
                    if (_this.days[index].timestamp) {
                        _this.daysSelected = _this.daysSelected.filter(function (day) { return setToTimestamp(day) !== _this.lastSelectedDay; });
                    }
                    if (!_this.days[index].isSelected) {
                        _this.daysSelected.push(timestampToHuman(_this.lastSelectedDay, _this.langs));
                    }
                }
                else {
                    if (!_this.days[index].locked) {
                        _this.removeStatesClass();
                    }
                    _this.daysSelected = [];
                    _this.daysSelected.push(timestampToHuman(_this.lastSelectedDay, _this.langs));
                }
            }
            toggleClass(event.target, cssStates.IS_SELECTED);
            _this.days[index].isSelected = !_this.days[index].isSelected;
            if (_this.options.range) {
                if (_this.intervalRange.begin && _this.intervalRange.end) {
                    _this.intervalRange = {};
                    _this.removeStatesClass();
                }
                if (_this.intervalRange.begin && !_this.intervalRange.end) {
                    _this.intervalRange.end = _this.days[index].timestamp;
                    _this.daysSelected = _this.getIntervalOfDates(_this.intervalRange.begin, _this.intervalRange.end);
                    addClass(event.target, cssStates.IS_END_RANGE);
                    if (_this.intervalRange.begin > _this.intervalRange.end) {
                        _this.intervalRange = {};
                        _this.removeStatesClass();
                    }
                }
                if (!_this.intervalRange.begin) {
                    _this.intervalRange.begin = _this.days[index].timestamp;
                }
                addClass(event.target, cssStates.IS_SELECTED);
            }
            _this.options.onSelect.call(_this);
            if (callback) {
                callback.call(_this);
            }
        });
    };
    HelloWeek.prototype.handleMouseInteraction = function (target) {
        var _this = this;
        target.addEventListener('mouseover', function (event) {
            var index = getIndexForEventTarget(_this.daysOfMonth, event.target);
            if (!_this.intervalRange.begin || (_this.intervalRange.begin && _this.intervalRange.end)) {
                return;
            }
            _this.removeStatesClass();
            for (var i = 1; i <= Object.keys(_this.days).length; i++) {
                _this.days[i].isSelected = false;
                if (_this.days[index].timestamp >= _this.intervalRange.begin) {
                    if (_this.days[i].timestamp >= _this.intervalRange.begin &&
                        _this.days[i].timestamp <= _this.days[index].timestamp) {
                        addClass(_this.days[i].element, cssStates.IS_SELECTED);
                        addClass(_this.days[i].element, cssStates.IS_RANGE);
                        if (_this.days[i].timestamp === _this.intervalRange.begin) {
                            addClass(_this.days[i].element, cssStates.IS_BEGIN_RANGE);
                        }
                    }
                }
            }
        });
    };
    HelloWeek.prototype.creatWeek = function (dayShort) {
        render(h('span', { "class": cssClasses.DAY }, dayShort), this.calendar.week);
    };
    HelloWeek.prototype.createMonth = function () {
        var currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
        this.selectDay();
    };
    HelloWeek.prototype.createDay = function (date) {
        var num = date.getDate();
        var day = date.getDay();
        var dayOptions = {
            day: num,
            timestamp: humanToTimestamp(format(date.getDate(), date.getMonth(), date.getFullYear())),
            isWeekend: false,
            locked: false,
            isToday: false,
            isRange: false,
            isSelected: false,
            isHighlight: false,
            attributes: {
                "class": [cssClasses.DAY],
                style: {}
            },
            element: undefined
        };
        this.days = this.days || {};
        if (day === daysWeek.SUNDAY || day === daysWeek.SATURDAY) {
            dayOptions.attributes["class"].push(cssStates.IS_WEEKEND);
            dayOptions.isWeekend = true;
        }
        if (this.options.locked ||
            (this.options.disableDaysOfWeek && this.options.disableDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays && +this.date.setHours(0, 0, 0, 0) <= +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
            (this.options.minDate && +this.options.minDate >= dayOptions.timestamp) ||
            (this.options.maxDate && +this.options.maxDate <= dayOptions.timestamp)) {
            dayOptions.attributes["class"].push(cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }
        if (this.options.disableDates) {
            this.setDaysDisable(dayOptions);
        }
        if (this.todayDate === dayOptions.timestamp && this.options.todayHighlight) {
            dayOptions.attributes["class"].push(cssStates.IS_TODAY);
            dayOptions.isToday = true;
        }
        this.daysSelected.find(function (daySelected) {
            if (daySelected === dayOptions.timestamp || humanToTimestamp(daySelected.toString()) === dayOptions.timestamp) {
                dayOptions.attributes["class"].push(cssStates.IS_SELECTED);
                dayOptions.isSelected = true;
            }
        });
        if (isBetween(this.intervalRange.begin, this.intervalRange.end, dayOptions.timestamp)) {
            dayOptions.attributes["class"].push(cssStates.IS_RANGE);
            dayOptions.isRange = true;
        }
        if (dayOptions.timestamp === this.intervalRange.begin) {
            dayOptions.attributes["class"].push(cssStates.IS_BEGIN_RANGE);
        }
        if (dayOptions.timestamp === this.intervalRange.end) {
            dayOptions.attributes["class"].push(cssStates.IS_END_RANGE);
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
        dayOptions.element = render(h('div', dayOptions.attributes, String(dayOptions.day)), this.calendar.month);
        this.days[dayOptions.day] = dayOptions;
    };
    HelloWeek.prototype.setDaysDisable = function (dayOptions) {
        if (this.options.disableDates[0] instanceof Array) {
            this.options.disableDates.map(function (date) {
                if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
                    dayOptions.attributes["class"].push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
        else {
            this.options.disableDates.map(function (date) {
                if (dayOptions.timestamp === setToTimestamp(date)) {
                    dayOptions.attributes["class"].push(cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
    };
    HelloWeek.prototype.setDayHighlight = function (dayOptions) {
        var _this = this;
        var _loop_1 = function (key) {
            if (this_1.daysHighlight[key].days[0] instanceof Array) {
                this_1.daysHighlight[key].days.map(function (date, index) {
                    if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
                        _this.setStyleDayHighlight(key, dayOptions);
                    }
                });
            }
            else {
                this_1.daysHighlight[key].days.map(function (date) {
                    if (dayOptions.timestamp === setToTimestamp(date)) {
                        _this.setStyleDayHighlight(key, dayOptions);
                    }
                });
            }
        };
        var this_1 = this;
        for (var key in this.daysHighlight) {
            _loop_1(key);
        }
    };
    HelloWeek.prototype.setStyleDayHighlight = function (key, dayOptions) {
        var attributes = this.daysHighlight[key].attributes;
        for (var k in attributes) {
            if (dayOptions.attributes[k] && attributes[k]) {
                dayOptions.attributes[k] = extend(dayOptions.attributes[k], attributes[k]);
            }
            else if (attributes[k]) {
                dayOptions.attributes[k] = attributes[k];
            }
        }
        dayOptions.attributes["class"].push(cssStates.IS_HIGHLIGHT);
        dayOptions.isHighlight = true;
    };
    HelloWeek.prototype.monthsAsString = function (monthIndex) {
        return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
    };
    HelloWeek.prototype.weekAsString = function (weekIndex) {
        return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
    };
    HelloWeek.prototype.mounted = function () {
        var listDays = [];
        if (this.calendar.period) {
            this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
        }
        this.calendar.week.textContent = '';
        for (var i = this.options.weekStart; i < this.langs.daysShort.length; i++) {
            listDays.push(i);
        }
        for (var i = 0; i < this.options.weekStart; i++) {
            listDays.push(i);
        }
        for (var _i = 0, listDays_1 = listDays; _i < listDays_1.length; _i++) {
            var day = listDays_1[_i];
            this.creatWeek(this.weekAsString(day));
        }
        this.createMonth();
    };
    HelloWeek.prototype.clearCalendar = function () {
        this.calendar.month.textContent = '';
    };
    HelloWeek.prototype.removeStatesClass = function () {
        for (var _i = 0, _a = Object.keys(this.daysOfMonth); _i < _a.length; _i++) {
            var i = _a[_i];
            removeClass(this.daysOfMonth[i], cssStates.IS_SELECTED);
            removeClass(this.daysOfMonth[i], cssStates.IS_RANGE);
            removeClass(this.daysOfMonth[i], cssStates.IS_BEGIN_RANGE);
            removeClass(this.daysOfMonth[i], cssStates.IS_END_RANGE);
            this.days[+i + 1].isSelected = false;
        }
    };
    return HelloWeek;
}());

var HelloWeek$1 = HelloWeek;
window.HelloWeek = HelloWeek$1;

export default HelloWeek;
export { HelloWeek$1 as HelloWeek };
