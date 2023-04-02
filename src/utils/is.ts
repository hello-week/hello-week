export function isString(value: unknown): boolean {
    return typeof value === 'string';
}

export function isNumber(value: unknown): boolean {
    return Number.isFinite(value);
}

export function isDef(value: unknown): boolean {
    return value !== undefined && value !== null;
}

export function isTrue(value: unknown): boolean {
    return value === true;
}

export function isFalse(value: unknown): boolean {
    return value === false;
}

export function isNull(value: unknown): boolean {
    return value === null;
}

export function isNan(value: unknown): boolean {
    return Number.isNaN(value);
}

export function isObject(value: unknown): boolean {
    return value !== null && typeof value === 'object' && Object(value) === value;;
}

export function isArray(value: unknown): boolean {
    return value !== null && Array.isArray(value);
}

export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function isDate(value: unknown): boolean {
  return toString.call(value) === '[object Date]';
}

