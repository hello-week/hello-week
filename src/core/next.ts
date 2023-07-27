import { isToday, isDateAfter, isDateBefore, isSameDay } from '../utils/date';
import { isArray } from '../utils/is';
import { DAYS_WEEK } from './constants';

type IWeekdays = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const WEEK_LENGTH = 7;

const WEEKDAYS: IWeekdays[] = [0, 1, 2, 3, 4, 5, 6, 7];

export type Week = (string | null)[];

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
        isHighlighted: boolean;
        isSelected: boolean;
        isRange: boolean;
        isToday: boolean;
        isWeekend: boolean;
        isDisabled: boolean;
        isLocked: boolean;
    };
};

export interface ICalendar {
    defaultDate?: Date;
    lang?: Intl.LocalesArgument;
    formatDate?: Intl.DateTimeFormatOptions;
    formatMonth?: Intl.DateTimeFormatOptions['month'];
    weekStart?: IWeekdays;
    selectedDates?: Date[] | [Date, Date][];
    disabledDates?: Date[] | [Date, Date][];
    disabledPastDates?: boolean;
    disabledDaysOfWeek?: IWeekdays[];
    minDate?: Date;
    maxDate?: Date;
    locked?: boolean;
}

const defaultOptions: ICalendar = {
    lang: 'en-UK',
    defaultDate: new Date(),
    formatDate: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'short',
    },
    weekStart: 0,
    selectedDates: [new Date('2023-07-01'), new Date('2023-07-10')],
    disabledPastDates: false,
    disabledDaysOfWeek: undefined,
    // disabledDates: [[new Date('2023-07-01'), new Date('2023-07-10')]],
    disabledDates: undefined,
    minDate: undefined,
    maxDate: undefined,
    locked: false,
};

/**
 * Represents a calendar with configurable options for language, date format, and week start day.
 */
export class Calendar {
    private options: ICalendar;
    private date: Date;
    private today: Date;
    private days: IDayOptions[] = [];

    /**
     * Creates a new instance of the Calendar class.
     * @param options - The configuration options for the calendar.
     */
    constructor(options?: ICalendar) {
        const mergedOptions = { ...defaultOptions, ...options };
        this.options = mergedOptions;
        this.date = new Date(mergedOptions.defaultDate);
        this.date.setDate(1);
        this.today = new Date(new Date().setHours(0, 0, 0, 0));
        // Create array with days of month.
        this.createMonth();
    }

    /**
     * Gets the week days for the current month in the specified language and format.
     * @returns An array of string with each day of week.
     */
    public getWeekDays(): string[] {
        const { formatDate: format, lang, weekStart } = this.options;
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstOfMonth = new Date(year, month, 1);
        const firstDayOfWeek = firstOfMonth.getDay() as IWeekdays;
        const weeks: Week[] = [[]];
        const orderedWeekday = WEEKDAYS.slice(weekStart).concat(
            WEEKDAYS.slice(0, weekStart)
        );

        let currentWeek = weeks[0];
        let currentDate = firstOfMonth;

        const orderedWeekdayIndex = orderedWeekday.indexOf(firstDayOfWeek);
        for (let i = 0; i < orderedWeekdayIndex; i++) {
            currentWeek.push(null);
        }

        while (currentDate.getMonth() === month) {
            if (currentWeek.length === WEEK_LENGTH) {
                currentWeek = [];
                weeks.push(currentWeek);
            }

            currentWeek.push(
                currentDate.toLocaleDateString(lang, {
                    weekday: format.weekday,
                })
            );

            currentDate = new Date(year, month, currentDate.getDate() + 1);
        }

        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }

        return weeks[1];
    }

    /**
     * Gets the day options for the current month.
     * @returns An array of day options for the current month.
     */
    public getDays(): IDayOptions[] {
        return this.days;
    }

    /**
     * Get the current date.
     * @returns The today's date.
     */
    public getToday(): Date {
        return this.today;
    }

    /**
     * Get the month string representation for the current month.
     * @param options - An optional object containing the format for the month string.
     * @returns The month string representation.
     */
    public getMonthString(options?: {
        format?: Intl.DateTimeFormatOptions['month'];
    }): string {
        const { lang, formatDate } = this.options;
        const format = options?.format || formatDate.month;
        return this.date.toLocaleDateString(lang, { month: format });
    }

    /**
     * Get the year string representation for the current year.
     * @param options - An optional object containing the format for the year string.
     * @returns The year string representation.
     */
    public getYearString(options?: {
        format?: Intl.DateTimeFormatOptions['year'];
    }): string {
        const { lang, formatDate } = this.options;
        const format = options?.format || formatDate.year;
        return this.date.toLocaleDateString(lang, { year: format });
    }

    /**
     * Sets the options.
     * Method accept all options, with the advantage of being able to modify multiple options at once.
     *
     * @see {@link ICalendar}
     * @param options - The calendar options, or callback with previous options.
     */
    public setOptions(options: ((prev: ICalendar) => ICalendar) | ICalendar) {
        if (typeof options === 'function') {
            this.options = options(this.options);
        } else {
            this.options = options;
        }
    }

    private createMonth(): void {
        const currentMonth = this.date.getMonth();
        while (this.date.getMonth() === currentMonth) {
            this.createDay(this.date);
            this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setMonth(this.date.getMonth() - 1);
    }

    private createDay(date: Date): void {
        const {
            lang,
            formatDate: format,
            selectedDates,
            maxDate,
            minDate,
            locked,
            disabledDaysOfWeek,
            disabledPastDates,
            disabledDates,
        } = this.options;
        const day = date.getDate();
        const weekday = date.getDay() as IWeekdays;
        const dayOptions: IDayOptions = {
            date,
            dateString: {
                day: date.toLocaleDateString(lang, { day: format.day }),
                month: date.toLocaleDateString(lang, { month: format.month }),
                year: date.toLocaleDateString(lang, { year: format.year }),
                weekday: date.toLocaleDateString(lang, {
                    weekday: format.weekday,
                }),
            },
            formatted: date.toLocaleDateString(lang, {
                day: format.day,
                month: format.month,
                year: format.year,
            }),
            details: {
                isToday: false,
                isWeekend: false,
                isSelected: false,
                isRange: false,
                isDisabled: false,
                isLocked: false,
                isHighlighted: false,
            },
        };

        // Determining if the day is today.
        if (isToday(date)) {
            dayOptions.details.isToday = true;
        }

        // Determining if the day is weekday.
        if (weekday === DAYS_WEEK.SUNDAY || weekday === DAYS_WEEK.SATURDAY) {
            dayOptions.details.isWeekend = true;
        }

        // Determining if the day is selected based on specific dates or a range of dates.
        if (
            selectedDates &&
            selectedDates.some((day) => {
                if (isArray(day)) {
                    const [startDate, endDate] = day as Date[];
                    return (
                        (isSameDay(date, startDate) ||
                            isDateAfter(date, startDate)) &&
                        (isSameDay(date, endDate) ||
                            isDateBefore(date, endDate))
                    );
                } else {
                    return isSameDay(day as Date, date);
                }
            })
        ) {
            dayOptions.details.isSelected = true;
            dayOptions.details.isRange = isArray(selectedDates[0]); // If it's a range, set isRange to true.
        }

        // Determining if the day is locked.
        if (
            locked || // If the entire calendar or a specific day is locked, it should be considered locked.
            (minDate && isDateAfter(date, minDate)) || // If a `minDate` is specified and the date is after the `minDate`, the day should be considered locked.
            (maxDate && isDateBefore(date, maxDate)) // If a `maxDate`` is specified and the date is before the `maxDate`, the day should be considered locked.
        ) {
            dayOptions.details.isLocked = true; // Set the isLocked property to true to indicate the day is locked.
        }

        // Determining if the day is disabled based on specific dates, weekdays, or past dates.
        if (
            (disabledDates &&
                (isArray(disabledDates[0]) // Determining if the day is disabled based on a range of dates.
                    ? disabledDates.some(
                          (day) =>
                              Array.isArray(day) &&
                              (isSameDay(date, day[0] as Date) ||
                                  isDateAfter(date, day[0] as Date)) &&
                              (isSameDay(date, day[1] as Date) ||
                                  isDateBefore(date, day[1]))
                      )
                    : disabledDates.some(
                          (day) => isSameDay(day as Date, date) // Determining if the day is disabled based on specific dates.
                      ))) ||
            (disabledDaysOfWeek && disabledDaysOfWeek.includes(weekday)) || // If the weekday is in the `disabledDaysOfWeek`` array, the day should be considered disabled.
            (disabledPastDates && isDateBefore(date, this.today)) // If `disabledPastDates` is true and the date is before the current date, the day should be considered disabled.
        ) {
            dayOptions.details.isDisabled = true; // Set the isDisabled property to true to indicate the day is disabled.
        }

        this.days[day] = dayOptions;
    }
}
