export function isString(value: unknown) {
    return typeof value === 'string';
}

export function isNumber(value: unknown) {
    return typeof value === 'number' && isFinite(value);
}

export function isDef(value: unknown) {
    return value !== undefined && value !== null;
}

export function isTrue(value: unknown) {
    return value === true;
}

export function isFalse(value: unknown) {
    return value === false;
}

export function isNull(value: unknown) {
    return value === null;
}

export function isNan(value: unknown) {
    return Number.isNaN(value);
}

export function isObject(value: unknown) {
    return (
        value !== null && typeof value === 'object' && Object(value) === value
    );
}

export function isArray(value: unknown) {
    return value !== null && Array.isArray(value);
}

export function isFunction(value: unknown) {
    return typeof value === 'function';
}

export function isDate(value: unknown): value is Date {
    return toString.call(value) === '[object Date]';
}

export function isDomNode(value: unknown) {
    return (
        value instanceof HTMLElement &&
        isObject(value) &&
        isNumber(value) &&
        value.nodeType > 0
    );
}
