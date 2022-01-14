export function isDef(val: unknown): boolean {
    return val !== undefined && val !== null;
}

export function isTrue(val: unknown): boolean {
    return val === true;
}

export function isFalse(val: unknown): boolean {
    return val === false;
}

export function isNull(val: unknown): boolean {
    return val === null;
}

export function isObject(obj: unknown): boolean {
    return obj !== null && typeof obj === 'object';
}

export function isArray(obj: unknown): boolean {
    return obj !== null && Array.isArray(obj);
}

export function isFunction(func: unknown): boolean {
    return typeof func === 'function';
}

export function isString(val: unknown): boolean {
    return typeof val === 'string';
}
