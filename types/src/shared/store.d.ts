export declare function createStore(state: any): {
    setState: (update: any) => void;
    subscribe(listener: any): () => void;
    unsubscribe: (listener: any) => void;
    getState(): any;
};
