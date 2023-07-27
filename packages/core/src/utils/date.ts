export function isSameDay(day1: Date, day2: Date) {
    return (
        day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear()
    );
}

export function isDateAfter(date: Date, dateToCompare: Date) {
    return date.getTime() > dateToCompare.getTime();
}

export function isDateBefore(date: Date, dateToCompare: Date) {
    return date.getTime() < dateToCompare.getTime();
}

export function isSameMonthAndYear(source: Date, target?: Date) {
    return (
        target &&
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

