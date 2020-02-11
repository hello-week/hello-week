import { IOptions, ITemplate } from '../defs/index';
import { render, el, existElement, isString, isDef, addClass } from './../util/index';
import { cssClasses } from './../shared/constants';

export function template(options: IOptions, args: any): ITemplate {
  const self: any = {};

  if (!isDef(options.selector)) {
    throw new Error('You need to specify a selector!');
  }

  if (isString(options.selector)) {
    self.selector = options.selector ? document.querySelector(options.selector) : options.selector;
  } else {
    self.selector = options.selector;
  }

  if (!isDef(self.selector)) {
    self.selector = render(el('div', { class: [options.selector, cssClasses.CALENDAR] }));
  } else {
    if (options.selector !== cssClasses.CALENDAR) {
      addClass(self.selector, cssClasses.CALENDAR);
    }
  }
  self.calendar = {};

  self.calendar.navigation = existElement(cssClasses.NAVIGATION, self.selector);
  if (!isDef(self.calendar.navigation)) {
    self.calendar.navigation = render(el('div', { class: cssClasses.NAVIGATION }), self.selector);
  }

  if (isDef(options.nav[0])) {
    self.calendar.prevMonth = render(el('div', { class: cssClasses.PREV }, options.nav[0]), self.calendar.navigation);
    self.calendar.prevMonth.addEventListener('click', () => args.prev());
  }

  self.calendar.period = existElement(cssClasses.PERIOD, self.selector);
  if (!isDef(self.calendar.period)) {
    self.calendar.period = render(el('div', { class: cssClasses.PERIOD }), self.calendar.navigation);
  }

  if (isDef(options.nav[1])) {
    self.calendar.nextMonth = render(el('div', { class: cssClasses.NEXT }, options.nav[1]), self.calendar.navigation);
    self.calendar.nextMonth.addEventListener('click', () => args.next());
  }

  self.calendar.week = existElement(cssClasses.WEEK, self.selector);
  if (!isDef(self.calendar.week)) {
    self.calendar.week = render(el('div', { class: cssClasses.WEEK }), self.selector);
  }

  self.calendar.month = existElement(cssClasses.MONTH, self.selector);
  if (!isDef(self.calendar.month)) {
    self.calendar.month = render(el('div', { class: cssClasses.MONTH }), self.selector);
  }

  if (options.rtl) {
    addClass(self.calendar.week, cssClasses.RTL);
    addClass(self.calendar.month, cssClasses.RTL);
  }

  return self;
}
