import { date } from './dates';

/**
 * Set min date.
 * @param {string} date
 */
export function setMinDate(dt: number | string) {
  const min = date(dt);
  min.setHours(0, 0, 0, 0);
  return min.setDate(min.getDate() - 1);
}

/**
 * Set max date.
 * @param {string} date
 */
export function setMaxDate(dt: number | string) {
  const max = date(dt);
  max.setHours(0, 0, 0, 0);
  return max.setDate(max.getDate() + 1);
}
