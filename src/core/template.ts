import { Options, Template } from '../types/index';
import { isString, isDef } from '../utils/is';

import { render, el } from '../utils/vdom';

import { existElement, addClass } from '../utils/dom';

import { CSS_CLASSES } from './constants';

export function template(options: Options, args: any): Template {
    const self: any = {};

    if (!isDef(options.selector)) {
        throw new Error('You need to specify a selector!');
    }

    if (isString(options.selector)) {
        self.selector = options.selector
            ? document.querySelector(options.selector)
            : options.selector;
    } else {
        self.selector = options.selector;
    }

    if (!isDef(self.selector)) {
        self.selector = render(
            el('div', { class: [options.selector, CSS_CLASSES.CALENDAR] })
        );
    } else {
        if (options.selector !== CSS_CLASSES.CALENDAR) {
            addClass(self.selector, CSS_CLASSES.CALENDAR);
        }
    }
    self.calendar = {};

    self.calendar.navigation = existElement(
        CSS_CLASSES.NAVIGATION,
        self.selector
    );
    if (!isDef(self.calendar.navigation)) {
        self.calendar.navigation = render(
            el('div', { class: CSS_CLASSES.NAVIGATION }),
            self.selector
        );
    }

    if (isDef(options.nav[0])) {
        self.calendar.prevMonth = render(
            el('div', { class: CSS_CLASSES.PREV }, options.nav[0]),
            self.calendar.navigation
        );
        self.calendar.prevMonth.addEventListener('click', () => args.prev.cb());
    }

    self.calendar.period = existElement(CSS_CLASSES.PERIOD, self.selector);
    if (!isDef(self.calendar.period)) {
        self.calendar.period = render(
            el('div', { class: CSS_CLASSES.PERIOD }),
            self.calendar.navigation
        );
    }

    if (isDef(options.nav[1])) {
        self.calendar.nextMonth = render(
            el('div', { class: CSS_CLASSES.NEXT }, options.nav[1]),
            self.calendar.navigation
        );
        self.calendar.nextMonth.addEventListener('click', () => args.next.cb());
    }

    self.calendar.week = existElement(CSS_CLASSES.WEEK, self.selector);
    if (!isDef(self.calendar.week)) {
        self.calendar.week = render(
            el('div', { class: CSS_CLASSES.WEEK }),
            self.selector
        );
    }

    self.calendar.month = existElement(CSS_CLASSES.MONTH, self.selector);
    if (!isDef(self.calendar.month)) {
        self.calendar.month = render(
            el('div', { class: CSS_CLASSES.MONTH }),
            self.selector
        );
    }

    if (options.rtl) {
        addClass(self.calendar.week, CSS_CLASSES.RTL);
        addClass(self.calendar.month, CSS_CLASSES.RTL);
    }
    return self;
}
