import { isToday, isDateAfter, isDateBefore, isSameDay } from '../utils/date';
import { isArray } from '../utils/is';

type IWeek = (string | null)[];

type IWeekdays = {
    SUNDAY: 0;
    MONDAY: 1;
    TUESDAY: 2;
    WEDNESDAY: 3;
    THURSDAY: 4;
    FRIDAY: 5;
    SATURDAY: 6;
};

type IWeekdaysValues = IWeekdays[keyof IWeekdays];;

type IDayOptions = {
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

interface ICalendar {
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
}

const WEEK_LENGTH = 7;
const WEEKDAYS: IWeekdaysValues[] = [0, 1, 2, 3, 4, 5, 6];
const DAYS_WEEK: IWeekdays = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

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
    highlightedDates: [new Date('2023-07-10'), new Date('2023-07-15')],
    disabledPastDates: false,
    disabledDates: [[new Date('2023-07-15'), new Date('2023-07-20')]],
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

    /**
     * Move to the previous month.
     * This method updates the current date to the previous month.
     */
    public prevMonth(): void {
        const prevMonth = this.date.getMonth() - 1;
        this.date.setMonth(prevMonth);
    }

    /**
     * Move to the next month.
     * This method updates the current date to the next month.
     */
    public nextMonth(): void {
        const nextMonth = this.date.getMonth() + 1;
        this.date.setMonth(nextMonth);
    }

    /**
     * Move to the previous year.
     * This method updates the current date to the previous year.
     */
    public prevYear(): void {
        const prevYear = this.date.getFullYear() - 1;
        this.date.setFullYear(prevYear);
    }

    /**
     * Move to the next year.
     * This method updates the current date to the next year.
     */
    public nextYear(): void {
        const nextYear = this.date.getFullYear() + 1;
        this.date.setFullYear(nextYear);
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
        const firstDayOfWeek = firstOfMonth.getDay() as IWeekdaysValues;
        const weeks: IWeek[] = [[]];
        const orderedWeekday = WEEKDAYS.slice(weekStart).concat(
            WEEKDAYS.slice(0, weekStart)
        );
        const orderedWeekdayIndex = orderedWeekday.indexOf(firstDayOfWeek);

        let currentWeek = weeks[0];
        let currentDate = firstOfMonth;

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
     * @param options - An optional object containing the format for the date.
     * @returns The today's date.
     */
    public getToday(options?: {
        format?: Intl.DateTimeFormatOptions;
    }): string {
        const { lang, formatDate } = this.options;
        const format = options?.format || formatDate;
        return this.today.toLocaleDateString(lang, format);
    }

    /**
     * Get the month string representation for the current month.
     * @param options - An optional object containing the format for the month string.
     * @returns The month string representation.
     */
    public getMonth(options?: {
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
    public getYear(options?: {
        format?: Intl.DateTimeFormatOptions['year'];
    }): string {
        const { lang, formatDate } = this.options;
        const format = options?.format || formatDate.year;
        return this.date.toLocaleDateString(lang, { year: format });
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
            highlightedDates,
            maxDate,
            minDate,
            locked,
            disabledDaysOfWeek,
            disabledPastDates,
            disabledDates,
        } = this.options;
        const day = date.getDate();
        const weekday = date.getDay() as IWeekdaysValues;
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
                today: false,
                weekend: false,
                selected: false,
                highlighted: false,
                range: false,
                locked: false,
                disabled: false,
            },
        };

        // Determining if the day is today.
        if (isToday(date)) {
            dayOptions.details.today = true;
        }

        // Determining if the day is weekday.
        if (weekday === DAYS_WEEK.SUNDAY || weekday === DAYS_WEEK.SATURDAY) {
            dayOptions.details.weekend = true;
        }

        // Determining if the day is selected based on specific dates or a range of dates.
        if (
            selectedDates &&
            selectedDates.some((day) => {
                if (isArray(day)) {
                    // For a range of dates, check if the day falls within the range.
                    const [startDate, endDate] = day as Date[];
                    return (
                        // If the day is the same as the start date or after the start date, and the day is the same as the end date or before the end date, it's within the range.
                        (isSameDay(date, startDate) ||
                            isDateAfter(date, startDate)) &&
                        (isSameDay(date, endDate) ||
                            isDateBefore(date, endDate))
                    );
                } else {
                    // For specific dates, check if the day matches any of the selected dates.
                    return isSameDay(day as Date, date);
                }
            })
        ) {
            dayOptions.details.selected = true; // Set the selected property to true to indicate the day is selected.
            // Check if the selectedDates array is a range, and if so, set range to true.
            dayOptions.details.range = isArray(selectedDates[0]);
        }

        // Determining if the day is highlighted based on specific dates.
        // Determining if the day is highlighted based on specific dates or a range of dates.
        if (
            highlightedDates &&
            highlightedDates.some((day) => {
                if (isArray(day)) {
                    // For a range of dates, check if the day falls within the range.
                    const [startDate, endDate] = day as Date[];
                    return (
                        // If the day is the same as the start date or after the start date, and the day is the same as the end date or before the end date, it's within the range.
                        (isSameDay(date, startDate) ||
                            isDateAfter(date, startDate)) &&
                        (isSameDay(date, endDate) ||
                            isDateBefore(date, endDate))
                    );
                } else {
                    // For specific dates, check if the day matches any of the highlighted dates.
                    return isSameDay(day as Date, date);
                }
            })
        ) {
            dayOptions.details.highlighted = true; // Set the highlighted property to true to indicate the day is highlighted.
        }

        // Determining if the day is disabled based on specific dates, weekdays, or past dates.
        if (
            // Checking if the day is disabled based on a range of dates.
            (disabledDates &&
                (isArray(disabledDates[0])
                    ? disabledDates.some((day) => {
                          // For each range of dates, check if the day falls within the range.
                          if (Array.isArray(day)) {
                              const [startDate, endDate] = day;
                              return (
                                  (isSameDay(date, startDate) ||
                                      isDateAfter(date, startDate)) &&
                                  (isSameDay(date, endDate) ||
                                      isDateBefore(date, endDate))
                              );
                          } else {
                              return false;
                          }
                      })
                    : // Checking if the day is disabled based on specific dates.
                      disabledDates.some((day) =>
                          isSameDay(day as Date, date)
                      ))) ||
            // Checking if the day is disabled based on specific weekdays.
            (disabledDaysOfWeek && disabledDaysOfWeek.includes(weekday)) ||
            // Checking if the day is disabled based on past dates.
            (disabledPastDates && isDateBefore(date, this.today))
        ) {
            dayOptions.details.disabled = true; // Set the disabled property to true to indicate the day is disabled.
        }

        // Determining if the day is locked.
        if (
            locked || // If the entire calendar or a specific day is locked, it should be considered locked.
            (minDate && isDateAfter(date, minDate)) || // If a `minDate` is specified and the date is after the `minDate`, the day should be considered locked.
            (maxDate && isDateBefore(date, maxDate)) // If a `maxDate`` is specified and the date is before the `maxDate`, the day should be considered locked.
        ) {
            dayOptions.details.locked = true; // Set the locked property to true to indicate the day is locked.
        }

        this.days[day] = dayOptions;
    }
}
