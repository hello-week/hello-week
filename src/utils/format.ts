import { Langs } from '../types';

export function setTimeZone({
    date,
    timezoneOffset,
}: {
    date?: number | string | Date;
    timezoneOffset?: number;
}) {
    const dt = date ? new Date(date) : new Date();
    timezoneOffset = timezoneOffset ? timezoneOffset : dt.getTimezoneOffset();
    dt.setTime(dt.getTime() + timezoneOffset * 60 * 1000);
    return dt;
}

export function timestampToHuman({
    timestamp,
    format,
    langs,
    timezoneOffset,
}: {
    timestamp: number;
    format: string;
    langs: Langs;
    timezoneOffset?: number;
}): string {
    const dt = setTimeZone({ date: timestamp, timezoneOffset });
    format = format.replace('dd', dt.getDate().toString());
    format = format.replace(
        'DD',
        (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString()
    );
    format = format.replace('mmm', langs.monthsShort[dt.getMonth()]);
    format = format.replace('MMM', langs.months[dt.getMonth()]);
    format = format.replace('mm', (dt.getMonth() + 1).toString());
    format = format.replace(
        'MM',
        (dt.getMonth() + 1 > 9
            ? dt.getMonth() + 1
            : '0' + (dt.getMonth() + 1)
        ).toString()
    );
    format = format.replace('yyyy', dt.getFullYear().toString());
    format = format.replace('YYYY', dt.getFullYear().toString());
    format = format.replace('yy', dt.getFullYear().toString().substring(2));
    format = format.replace('YY', dt.getFullYear().toString().substring(2));
    return format;
}

export function formatDate(day: number, month: number, year: number): string {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}

export function setToTimestamp(date?: string | Date): number {
    if (typeof date === 'object') {
        return date.setHours(0, 0, 0, 0);
    }

    if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
        throw new Error(`The date ${date} is not valid!`);
    }

    if (date || typeof date === 'string') {
        return new Date(date).setHours(0, 0, 0, 0);
    }

    return new Date().setHours(0, 0, 0, 0);
}
