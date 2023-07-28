// Represents a week, an array of strings or null (for days outside the current month).
export type IWeek = (string | null)[];

// Represents the numeric values corresponding to days of the week.
export type IWeekdays = {
    SUNDAY: 0;
    MONDAY: 1;
    TUESDAY: 2;
    WEDNESDAY: 3;
    THURSDAY: 4;
    FRIDAY: 5;
    SATURDAY: 6;
};

// Represents the numeric values of days of the week.
export type IWeekdaysValues = IWeekdays[keyof IWeekdays];

// Represents the options for each day in the calendar.
export type IDayOptions = {
    // The date object representing the day.
    date: Date;
    // The formatted string representation of the day's date.
    dateFormatted: string;
    // The date object containing individual parts of the day's date.
    dateObject: {
        day: string;
        month: string;
        year: string;
        weekday: string;
    };
    // Additional details about the day.
    details: {
        // Indicates if the day falls on a weekend (Saturday or Sunday).
        weekend: boolean;
        // Indicates if the day is today's date.
        today: boolean;
        // Indicates if the day is selected.
        selected: boolean;
        // Indicates if the day is highlighted.
        highlighted: boolean;
        // Indicates if the day is part of a selected range.
        range: boolean;
        // Indicates if the day is locked and cannot be interacted with.
        locked: boolean;
        // Indicates if the day is disabled and cannot be selected or interacted with.
        disabled: boolean;
    };
};

// Represents the configuration options for the calendar.
export interface ICalendar {
    // The default date to display on the calendar.
    defaultDate?: Date;
    // The language/locale to use for date formatting.
    lang?: Intl.LocalesArgument;
    // The date format options for formatting dates.
    formatDate?: Intl.DateTimeFormatOptions;
    // The numeric value corresponding to the start day of the week (0 for Sunday, 1 for Monday, etc.).
    weekStart?: IWeekdaysValues;
    // An array of selected dates for the calendar.
    selectedDates?: Date[] | [Date, Date][];
    // An array of dates to highlight on the calendar.
    highlightedDates?: Date[] | [Date, Date][];
    // An array of disabled dates on the calendar.
    disabledDates?: Date[] | [Date, Date][];
    // Indicates if past dates are disabled on the calendar.
    disabledPastDates?: boolean;
    // An array of numeric values corresponding to days of the week to be disabled on the calendar.
    disabledDaysOfWeek?: IWeekdaysValues[];
    // The minimum selectable date on the calendar.
    minDate?: Date;
    // The maximum selectable date on the calendar.
    maxDate?: Date;
    // Indicates if the calendar is locked and cannot be interacted with.
    locked?: boolean;
    // Indicates if today's date should be highlighted on the calendar.
    highlightedToday?: boolean;
}
