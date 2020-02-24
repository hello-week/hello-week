import { extend } from '../util/index';

export default class Store {
  private listeners: any;
  private state: any;
  constructor(state) {
    this.listeners = [];
    this.state = state || {};
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(listener) {
    const out = [];
    for (const i of this.listeners.length) {
      if (this.listeners[i] === listener) {
        listener = null;
      } else {
        out.push(this.listeners[i]);
      }
    }
    this.listeners = out;
  }

  setState(state, action) {
    this.state = extend(extend({}, this.state), state);
    const currentListeners = this.listeners;
    for (const i of currentListeners.length) {
      currentListeners[i](this.state, action);
    }
  }

  getState() {
    return this.state;
  }
}
