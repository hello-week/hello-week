import { config } from './config';

export function formatDate(day: number, month: number, year: number): string {
    return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + (day)).slice(-2)}`;
}

/**
 * Set date timestamp to human format.
 *
 * @param      {number}  timestamp
 * @param      {string}  format
 * @return     {string}
 */
export function timestampToHuman(timestamp: number, lang?: string, format?: any): string {
    const dt = new Date(timestamp);
    return new Intl.DateTimeFormat(
        lang ? lang : config.lang,
        format ? format : config.format).format(dt);
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
