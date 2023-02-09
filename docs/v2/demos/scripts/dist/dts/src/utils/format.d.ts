import { Langs } from '../types';
export declare function setTimeZone({ date, timezoneOffset, }: {
    date?: number | string | Date;
    timezoneOffset?: number;
}): Date;
export declare function timestampToHuman({ timestamp, format, langs, timezoneOffset, }: {
    timestamp: number;
    format: string;
    langs: Langs;
    timezoneOffset?: number;
}): string;
export declare function formatDate(day: number, month: number, year: number): string;
export declare function setToTimestamp(date?: string | Date): number;
