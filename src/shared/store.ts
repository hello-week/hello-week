import { StoreOptions, StoreLangs } from '../interfaces/index';
import { defaults } from '../shared/index';
import { createStore } from '../store/index';

export const useOptions: StoreOptions = {
    store: createStore(defaults),
    set(options) {
        this.store.setState(options);
    },
    get() {
        return this.store.getState();
    },
};

export const useLangs: StoreLangs = {
    store: createStore(defaults),
    set(options) {
        this.store.setState(options);
    },
    get() {
        return this.store.getState();
    },
};
