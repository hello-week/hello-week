import { Options, Langs } from './index';

export interface StoreOptions {
    store: any;
    set: (data: Partial<Options>) => void;
    get: () => Options;
}

export interface StoreLangs {
    store: any;
    set: (data: Partial<Langs>) => void;
    get: () => Langs;
}
