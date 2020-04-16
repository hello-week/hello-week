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

it('should invoke subscriptions', () => {
    const store = createStore();

    const sub1 = jest.fn();
    const sub2 = jest.fn();

    const rval = store.subscribe(sub1);
    expect(rval).toBeInstanceOf(Function);

    store.setState({ a: 'b' });
    expect(sub1).toBeCalledWith(store.getState());

    store.subscribe(sub2);
    store.setState({ c: 'd' });

    expect(sub1).toHaveBeenCalledTimes(2);
    expect(sub1).toHaveBeenLastCalledWith(store.getState());
    expect(sub2).toBeCalledWith(store.getState());
});

it('should unsubscribe', () => {
    const store = createStore();

    const sub1 = jest.fn();
    store.subscribe(sub1);

    store.setState({ a: 'b' });
    expect(sub1).toBeCalled();

    sub1.mockClear();

    store.unsubscribe(sub1);
    store.setState({ e: 'f' });
    expect(sub1).not.toBeCalled();
});
