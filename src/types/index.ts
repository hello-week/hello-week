export type CallbackFunction = (...args: string[]) => void;

export type CalendarOptions = {
    navigation: HTMLElement | Element;
    period: Element;
    prevMonth: Element;
    nextMonth: Element;
    week: Element;
    month: Element;
};

export type DayOptions = {
    day: number;
    element: Element;
    isHighlight: boolean;
    isSelected: boolean;
    isToday: boolean;
    isWeekend: boolean;
    locked: boolean;
    timestamp: number;
    title?: string;
};

export type DaysHighlight = {
    days: string[] | [string, string];
    title?: string;
    color?: string;
    backgroundColor?: string;
};

export type IntervalRange = { begin: number; end: number };

export interface Options {
    selector?: string;
    lang?: string;
    langFolder?: string;
    format?: string;
    monthShort?: boolean;
    weekShort?: boolean;
    defaultDate?: null;
    minDate?: Date;
    maxDate?: Date;
    disabledDaysOfWeek?: number[];
    disableDates?: string[] | [string, string][];
    weekStart?: number;
    timezoneOffset?: number;
    daysSelected?: string[];
    daysHighlight?: DaysHighlight[];
    multiplePick?: boolean;
    disablePastDays?: boolean;
    todayHighlight?: boolean;
    range?: boolean;
    locked?: boolean;
    rtl?: boolean;
    nav?: string[];
    onLoad?: () => void;
    onNavigation?: () => void;
    onSelect?: () => void;
    onClear?: () => void;
}

export interface CssClasses {
    CALENDAR: string;
    DAY: string;
    MONTH: string;
    NAVIGATION: string;
    NEXT: string;
    PERIOD: string;
    PREV: string;
    RTL: string;
    WEEK: string;
}

export interface CssStates {
    IS_HIGHLIGHT: string;
    IS_SELECTED: string;
    IS_BEGIN_RANGE: string;
    IS_END_RANGE: string;
    IS_DISABLED: string;
    IS_TODAY: string;
    IS_WEEKEND: string;
}

export interface DaysWeek {
    FRIDAY: number;
    MONDAY: number;
    SATURDAY: number;
    SUNDAY: number;
    THURSDAY: number;
    TUESDAY: number;
    WEDNESDAY: number;
}

export interface Langs {
    days: string[];
    daysShort: string[];
    months: string[];
    monthsShort: string[];
}
