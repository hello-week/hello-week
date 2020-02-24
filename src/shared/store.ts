import { extend } from '../util/index';
export default function createStore(state) {
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

  function setState(update: any) {
    state = extend(extend({}, state), update);
    const currentListeners = listeners;
    for (const i of currentListeners) {
      currentListeners[i](state);
    }
  }
  return {
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
    }
  };
}
