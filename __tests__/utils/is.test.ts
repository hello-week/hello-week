import {
    isString,
    isDef,
    isTrue,
    isFalse,
    isObject,
    isNull,
    isFunction,
    isArray,
} from '../../src/utils/is';

describe('Utils:is', () => {
    it('should check if parameter is STRING', () => {
        expect(isString('1')).toBeTruthy();
        expect(isString(undefined)).toBeFalsy();
        expect(isString(1)).toBeFalsy();
    });

    it('should check if parameter is NOT undefined', () => {
        expect(isDef(1)).toBeTruthy();
        expect(isDef('1')).toBeTruthy();

        expect(isDef(undefined)).toBeFalsy();
        expect(isDef(null)).toBeFalsy();
    });

    it('should check if parameter is TRUE', () => {
        expect(
            isTrue(new Date().getMonth() === new Date().getMonth())
        ).toBeTruthy();
        expect(isTrue(new Date() === new Date())).toBeFalsy();
    });

    it('should check if parameter is FALSE', () => {
        expect(
            isFalse(new Date().getMonth() === new Date().getMonth())
        ).toBeFalsy();
        expect(isFalse(new Date() === new Date())).toBeTruthy();
    });

    it('should check if parameter is NULL', () => {
        expect(isNull('1')).toBeFalsy();
        expect(isNull(null)).toBeTruthy();
    });

    it('should check if parameter is OBJECT', () => {
        expect(isObject('1')).toBeFalsy();
        expect(isObject({})).toBeTruthy();
    });

    it('should check if parameter is ARRAY', () => {
        expect(isArray({})).toBeFalsy();
        expect(isArray([])).toBeTruthy();
        expect(isArray([1])).toBeTruthy();
    });

    it('should check if parameter is FUNCTION', () => {
        const func = jest.fn();
        expect(isFunction(func)).toBeTruthy();
    });
});
