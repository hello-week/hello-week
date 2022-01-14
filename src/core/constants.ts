import { CssClasses, CssStates, DaysWeek } from '../types';

/* @enum {string} */
export const CSS_CLASSES: CssClasses = {
    CALENDAR: 'hello-week',
    MONTH: 'month',
    DAY: 'day',
    WEEK: 'week',
    NAVIGATION: 'navigation',
    PERIOD: 'period',
    PREV: 'prev',
    NEXT: 'next',
    RTL: 'rtl',
};

/* @enum {string} */
export const FORMAT_DATE = 'YYYY-MM-DD';

/* @enum {string} */
export const CSS_STATES: CssStates = {
    IS_HIGHLIGHT: 'is-highlight',
    IS_SELECTED: 'is-selected',
    IS_BEGIN_RANGE: 'is-begin-range',
    IS_END_RANGE: 'is-end-range',
    IS_DISABLED: 'is-disabled',
    IS_TODAY: 'is-today',
    IS_WEEKEND: 'is-weekend',
};

/* @enum {string} */
export const DAYS_WEEK: DaysWeek = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

