export type CallbackFunction = (...args: any[]) => void;

interface BaseOptions {
    selector: string,
    daysHighlight: any,
    daysSelected: any,
    defaultDate?: any,
    disableDates: any,
    disableDaysOfWeek: any,
    disablePastDays: boolean,
    format: any;
    lang: string,
    locked: boolean,
    maxDate: any,
    minDate: any,
    monthShort: boolean,
    multiplePick: boolean,
    nav: ["◀", "▶"],
    range: boolean,
    rtl: boolean,
    todayHighlight: true,
    weekShort: true,
    weekStart: number;
    onLoad: CallbackFunction;
    onClear: CallbackFunction;
    onNavigation: CallbackFunction;
    onSelect: CallbackFunction;
}

export let defaults: BaseOptions = {
    selector: ".hello-week",
    daysHighlight: null,
    daysSelected: null,
    defaultDate: null,
    disableDates: null,
    disableDaysOfWeek: null,
    disablePastDays: false,
    format: {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    },
    lang: "en",
    locked: false,
    maxDate: null,
    minDate: null,
    monthShort: false,
    multiplePick: false,
    nav: ["◀", "▶"],
    range: false,
    rtl: false,
    todayHighlight: true,
    weekShort: true,
    weekStart: 0,
    onLoad: () => {},
    onClear: () => {},
    onNavigation: () => {},
    onSelect: () => {}
};

export type Options = BaseOptions;
