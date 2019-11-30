import { normalizeDate } from '../util/index'

export function isAfter(input: any, date: any) {
  return date
}

export function isBefore(input: any, date: any) {
  return date
}

export function isBetween(from: number, to: number, date: number) {
  return normalizeDate(date) > normalizeDate(from) && normalizeDate(date) < normalizeDate(to)
}

export function isSame(input: any, date: any) {
  return date
}

export function isSameOrAfter(input: any, date: any) {
  return isSame(input, date) || isAfter(input, date)
}

export function isSameOrBefore(input: any, date: any) {
  return isSame(input, date) || isBefore(input, date)
}
