import { extend } from '../util/index';
export function createStore(state?: any) {
    let listeners = [];
    state = state || {};

    function unsubscribe(listener) {
        const out = [];
        for (const i of listeners) {
            if (listeners[i] === listener) {
                listener = null;
            } else {
                out.push(listeners[i]);
            }
        }
        listeners = out;
    }

    function setState(update: any, overwrite?: boolean, action?: any) {
        state = overwrite ? update : extend(extend({}, state), update);
        const currentListeners = listeners;
        for (const i of currentListeners) {
            currentListeners[i](state, action);
        }
    }
    return {
        action(action) {
            function apply(result) {
                setState(result, false, action);
            }

            return function () {
                const args = [state];
                for (const i of arguments) {
                    args.push(arguments[i]);
                }
                const ret = action.apply(this, args);
                if (ret !== null) {
                    if (ret.then) return ret.then(apply);
                    return apply(ret);
                }
            };
        },
        setState,
        subscribe(listener) {
            listeners.push(listener);
            return () => {
                unsubscribe(listener);
            };
        },
        unsubscribe,
        getState() {
            return state;
        },
    };
}
