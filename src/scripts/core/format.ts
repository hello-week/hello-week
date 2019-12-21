import { defaults } from './../shared/options';

export function toDate(date: Date) {
  const dt = new Date(date);
  return defaultFormat(dt.getDate(), dt.getMonth(), dt.getFullYear());
}

export function defaultFormat(day: number, month: number, year: number): string {
  return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}

export function formatDate(date: Date | string | number, langs: any, formats: string = defaults.format): string {
  const dt = new Date(date);
  formats = formats.replace('dd', dt.getDate().toString());
  formats = formats.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
  formats = formats.replace('mm', (dt.getMonth() + 1).toString());
  formats = formats.replace('MMM', langs.months[dt.getMonth()]);
  formats = formats.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString());
  formats = formats.replace('mmm', langs.monthsShort[dt.getMonth()]);
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

export function formatDateToCompare(date?: number | string | Date): number {
  // new Intl.DateTimeFormat({
  //   timeZone: 'America/Anchorage'
  // }).format(new Date());
  const dt = new Date(date);
  return Number(
    '' + dt.getFullYear() + (dt.getMonth() + 1) + (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString()
  );
}
