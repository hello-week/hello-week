var defaults = {
    selector: ".hello-week",
    daysHighlight: null,
    daysSelected: null,
    defaultDate: null,
    disableDates: null,
    disableDaysOfWeek: null,
    disablePastDays: false,
    format: {
        year: "numeric",
        month: "long",
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
    todayHighlight: true,
    weekShort: true,
    weekStart: 0,
    onLoad: function () { },
    onClear: function () { },
    onNavigation: function () { },
    onSelect: function () { }
};

function error(msg) {
    throw new Error("[Hello Week Error]: " + msg);
}

function isDef(v) {
    return v !== undefined && v !== null;
}
function isString(val) {
    return typeof val === "string";
}

function render(vnode, parentDom) {
    if (vnode.split) {
        return document.createTextNode(vnode);
    }
    var n = document.createElement(vnode.nodeName);
    var a = vnode.attributes || {};
    Object.keys(a).forEach(function (k) { return n.setAttribute(k, a[k]); });
    (vnode.children || []).forEach(function (c) { return n.appendChild(render(c)); });
    return parentDom ? parentDom.appendChild(n) : n;
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
function existElement(className, where) {
    return isDef(where) ? where.querySelector("." + className) : document.querySelector("." + className);
}

function extend(to, from) {
    return Object.assign(to, from);
}

var cssClasses = {
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
var cssStates = {
    IS_BEGIN_RANGE: "is-begin-range",
    IS_DISABLED: "is-disabled",
    IS_END_RANGE: "is-end-range",
    IS_HIGHLIGHT: "is-highlight",
    IS_SELECTED: "is-selected",
    IS_TODAY: "is-today",
    IS_WEEKEND: "is-weekend",
};
var daysWeek = {
    FRIDAY: 5,
    MONDAY: 1,
    SATURDAY: 6,
    SUNDAY: 0,
    THURSDAY: 4,
    TUESDAY: 2,
    WEDNESDAY: 3,
};

function build(options, args) {
    var self = {};
    if (!isString(options.selector) && !isDef(options.selector)) {
        error("You need to specify a selector!");
    }
    self.selector = options.selector ? document.querySelector(options.selector) : options.selector;
    if (!isDef(self.selector)) {
        self.selector = render(h("div", { class: options.selector + " " + cssClasses.CALENDAR }));
    }
    else {
        if (options.selector !== cssClasses.CALENDAR) {
            addClass(self.selector, cssClasses.CALENDAR);
        }
    }
    self.calendar = {};
    self.calendar.navigation = existElement(cssClasses.NAVIGATION, self.selector);
    if (!isDef(self.calendar.navigation)) {
        self.calendar.navigation = render(h("div", { class: cssClasses.NAVIGATION }), self.selector);
    }
    if (isDef(options.nav[0])) {
        self.calendar.prevMonth = render(h("div", { class: cssClasses.PREV }, options.nav[0]), self.calendar.navigation);
        self.calendar.prevMonth.addEventListener("click", function () { return args.prev.cb(); });
    }
    self.calendar.period = existElement(cssClasses.PERIOD, self.selector);
    if (!isDef(self.calendar.period)) {
        self.calendar.period = render(h("div", { class: cssClasses.PERIOD }), self.calendar.navigation);
    }
    if (isDef(options.nav[1])) {
        self.calendar.nextMonth = render(h("div", { class: cssClasses.NEXT }, options.nav[1]), self.calendar.navigation);
        self.calendar.nextMonth.addEventListener("click", function () { return args.next.cb(); });
    }
    self.calendar.week = existElement(cssClasses.WEEK, self.selector);
    if (!isDef(self.calendar.week)) {
        self.calendar.week = render(h("div", { class: cssClasses.WEEK }), self.selector);
    }
    self.calendar.month = existElement(cssClasses.MONTH, self.selector);
    if (!isDef(self.calendar.month)) {
        self.calendar.month = render(h("div", { class: cssClasses.MONTH }), self.selector);
    }
    if (options.rtl) {
        addClass(self.calendar.week, cssClasses.RTL);
        addClass(self.calendar.month, cssClasses.RTL);
    }
    return self;
}

function formatDate(day, month, year) {
    return year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2);
}
var formats = {
    dd: function (date, lang) {
        if (lang === void 0) { lang = defaults.lang; }
        return new Intl.DateTimeFormat(lang, { day: "numeric" }).format(date);
    },
    DD: function (date, lang) {
        if (lang === void 0) { lang = defaults.lang; }
        return new Intl.DateTimeFormat(lang, { day: "2-digit" }).format(date);
    },
    mm: function (date, lang) {
        if (lang === void 0) { lang = defaults.lang; }
        return new Intl.DateTimeFormat(lang, { month: "numeric" }).format(date);
    },
    MM: function (date, lang) {
        if (lang === void 0) { lang = defaults.lang; }
        return new Intl.DateTimeFormat(lang, { month: "2-digit" }).format(date);
    },
    yy: function (date, lang) {
        if (lang === void 0) { lang = defaults.lang; }
        return new Intl.DateTimeFormat(lang, { year: "2-digit" }).format(date);
    },
    YY: function (date, lang) {
        if (lang === void 0) { lang = defaults.lang; }
        return new Intl.DateTimeFormat(lang, { year: "numeric" }).format(date);
    },
    default: function (date) { return new Intl.DateTimeFormat(defaults.lang, { day: "2-digit", month: "2-digit", year: "numeric" }).format(date); }
};

function date(dt) {
    if (isDef(dt)) {
        return new Date(dt);
    }
    return new Date();
}
function today() {
    return formats.default(new Date());
}

function timestampToHuman(timestamp, lang, format) {
    var dt = new Date(timestamp);
    return new Intl.DateTimeFormat(lang ? lang : defaults.lang, format ? format : defaults.format).format(dt);
}
function humanToTimestamp(date) {
    if (date && (!isNaN(Number(date)) || date.split("-").length !== 3)) {
        throw new Error("The date " + date + " is not valid!");
    }
    if (date || typeof date === "string") {
        return new Date(date + "T00:00:00Z").getTime();
    }
    return new Date().setHours(0, 0, 0, 0);
}

function diff(start, end) {
    var dates = [];
    var currentDate = start;
    var addDays = function (days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        return date.getTime();
    };
    while (currentDate <= end) {
        dates.push(timestampToHuman(currentDate));
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}

var HelloWeek = (function () {
    function HelloWeek(options) {
        var _this = this;
        this.calendar = {};
        this.daysSelected = [];
        this.intervalRange = {};
        this.lastSelectedDay = 0;
        this.todayDate = today();
        this.options = extend(extend({}, defaults), options);
        this.initOptions = extend(extend({}, defaults), options);
        var calendar = build(this.options, {
            prev: {
                cb: function () { return _this.prev(); }
            },
            next: {
                cb: function () { return _this.next(); }
            }
        });
        this.selector = calendar.selector;
        this.calendar = calendar.calendar;
        this.readFile("langs/" + this.options.lang + ".json", function (langs) {
            _this.langs = langs;
            _this.init();
        });
    }
    HelloWeek.prototype.readFile = function (file, callback) {
        fetch(file)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            callback(data);
        });
    };
    HelloWeek.prototype.destroy = function () {
        this.removeStatesClass();
        this.selector.remove();
    };
    HelloWeek.prototype.prev = function (callback) {
        var prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
        this.update();
        this.options.onNavigation({
            month: this.date.getMonth() + 1,
            year: this.date.getFullYear()
        });
        if (callback) {
            callback();
        }
    };
    HelloWeek.prototype.next = function (callback) {
        var nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
        this.update();
        this.options.onNavigation({
            month: this.date.getMonth() + 1,
            year: this.date.getFullYear()
        });
        if (callback) {
            callback();
        }
    };
    HelloWeek.prototype.update = function () {
        this.clearCalendar();
        this.mounted();
    };
    HelloWeek.prototype.reset = function (options, callback) {
        if (options === void 0) { options = {}; }
        this.clearCalendar();
        this.options = extend(options, this.initOptions);
        this.init(callback);
    };
    HelloWeek.prototype.goToday = function () {
        this.date = this.todayDate;
        this.date.setDate(1);
        this.update();
    };
    HelloWeek.prototype.goToDate = function (dt) {
        if (dt === void 0) { dt = this.todayDate; }
        this.date = date(dt);
        this.date.setDate(1);
        this.update();
    };
    HelloWeek.prototype.getDaysSelected = function () {
        return this.daysSelected;
    };
    HelloWeek.prototype.getLastSelectedDay = function () {
        return this.lastSelectedDay;
    };
    HelloWeek.prototype.getDaysHighlight = function () {
        return this.daysHighlight;
    };
    HelloWeek.prototype.getMonth = function () {
        return this.date.getMonth() + 1;
    };
    HelloWeek.prototype.getYear = function () {
        return this.date.getFullYear();
    };
    HelloWeek.prototype.setDaysHighlight = function (daysHighlight) {
        this.daysHighlight = this.daysHighlight.concat(daysHighlight);
    };
    HelloWeek.prototype.setMultiplePick = function (state) {
        this.options.multiplePick = state;
    };
    HelloWeek.prototype.setDisablePastDays = function (state) {
        this.options.disablePastDays = state;
    };
    HelloWeek.prototype.setTodayHighlight = function (state) {
        this.options.todayHighlight = state;
    };
    HelloWeek.prototype.setRange = function (state) {
        this.options.range = state;
    };
    HelloWeek.prototype.setLocked = function (state) {
        this.options.locked = state;
    };
    HelloWeek.prototype.setMinDate = function (dt) {
        this.options.minDate = date(dt);
        this.options.minDate.setHours(0, 0, 0, 0);
        this.options.minDate.setDate(this.options.minDate.getDate() - 1);
    };
    HelloWeek.prototype.setMaxDate = function (dt) {
        this.options.maxDate = date(dt);
        this.options.maxDate.setHours(0, 0, 0, 0);
        this.options.maxDate.setDate(this.options.maxDate.getDate() + 1);
    };
    HelloWeek.prototype.init = function (callback) {
        this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
        this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];
        if (this.daysSelected.length > 1 && !this.options.multiplePick) {
            error("There are " + this.daysSelected.length + " dates selected, but the multiplePick option is false");
        }
        this.date = date();
        console.log(this.date);
        this.defaultDate = date();
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
        this.options.onLoad();
        if (callback) {
            callback.call(this);
        }
    };
    HelloWeek.prototype.selectDay = function (callback) {
        this.daysOfMonth = this.selector.querySelectorAll("." + cssClasses.MONTH + " ." + cssClasses.DAY);
        for (var _i = 0, _a = Object.keys(this.daysOfMonth); _i < _a.length; _i++) {
            var i = _a[_i];
            this.handleClickInteraction(this.daysOfMonth[i], callback);
            if (this.options.range) {
                this.handleMouseInteraction(this.daysOfMonth[i]);
            }
        }
    };
    HelloWeek.prototype.getIntervalOfDates = function (startDate, endDate) {
        var _this = this;
        var dates = [];
        var currentDate = startDate;
        var addDays = function (days) {
            var dt = date(_this.valueOf());
            dt.setDate(dt.getDate() + days);
            return dt.getTime();
        };
        while (currentDate <= endDate) {
            dates.push(timestampToHuman(currentDate));
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };
    HelloWeek.prototype.handleClickInteraction = function (target, callback) {
        var _this = this;
        target.addEventListener("click", function (event) {
            var index = _this.getIndexForEventTarget(_this.daysOfMonth, event.target);
            if (_this.days[index].locked) {
                return;
            }
            _this.lastSelectedDay = _this.days[index].timestamp;
            if (!_this.options.range) {
                if (_this.options.multiplePick) {
                    if (_this.days[index].timestamp) {
                        _this.daysSelected = _this.daysSelected.filter(function (day) { return humanToTimestamp(day) !== _this.lastSelectedDay; });
                    }
                    if (!_this.days[index].isSelected) {
                        _this.daysSelected.push(timestampToHuman(_this.lastSelectedDay));
                    }
                }
                else {
                    if (!_this.days[index].locked) {
                        _this.removeStatesClass();
                    }
                    _this.daysSelected = [];
                    _this.daysSelected.push(timestampToHuman(_this.lastSelectedDay));
                }
            }
            toggleClass(event.target, cssStates.IS_SELECTED);
            _this.days[index].isSelected = !_this.days[index].isSelected;
            if (_this.options.range) {
                if (_this.intervalRange.begin && _this.intervalRange.end) {
                    _this.intervalRange.begin = undefined;
                    _this.intervalRange.end = undefined;
                    _this.removeStatesClass();
                }
                if (_this.intervalRange.begin && !_this.intervalRange.end) {
                    _this.intervalRange.end = _this.days[index].timestamp;
                    _this.daysSelected = diff(_this.intervalRange.begin, _this.intervalRange.end);
                    addClass(event.target, cssStates.IS_END_RANGE);
                    if (_this.intervalRange.begin > _this.intervalRange.end) {
                        _this.intervalRange.begin = undefined;
                        _this.intervalRange.end = undefined;
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
        target.addEventListener("mouseover", function (event) {
            var index = _this.getIndexForEventTarget(_this.daysOfMonth, event.target);
            if (!_this.intervalRange.begin || (_this.intervalRange.begin && _this.intervalRange.end)) {
                return;
            }
            _this.removeStatesClass();
            for (var i = 1; i <= Object.keys(_this.days).length; i++) {
                _this.days[i].isSelected = false;
                if (_this.days[index].timestamp >= _this.intervalRange.begin) {
                    if (_this.days[i].locked) {
                        return;
                    }
                    if (_this.days[i].timestamp >= _this.intervalRange.begin &&
                        _this.days[i].timestamp <= _this.days[index].timestamp) {
                        _this.days[i].isSelected = true;
                        addClass(_this.days[i].element, cssStates.IS_SELECTED);
                        if (_this.days[i].timestamp === _this.intervalRange.begin) {
                            addClass(_this.days[i].element, cssStates.IS_BEGIN_RANGE);
                        }
                    }
                }
            }
        });
    };
    HelloWeek.prototype.creatWeek = function (dayShort) {
        createElement("span", { class: cssClasses.DAY }, dayShort, this.calendar.week);
    };
    HelloWeek.prototype.createMonth = function () {
        var currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
        this.selectDay(function () {
        });
    };
    HelloWeek.prototype.createDay = function (date) {
        var num = date.getDate();
        var day = date.getDay();
        var dayOptions = {
            day: num,
            timestamp: humanToTimestamp(formatDate(date.getDate(), date.getMonth(), date.getFullYear())),
            isWeekend: false,
            locked: false,
            isToday: false,
            isSelected: false,
            isHighlight: false,
            element: undefined,
        };
        this.days = this.days || {};
        var newDay = createElement("div", { class: cssClasses.DAY }, String(dayOptions.day), this.calendar.month);
        if (dayOptions.day === 1) {
            if (this.options.weekStart === daysWeek.SUNDAY) {
                setStyle(newDay, this.options.rtl ? "margin-right" : "margin-left", day * (100 / Object.keys(daysWeek).length) + "%");
            }
            else {
                if (day === daysWeek.SUNDAY) {
                    setStyle(newDay, this.options.rtl ? "margin-right" : "margin-left", (Object.keys(daysWeek).length - this.options.weekStart) * (100 / Object.keys(daysWeek).length) +
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
            (this.options.disableDaysOfWeek && this.options.disableDaysOfWeek.includes(day)) ||
            (this.options.disablePastDays &&
                +this.date.setHours(0, 0, 0, 0) <= +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
            (this.options.minDate && +this.options.minDate >= dayOptions.timestamp) ||
            (this.options.maxDate && +this.options.maxDate <= dayOptions.timestamp)) {
            addClass(newDay, cssStates.IS_DISABLED);
            dayOptions.locked = true;
        }
        if (this.options.disableDates) {
            this.setDaysDisable(newDay, dayOptions);
        }
        if (this.todayDate === dayOptions.timestamp && this.options.todayHighlight) {
            addClass(newDay, cssStates.IS_TODAY);
            dayOptions.isToday = true;
        }
        this.daysSelected.find(function (daySelected) {
            if (daySelected === dayOptions.timestamp ||
                humanToTimestamp(daySelected.toString()) === dayOptions.timestamp) {
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
    };
    HelloWeek.prototype.setDaysDisable = function (newDay, dayOptions) {
        if (this.options.disableDates[0] instanceof Array) {
            this.options.disableDates.map(function (date) {
                if (dayOptions.timestamp >= humanToTimestamp(date[0]) &&
                    dayOptions.timestamp <= humanToTimestamp(date[1])) {
                    addClass(newDay, cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
        else {
            this.options.disableDates.map(function (date) {
                if (dayOptions.timestamp === humanToTimestamp(date)) {
                    addClass(newDay, cssStates.IS_DISABLED);
                    dayOptions.locked = true;
                }
            });
        }
    };
    HelloWeek.prototype.setDayHighlight = function (newDay, dayOptions) {
        var _this = this;
        var _loop_1 = function (key) {
            if (this_1.daysHighlight[key].days[0] instanceof Array) {
                this_1.daysHighlight[key].days.map(function (date, index) {
                    if (dayOptions.timestamp >= humanToTimestamp(date[0]) &&
                        dayOptions.timestamp <= humanToTimestamp(date[1])) {
                        _this.setStyleDayHighlight(newDay, key, dayOptions);
                    }
                });
            }
            else {
                this_1.daysHighlight[key].days.map(function (date) {
                    if (dayOptions.timestamp === humanToTimestamp(date)) {
                        _this.setStyleDayHighlight(newDay, key, dayOptions);
                    }
                });
            }
        };
        var this_1 = this;
        for (var key in this.daysHighlight) {
            _loop_1(key);
        }
    };
    HelloWeek.prototype.setStyleDayHighlight = function (newDay, key, dayOptions) {
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
            this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + " " + this.date.getFullYear();
        }
        this.calendar.week.textContent = "";
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
        this.calendar.month.textContent = "";
    };
    HelloWeek.prototype.removeStatesClass = function () {
        for (var _i = 0, _a = Object.keys(this.daysOfMonth); _i < _a.length; _i++) {
            var i = _a[_i];
            removeClass(this.daysOfMonth[i], cssStates.IS_SELECTED);
            removeClass(this.daysOfMonth[i], cssStates.IS_BEGIN_RANGE);
            removeClass(this.daysOfMonth[i], cssStates.IS_END_RANGE);
            this.days[+i + 1].isSelected = false;
        }
    };
    HelloWeek.prototype.getIndexForEventTarget = function (daysOfMonth, target) {
        return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
    };
    return HelloWeek;
}());

var HelloWeek$1 = HelloWeek;
window.HelloWeek = HelloWeek$1;

export default HelloWeek;
export { HelloWeek$1 as HelloWeek };
