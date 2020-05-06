import { createStore } from '../src/store';

it('should be instantiable', () => {
    const store = createStore();
    expect(store).toMatchObject({
        setState: expect.any(Function),
        getState: expect.any(Function),
        subscribe: expect.any(Function),
        unsubscribe: expect.any(Function),
    });
});

it('should update state in-place', () => {
    const store = createStore();
    expect(store.getState()).toMatchObject({});
    store.setState({ a: 'b' });
    expect(store.getState()).toMatchObject({ a: 'b' });
    store.setState({ c: 'd' });
    expect(store.getState()).toMatchObject({ a: 'b', c: 'd' });
    store.setState({ a: 'x' });
    expect(store.getState()).toMatchObject({ a: 'x', c: 'd' });
    store.setState({ c: null });
    expect(store.getState()).toMatchObject({ a: 'x', c: null });
    store.setState({ c: undefined });
    expect(store.getState()).toMatchObject({ a: 'x', c: undefined });
});
