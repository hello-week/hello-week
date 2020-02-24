export default class Store {
    private listeners;
    private state;
    constructor(state: any);
    subscribe(listener: any): () => void;
    unsubscribe(listener: any): void;
    setState(state: any, action: any): void;
    getState(): any;
}
