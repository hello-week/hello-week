export function getIndexForEventTarget(daysOfMonth: any, target: HTMLElement): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

export function assing(to: any, from: any): object {
    if (typeof Object.assign === "function") {
        return Object.assign(from, to);
    }

    for (const key in from) {
        to[key] = from[key];
    }
    return to;
}

export function isDef(v: any): boolean {
    return v !== undefined && v !== null;
}

export function isTrue(v: any): boolean {
    return v === true;
}

export function isFalse(v: any): boolean {
    return v === false;
}

export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === "object";
}

export function isString(val: string): boolean {
    return typeof val === "string";
}

export function toArray(obj: any) {
    return Object.values(obj);
}
