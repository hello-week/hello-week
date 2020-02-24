export interface IOptions {
    selector: string;
    lang: string;
    langFolder: string;
    format: string;
    defaultDate?: string | null;
    todayHighlight: boolean;
    weekStart: number;
    monthShort: boolean;
    weekShort: boolean;
    minDate: any;
    maxDate: any;
    daysSelected: any;
    daysHighlight: any;
    multiplePick: boolean;
    disableDaysOfWeek: any;
    disableDates: any;
    disablePastDays: boolean;
    range: boolean | [string | number];
    locked: boolean;
    rtl: boolean;
    nav: ['◀', '▶'];
    timezoneOffset?: number;
    onLoad: () => void;
    onClear: () => void;
    onNavigation: () => void;
    onUpdate: (options: IOptions) => IOptions;
    onSelect: (data: IDayOptions) => IDayOptions;
    dayRender: (data: IDayOptions) => IDayOptions;
}
export interface IDayOptions {
    day: number;
    date: Date | string;
    isWeekend: boolean;
    locked: boolean;
    isToday: boolean;
    isRange: boolean;
    isSelected: boolean;
    isHighlight: boolean;
    events: any;
    attributes: any;
    node: Node | undefined;
    element: HTMLElement | undefined;
}
export interface ICssClasses {
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
export interface ICssStates {
    IS_BEGIN_RANGE: string;
    IS_END_RANGE: string;
    IS_RANGE: string;
    IS_DISABLED: string;
    IS_HIGHLIGHT: string;
    IS_SELECTED: string;
    IS_TODAY: string;
    IS_WEEKEND: string;
}
export interface IDaysWeek {
    FRIDAY: number;
    MONDAY: number;
    SATURDAY: number;
    SUNDAY: number;
    THURSDAY: number;
    TUESDAY: number;
    WEDNESDAY: number;
}
export interface IRTL {
    RIGHT: string;
    LEFT: string;
}
