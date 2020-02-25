import { IOptions, ILangs } from './index';
export interface IStoreOptions {
    store: any;
    set: (data: Partial<IOptions>) => void;
    get: () => IOptions;
}
export interface IStoreLangs {
    store: any;
    set: (data: Partial<ILangs>) => void;
    get: () => ILangs;
}
