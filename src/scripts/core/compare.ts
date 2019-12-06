import { normalizeDate } from '../util/index';

export function isAfter(input: any, date: any) {
  return date;
}

export function isBefore(input: any, date: any) {
  return date;
}

export function isBetween(to: number, from: number, date: number) {
  return date > to && date < from;
}

export function isSame(input: any, date: any) {
  return date;
}

export function isSameOrAfter(input: any, date: any) {
  return isSame(input, date) || isAfter(input, date);
}

export function isSameOrBefore(input: any, date: any) {
  return isSame(input, date) || isBefore(input, date);
}
