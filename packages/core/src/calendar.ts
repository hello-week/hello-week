import { IWeekdaysValues, ICalendar, IDayOptions, IWeek } from './types';
import {
  isToday,
  isDateAfter,
  isDateBefore,
  isSameDay,
  isDateInRange,
} from './utils/date';
import { isArray } from './utils/predicate';
import { DAYS_WEEK, WEEK_LENGTH, WEEKDAYS } from './constant';

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
    const defaultOptions: ICalendar = {
      ...{
        lang: 'en-UK',
        defaultDate: new Date(),
        formatDate: {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          weekday: 'short',
        },
        weekStart: 0,
        highlightedToday: true,
        disabledPastDates: false,
        locked: false,
      },
      ...options,
    };

    // Configuration options for the calendar.
    this.options = defaultOptions;
    // The current date in the calendar.
    this.date = new Date(defaultOptions.defaultDate || '');
    // Set the day of the current date to the first day of the month.
    this.date.setDate(1);
    // Today's date with time set to midnight (00:00:00).
    this.today = new Date(new Date().setHours(0, 0, 0, 0));
    // Create array with days of month.
    this.createMonth();
  }

  /**
   * Sets calendar options.
   * This method allows you to modify the calendar options either by providing a new options object or by using a callback function to modify the existing options.
   *
   * @remarks
   * The `options` parameter can be either an options object of type {@link IOptions},
   * which will replace all current options with the provided ones,
   * or a callback function that takes the previous options as an argument and returns the updated options.
   * When using a callback, the function allows you to modify multiple options at once while preserving the previous options that are not explicitly modified.
   *
   * @example
   * ```ts
   * // Replace all current options with new options.
   * calendar.setOptions({
   *     lang: 'en-US',
   *     format: {
   *         day: 'numeric',
   *         month: 'long',
   *         year: 'numeric',
   *         weekday: 'short',
   *     },
   *     weekStart: 1,
   * });
   *```
   *
   * @example
   * ```ts
   * // Modify specific options using a callback function.
   * calendar.setOptions((prev) => ({
   *     ...prev,
   *     lang: 'fr-FR',
   *     weekStart: 0,
   * }));
   * ```
   *
   * @param options - The calendar options, or a callback function with previous options.
   */
  public setOptions(options: ((prev: ICalendar) => ICalendar) | ICalendar) {
    if (typeof options === 'function') {
      this.options = options(this.options);
    } else {
      this.options = options;
    }

    // Create array with days of month.
    this.createMonth();
  }

  /**
   * Move to the previous month.
   * This method updates the current date to the previous month.
   */
  public prevMonth(): void {
    const prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.createMonth();
  }

  /**
   * Move to the next month.
   * This method updates the current date to the next month.
   */
  public nextMonth(): void {
    const nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);
    this.createMonth();
  }

  /**
   * Move to the previous year.
   * This method updates the current date to the previous year.
   */
  public prevYear(): void {
    const prevYear = this.date.getFullYear() - 1;
    this.date.setFullYear(prevYear);
    this.createMonth();
  }

  /**
   * Move to the next year.
   * This method updates the current date to the next year.
   */
  public nextYear(): void {
    const nextYear = this.date.getFullYear() + 1;
    this.date.setFullYear(nextYear);
    this.createMonth();
  }

  /**
   * Sets the calendar to a specific date and updates the displayed month.
   * @param date - The target date to navigate to.
   */
  public gotoDate(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    this.date.setFullYear(year, month); // Update year and month together
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
          weekday: format?.weekday,
        })
      );

      currentDate = new Date(year, month, currentDate.getDate() + 1);
    }

    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }

    return weeks[1] as string[];
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
  public getToday(options?: { format?: Intl.DateTimeFormatOptions }): string {
    const { lang, formatDate } = this.options;
    const format = options?.format || formatDate;
    return this.today.toLocaleDateString(lang, {
      ...format,
      weekday: undefined,
    });
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
    const format = options?.format || formatDate?.month;
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
    const format = options?.format || formatDate?.year;
    return this.date.toLocaleDateString(lang, { year: format });
  }

  private createMonth(): void {
    // Initialize the `days` with empty array
    this.days = [];
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
      highlightedToday,
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
      date: new Date(date.setHours(0, 0, 0, 0)),
      dateObject: {
        day: date.toLocaleDateString(lang, { day: format?.day }),
        month: date.toLocaleDateString(lang, { month: format?.month }),
        year: date.toLocaleDateString(lang, { year: format?.year }),
        weekday: date.toLocaleDateString(lang, {
          weekday: format?.weekday,
        }),
      },
      dateFormatted: date.toLocaleDateString(lang, {
        day: format?.day,
        month: format?.month,
        year: format?.year,
      }),
      is: {
        today: false,
        weekend: false,
        selected: false,
        highlighted: false,
        range: false,
        startRange: false,
        endRange: false,
        locked: false,
        disabled: false,
      },
    };

    // Determining if the day is today.
    if (isToday(date) && highlightedToday) {
      dayOptions.is.today = true;
    }

    // Determining if the day is weekday.
    if (weekday === DAYS_WEEK.SUNDAY || weekday === DAYS_WEEK.SATURDAY) {
      dayOptions.is.weekend = true;
    }

    // Determining if the day is selected based on specific dates or a range of dates.
    if (
      selectedDates &&
      selectedDates.some((day) => {
        if (isArray(day)) {
          // For a range of dates, check if the day falls within the range.
          const [startDate, endDate] = day;
          // If the day is the same as the start date or after the start date, and the day is the same as the end date or before the end date, it's within the range.
          const withinRange = isDateInRange(date, startDate, endDate);
          // Update range-related properties.
          dayOptions.is.range = withinRange;
          dayOptions.is.startRange = isSameDay(date, startDate);
          dayOptions.is.endRange = isSameDay(date, endDate);
          return withinRange;
        } else {
          // For specific dates, check if the day matches any of the selected dates.
          return isSameDay(day as Date, date);
        }
      })
    ) {
      dayOptions.is.selected = true;
    }

    // Determine if the current day is highlighted based on specific dates or date ranges.
    if (
      highlightedDates?.some(({ days, ...restProps }) => {
        const isHighlighted = days.some((day) => {
          if (isArray(day)) {
            // Handle date range: Extract start and end dates.
            const [startDate, endDate] = day;
            // Check if the current date falls within the range.
            return isDateInRange(
              date,
              startDate as Date,
              endDate as Date
            );
          } else {
            // Handle specific dates: Check if the current date matches any of the highlighted dates.
            return isSameDay(day as Date, date);
          }
        });

        if (isHighlighted) {
          dayOptions.details = restProps; // Assign additional properties for highlighting.
          return true; // Indicate that the day is highlighted.
        }

        return false; // Indicate that the day is not highlighted.
      })
    ) {
      dayOptions.is.highlighted = true;
    }

    // Determining if the day is disabled based on specific dates, weekdays, or past dates.
    if (
      (disabledDates &&
        disabledDates.some((day) => {
          // Checking if the day is disabled based on a range of dates.
          if (isArray(day)) {
            const [startDate, endDate] = day;
            // For each range of dates, check if the day falls within the range.
            return isDateInRange(date, startDate, endDate);
          } else {
            return isSameDay(day as Date, date);
          }
        })) || // Checking if the day is disabled based on specific weekdays.
      (disabledDaysOfWeek && disabledDaysOfWeek.includes(weekday)) ||
      // Checking if the day is disabled based on past dates.
      (disabledPastDates && isDateBefore(date, this.today))
    ) {
      dayOptions.is.disabled = true;
    }

    // Determining if the day is locked.
    if (
      locked || // If the entire calendar or a specific day is locked, it should be considered locked.
      (minDate && isDateBefore(date, minDate)) || // If a `minDate` is specified and the date is before the `minDate`, the day should be considered locked.
      (maxDate && isDateAfter(date, maxDate)) // If a `maxDate`` is specified and the date is after the `maxDate`, the day should be considered locked.
    ) {
      dayOptions.is.locked = true; // Set the locked property to true to indicate the day is locked.
    }

    this.days[day - 1] = dayOptions;
  }
}
