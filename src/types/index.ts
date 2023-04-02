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
    weekShort?: boolean;
    monthShort?: boolean;
    multiplePick?: boolean;
    defaultDate?: null;
    minDate?: Date;
    maxDate?: Date;
    disabledDaysOfWeek?: number[];
    disableDates?: string[] | [string, string][];
    disablePastDays?: boolean;
    weekStart?: number;
    timezoneOffset?: number;
    daysSelected?: string[];
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
