import { formatDateToCompare } from './format';

export function isAfter(input: Date | string, date: Date | string) {
    return formatDateToCompare(input) > formatDateToCompare(date);
}

export function isBefore(input: Date | string, date: Date | string) {
    return formatDateToCompare(input) < formatDateToCompare(date);
}

export function isBetween(
    to: Date | string,
    from: Date | string,
    date: Date | string
) {
    return isAfter(date, to) && isBefore(date, from);
}

export function isSame(input: any, date: any) {
    return formatDateToCompare(input) === formatDateToCompare(date);
}

export function isSameOrAfter(input: any, date: any) {
    return isSame(input, date) || isAfter(input, date);
}

export function isSameOrBefore(input: any, date: any) {
    return isSame(input, date) || isBefore(input, date);
}
