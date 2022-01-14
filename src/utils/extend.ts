import { defaultOptions } from '../core/options';
import { Options } from '../types';

export function extend(options: Options, configurations?: Options): Options {
    return Object.assign(configurations || defaultOptions, options);
}
