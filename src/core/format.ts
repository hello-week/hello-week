import { useOptions, useLangs } from '../shared/index';
import { isDef } from '../util/index';

export function toDate(date: Date, timezoneOffset?: number) {
  const dt = setTimeZone(date, timezoneOffset);
  return defaultFormat(dt.getDate(), dt.getMonth(), dt.getFullYear());
}

export function defaultFormat(day: number, month: number, year: number): string {
  return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}

export function formatDate(
  date: Date | string | number,
  formats?: string,
  timezoneOffset?: number
): string {
  const { format } = useOptions.get();
  const { months, monthsShort } = useLangs.get();
  const dt = setTimeZone(date, timezoneOffset);
  formats = formats ? formats : format;
  formats = formats.replace('dd', dt.getDate().toString());
  formats = formats.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
  formats = formats.replace('mm', (dt.getMonth() + 1).toString());
  formats = formats.replace('MMM', months[dt.getMonth()]);
  formats = formats.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString());
  formats = formats.replace('mmm', monthsShort[dt.getMonth()]);
  formats = formats.replace('yyyy', dt.getFullYear().toString());
  formats = formats.replace('YYYY', dt.getFullYear().toString());
  formats = formats.replace(
    'YY',
    dt
      .getFullYear()
      .toString()
      .substring(2)
  );
  formats = formats.replace(
    'yy',
    dt
      .getFullYear()
      .toString()
      .substring(2)
  );
  return formats;
}

export function setTimeZone(date?: number | string | Date, timezoneOffset?: number) {
  const dt = isDef(date) ? new Date(date) : new Date();
  timezoneOffset = timezoneOffset ? timezoneOffset : dt.getTimezoneOffset();
  dt.setTime(dt.getTime() + timezoneOffset * 60 * 1000);
  return dt;
}

export function formatDateToCompare(date?: number | string | Date): number {
  const dt = new Date(date);
  return Number(
    '' + dt.getFullYear() + (dt.getMonth() + 1) + (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString()
  );
}
