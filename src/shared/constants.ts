import { CssClasses, CssStates, DaysWeek, RTL } from '../interfaces/index';

export const cssClasses: CssClasses = {
    CALENDAR: 'hello-week',
    DAY: 'day',
    MONTH: 'month',
    NAVIGATION: 'navigation',
    NEXT: 'next',
    PERIOD: 'period',
    PREV: 'prev',
    RTL: 'rtl',
    WEEK: 'week',
};

export const cssStates: CssStates = {
    IS_BEGIN_RANGE: 'is-begin-range',
    IS_DISABLED: 'is-disabled',
    IS_END_RANGE: 'is-end-range',
    IS_HIGHLIGHT: 'is-highlight',
    IS_SELECTED: 'is-selected',
    IS_RANGE: 'is-range',
    IS_TODAY: 'is-today',
    IS_WEEKEND: 'is-weekend',
};

export const daysWeek: DaysWeek = {
    FRIDAY: 5,
    MONDAY: 1,
    SATURDAY: 6,
    SUNDAY: 0,
    THURSDAY: 4,
    TUESDAY: 2,
    WEDNESDAY: 3,
};

export const margins: RTL = {
    RIGHT: 'margin-right',
    LEFT: 'margin-left',
};
