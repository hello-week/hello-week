export type IWeek = (string | null)[];

export type IWeekdays = {
    SUNDAY: 0;
    MONDAY: 1;
    TUESDAY: 2;
    WEDNESDAY: 3;
    THURSDAY: 4;
    FRIDAY: 5;
    SATURDAY: 6;
};

export type IWeekdaysValues = IWeekdays[keyof IWeekdays];

export type IDayOptions = {
    date: Date;
    formatted: string;
    dateString: {
        day: string;
        month: string;
        year: string;
        weekday: string;
    };
    details: {
        weekend: boolean;
        today: boolean;
        selected: boolean;
        highlighted: boolean;
        range: boolean;
        locked: boolean;
        disabled: boolean;
    };
};

export interface ICalendar {
    defaultDate?: Date;
    lang?: Intl.LocalesArgument;
    formatDate?: Intl.DateTimeFormatOptions;
    weekStart?: IWeekdaysValues;
    selectedDates?: Date[] | [Date, Date][];
    highlightedDates?: Date[] | [Date, Date][];
    disabledDates?: Date[] | [Date, Date][];
    disabledPastDates?: boolean;
    disabledDaysOfWeek?: IWeekdaysValues[];
    minDate?: Date;
    maxDate?: Date;
    locked?: boolean;
    highlightedToday?: boolean;
}
