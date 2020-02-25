import { IStoreOptions, IStoreLangs } from '../interfaces/index';
import { defaults } from '../shared/index';
import { createStore } from '../store/index';

export const useOptions: IStoreOptions = {
    store: createStore(defaults),
    set(options) {
        this.store.setState(options);
    },
    get() {
        return this.store.getState();
    }
}

export const useLangs: IStoreLangs = {
    store: createStore(defaults),
    set(options) {
        this.store.setState(options);
    },
    get() {
        return this.store.getState();
    }
}
