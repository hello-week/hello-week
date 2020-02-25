import { IOptions } from '../interfaces/index';
export declare const useOptions: {
    store: {
        setState: (update: any) => void;
        subscribe(listener: any): () => void;
        unsubscribe: (listener: any) => void;
        getState(): any;
    };
    set(options: IOptions): void;
    get(): any;
};
