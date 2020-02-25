import { IOptions, ILangs } from './index';

export interface IStoreOptions {
    store: any;
    set: (data: IOptions) => void;
    get: () => IOptions;
}


export interface IStoreLangs {
    store: any;
    set: (data: ILangs) => void;
    get: () => ILangs;
}
