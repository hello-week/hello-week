/**
 * Checks if two dates represent the same day (day, month, and year).
 *
 * @param day1 - The first date to compare.
 * @param day2 - The second date to compare.
 * @returns A boolean indicating whether the two dates represent the same day.
 */
export function isSameDay(day1: Date, day2: Date): boolean {
    return (
        day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear()
    );
}

/**
 * Checks if a date is after another date.
 *
 * @param date - The date to check.
 * @param dateToCompare - The date to compare against.
 * @returns A boolean indicating whether the first date is after the second date.
 */
export function isDateAfter(date: Date, dateToCompare: Date): boolean {
    return date.getTime() > dateToCompare.getTime();
}

/**
 * Checks if a date is before another date.
 *
 * @param date - The date to check.
 * @param dateToCompare - The date to compare against.
 * @returns A boolean indicating whether the first date is before the second date.
 */
export function isDateBefore(date: Date, dateToCompare: Date): boolean {
    return date.getTime() < dateToCompare.getTime();
}

/**
 * Checks if two dates represent the same month and year.
 *
 * @param source - The first date to compare.
 * @param target - The second date to compare.
 * @returns A boolean indicating whether the two dates represent the same month and year.
 */
export function isSameMonthAndYear(source: Date, target?: Date): boolean {
    return (
        target &&
        source.getFullYear() === target.getFullYear() &&
        source.getMonth() === target.getMonth()
    );
}

/**
 * Checks if two dates represent the same date (day, month, year).
 *
 * @param source - The first date to compare.
 * @param target - The second date to compare.
 * @returns A boolean indicating whether the two dates represent the same date.
 */
export function isSameDate(source: Date, target: Date): boolean {
    return (
        isSameMonthAndYear(source, target) &&
        source.getDate() === target.getDate()
    );
}

/**
 * Checks if a date represents today's date.
 *
 * @param date - The date to check.
 * @returns A boolean indicating whether the date represents today's date.
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    return isSameDate(today, date);
}
