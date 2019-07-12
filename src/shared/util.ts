import { config } from '../core/config';

type CallbackFunction = (...args: any[]) => void;

/**
 * Reads a file.
 * @param      {string}    file
 * @param      {Function}  callback
 * @public
 */
export function readFile(file: string, callback: CallbackFunction): void {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

export function getIndexForEventTarget(daysOfMonth: any, target: HTMLElement): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

export function extend(options: CallbackFunction, configurations?: any): object {
    const settings = configurations ? configurations : config;

    return Object.assign(settings, options);
}
