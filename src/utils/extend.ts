import { defaultOptions } from '../core/options';

export function extend<T>(options: T, configurations?: T): T {
    return Object.assign(configurations || defaultOptions, options);
}
