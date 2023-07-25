type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zeroToNine = 0 | oneToNine;

/**
 * Years
 */
type YYYY = `${oneToNine}${oneToNine}${zeroToNine}${zeroToNine}`;
/**
 * Months
 */
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
/**
 * Days
 */
type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`;

/**
 * YYYY-MM-DD
 */
export type DateString = `${YYYY}-${MM}-${DD}`;

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
    month: number;
    year: number;
    timestamp: number;
    date: Date;
    element: Element;
    isHighlight: boolean;
    isSelected: boolean;
    isToday: boolean;
    isWeekend: boolean;
    locked: boolean;
    title?: string;
};

export type DaysHighlight = {
    days: Date[] | [Date, Date];
    title?: string;
    color?: string;
    backgroundColor?: string;
};

export type IntervalRange = { begin?: Date; end?: Date };

export interface Options {
    selector?: string;
    lang?: string;
    langFolder?: string;
    format?: string;
    weekShort?: boolean;
    monthShort?: boolean;
    multiplePick?: boolean;
    defaultDate?: null;
    minDate?: Date;
    maxDate?: Date;
    disabledDaysOfWeek?: number[];
    disableDates?: Date[] | [Date, Date][];
    disablePastDays?: boolean;
    weekStart?: number;
    timezoneOffset?: number;
    daysSelected?: (Date | DateString)[];
    daysHighlight?: DaysHighlight[];
    todayHighlight?: boolean;
    range?: boolean;
    locked?: boolean;
    rtl?: boolean;
    nav?: string[];
    onLoad?: () => void;
    onClear?: () => void;
    onReset?: () => void;
    onSelect?: () => void;
    onNavigation?: () => void;
    beforeCreateDay?: (node: DayOptions) => DayOptions;
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

export interface ClassNames {
    calendar?: string;
    month?: string;
    day?: string;
    week?: string;
    navigation?: string;
    period?: string;
    prev?: string;
    next?: string;
    rtl?: string;
    isHighlight?: string;
    isSelected?: string;
    isBeginRange?: string;
    isEndRange?: string;
    isDisabled?: string;
    isToday?: string;
    isWeekend?: string;
}
