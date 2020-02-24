import { date } from './dates';
import { toDate } from './format';

/**
 * Set min date.
 * @param {string} date
 */
export function setMinDate(dt: number | string) {
  const min = date(dt);
  return toDate(min.setDate(min.getDate() - 1));
}

/**
 * Set max date.
 * @param {string} date
 */
export function setMaxDate(dt: number | string) {
  const max = date(dt);
  return toDate(max.setDate(max.getDate() + 1));
}
