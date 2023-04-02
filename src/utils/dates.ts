export type Week = (Date | null)[];

export enum Weekdays {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

export enum TimeUnit {
    Second = 1000,
    Minute = Second * 60,
    Hour = Minute * 60,
    Day = Hour * 24,
    Week = Day * 7,
    Year = Day * 365,
}

export interface Range {
    start: Date;
    end: Date;
}

export type Year = number;

const WEEK_LENGTH = 7;

const WEEKDAYS = [
    Weekdays.Sunday,
    Weekdays.Monday,
    Weekdays.Tuesday,
    Weekdays.Wednesday,
    Weekdays.Thursday,
    Weekdays.Friday,
    Weekdays.Saturday,
];

function getOrderedWeekdays(weekStartsOn: Weekdays): Weekdays[] {
    const weekDays = [...WEEKDAYS];
    const restOfDays = weekDays.splice(weekStartsOn);
    return [...restOfDays, ...weekDays];
}

export function getYearForRange({ start, end }: Range) {
    if (start) {
        return start.getFullYear();
    }
    if (end) {
        return end.getFullYear();
    }
    return new Date().getFullYear();
}

export function getMonthForRange({ start, end }: Range): Months {
    if (start) {
        return start.getMonth();
    }
    if (end) {
        return end.getMonth();
    }
    return new Date().getMonth();
}

export function abbreviationForWeekday(weekday: Weekdays) {
    return Weekdays[weekday].substring(0, 2);
}

export function getWeeksForMonth(
    month: Months,
    year: Year,
    weekStartsOn: Weekdays = Weekdays.Sunday
): Week[] {
    const firstOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstOfMonth.getDay();
    const weeks: Week[] = [[]];

    let currentWeek = weeks[0];
    let currentDate = firstOfMonth;

    const orderedWeekday = getOrderedWeekdays(weekStartsOn);
    for (let i = 0; i < orderedWeekday.indexOf(firstDayOfWeek); i++) {
        currentWeek.push(null);
    }

    while (currentDate.getMonth() === month) {
        if (currentWeek.length === WEEK_LENGTH) {
            currentWeek = [];
            weeks.push(currentWeek);
        }

        currentWeek.push(currentDate);
        currentDate = new Date(year, month, currentDate.getDate() + 1);
    }

    while (currentWeek.length < 7) {
        currentWeek.push(null);
    }

    return weeks;
}

export function dateIsInRange(day: Date | null, range: Range) {
    if (day == null) {
        return false;
    }

    const { start, end } = range;

    return Boolean(start && day > start && end && day < end);
}

export function dateIsSelected(day: Date | null, range: Range) {
    if (day == null) {
        return false;
    }
    const { start, end } = range;

    return Boolean(
        (start && isSameDay(start, day)) || (end && isSameDay(end, day))
    );
}

export function isSameDay(day1: Date, day2: Date) {
    return (
        day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear()
    );
}

export function getDateDiff(
    resolution: TimeUnit,
    date: Date,
    today = new Date()
) {
    return Math.floor((today.getTime() - date.getTime()) / resolution);
}

export function getNewRange(range: Range | undefined, selected: Date): Range {
    if (range == null) {
        return { start: selected, end: selected };
    }

    const { start, end } = range;

    if (end && (isDateAfter(start, end) || isDateBefore(start, end))) {
        return { start: selected, end: selected };
    }

    if (start) {
        if (isDateBefore(selected, start)) {
            return { start: selected, end: selected };
        }
        return { start, end: selected };
    }

    if (end) {
        if (isDateBefore(selected, end)) {
            return { start: selected, end };
        }
        return { start: start || end, end: selected };
    }

    return { start: selected, end: selected };
}

export function getNextDisplayMonth(month: Months): Months {
    if (Months[month] === Months[11]) {
        return 0;
    }
    return (month as number) + 1;
}

export function getNextDisplayYear(month: Months, year: Year): Year {
    if (Months[month] === Months[11]) {
        return year + 1;
    }
    return year;
}

export function getPreviousDisplayMonth(month: Months): Months {
    if (Months[month] === Months[0]) {
        return 11;
    }
    return (month as number) - 1;
}

export function getPreviousDisplayYear(month: Months, year: Year): Year {
    if (Months[month] === Months[0]) {
        return year - 1;
    }
    return year;
}

export function isDateAfter(date: Date, dateToCompare: Date) {
    return date.getTime() > dateToCompare.getTime();
}

export function isDateBefore(date: Date, dateToCompare: Date) {
    return date.getTime() < dateToCompare.getTime();
}

export function isSameMonthAndYear(source: Date, target: Date) {
    return (
        source.getFullYear() === target.getFullYear() &&
        source.getMonth() === target.getMonth()
    );
}

export function isSameDate(source: Date, target: Date) {
    return (
        isSameMonthAndYear(source, target) &&
        source.getDate() === target.getDate()
    );
}

export function isToday(date: Date) {
    const today = new Date();
    return isSameDate(today, date);
}

export function isYesterday(date: Date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return isSameDate(yesterday, date);
}
