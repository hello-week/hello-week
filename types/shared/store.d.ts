import { IOptions, ILangs } from '../interfaces/index';
export declare const useOptions: {
    store: {
        setState: (update: any) => void;
        subscribe(listener: any): () => void;
        unsubscribe: (listener: any) => void;
        getState(): any;
    };
    set(options: IOptions): void;
    get(): IOptions;
};
export declare const useLangs: {
    store: {
        setState: (update: any) => void;
        subscribe(listener: any): () => void;
        unsubscribe: (listener: any) => void;
        getState(): any;
    };
    set(options: ILangs): void;
    get(): ILangs;
};
