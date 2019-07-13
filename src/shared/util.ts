import { config } from '../core/config';

export function getIndexForEventTarget(daysOfMonth: any, target: HTMLElement): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

export function extend(options: any, configurations?: any): object {
    return Object.assign(configurations ? configurations : config, options);
}
