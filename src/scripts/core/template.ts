import { IOptions } from '../defs/iOptions';
import { render, h, existElement, error, warn, log, isString, isDef, isTrue, addClass } from './../util/index';
import { cssClasses } from './../shared/constants';

export function template(options: IOptions, args: any) {
  const self: any = {};

  if (!isString(options.selector) && !isDef(options.selector)) {
    error('You need to specify a selector!');
  }

  self.selector = options.selector ? document.querySelector(options.selector) : options.selector;

  if (!isDef(self.selector)) {
    self.selector = render(h('div', { class: `${options.selector} ${cssClasses.CALENDAR}` }));
  } else {
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
