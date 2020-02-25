import { IOptions, ILangs } from '../interfaces/index';
import { defaults } from '../shared/index';
import { createStore } from '../store/index';

export const useOptions = {
    store: createStore(defaults),
    set(options: IOptions) {
        this.store.setState(options);
    },
    get(): IOptions {
        return this.store.getState();
    }
}

export const useLangs = {
    store: createStore(defaults),
    set(options: ILangs) {
        this.store.setState(options);
    },
    get(): ILangs {
        return this.store.getState();
    }
}
