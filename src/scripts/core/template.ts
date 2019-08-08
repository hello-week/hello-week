import { render, h, error, warn, log, isString, isDef, isTrue, addClass } from "./../util/index";
import { cssClasses } from "./../shared/constants";
import { Options } from "./../shared/options";

export function build(options: Options, args: any) {

    const self: any = {};

    if (!isString(options.selector) && !isDef(options.selector)) {
        error("You need to specify a selector!");
    }

    self.selector = options.selector ? document.querySelector(options.selector) : options.selector;

    // If element not exists in DOM, create. a new one.
    if (!isDef(self.selector)) {
        self.selector = render(h("div", { class: `${options.selector} ${cssClasses.CALENDAR}` }));
    } else {
        if (options.selector !== cssClasses.CALENDAR) {
            addClass(self.selector, cssClasses.CALENDAR);
        }
    }
    self.calendar = {};
    self.calendar.navigation = render(h("div", { class: cssClasses.NAVIGATION }), self.selector);

    if (isDef(options.nav[0])) {
        self.calendar.prevMonth = render(h("div", { class: cssClasses.PREV }, options.nav[0]), self.calendar.navigation);
        self.calendar.prevMonth.addEventListener("click", () => args.prev.cb());
    }

    self.calendar.period = render(h("div", { class: cssClasses.PERIOD }), self.calendar.navigation);

    if (isDef(options.nav[1])) {
        self.calendar.nextMonth = render(h("div", { class: cssClasses.NEXT }, options.nav[1]), self.calendar.navigation);
        self.calendar.nextMonth.addEventListener("click", () => args.next.cb());
    }

    self.calendar.week = render(h("div", { class: cssClasses.WEEK }), self.selector);
    self.calendar.month = render(h("div", { class: cssClasses.MONTH }), self.selector);


    if (options.rtl) {
        addClass(self.calendar.week, cssClasses.RTL);
        addClass(self.calendar.month, cssClasses.RTL);
    }

    return self;
}
