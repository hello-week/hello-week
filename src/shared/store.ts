import { IOptions } from '../interfaces/index';
import { defaults } from '../shared/index';
import { createStore } from '../store/index';

export const useOptions = {
    store: createStore(defaults),
    set(options: IOptions) {
        this.store.setState(options);
    },
    get() {
        return this.store.getState();
    }
}
