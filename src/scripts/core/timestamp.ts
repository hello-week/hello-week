import { defaults } from './../shared/options';

/**
 * Set date timestamp to human format.
 *
 * @param      {number}  timestamp
 * @param      {string}  format
 * @return     {string}
 */
export function timestampToHuman(timestamp: number, langs: any, format: string = 'YYYY-MM-DD'): string {
  const dt = new Date(timestamp);
  format = format.replace('dd', dt.getDate().toString());
  format = format.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
  format = format.replace('mm', (dt.getMonth() + 1).toString());
  format = format.replace('MMM', langs.months[dt.getMonth()]);
  format = format.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString());
  format = format.replace('mmm', langs.monthsShort[dt.getMonth()]);
  format = format.replace('yyyy', dt.getFullYear().toString());
  format = format.replace('YYYY', dt.getFullYear().toString());
  format = format.replace(
    'YY',
    dt
      .getFullYear()
      .toString()
      .substring(2)
  );
  format = format.replace(
    'yy',
    dt
      .getFullYear()
      .toString()
      .substring(2)
  );
  return format;
}

/**
 * Set date human format to timestamp.
 *
 * @param      {string}
 * @return     {number}
 */
export function humanToTimestamp(date?: string): number {
  if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
    throw new Error(`The date ${date} is not valid!`);
  }

  if (date || typeof date === 'string') {
    return new Date(date + 'T00:00:00Z').getTime();
  }
  return new Date().setHours(0, 0, 0, 0);
}

export function setToTimestamp(date?: string): number {
  if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
    throw new Error(`The date ${date} is not valid!`);
  }

  if (date || typeof date === 'string') {
    return new Date(date + 'T00:00:00Z').getTime();
  }
  return new Date().setHours(0, 0, 0, 0);
}
