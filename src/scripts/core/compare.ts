export function isAfter (input, units) {
        return;
}

export function isBefore (input, units) {
        return;
}

export function isBetween (from: string, to: string, units: string) {
        return;
}

export function isSame (input, units) {
    return;
}

export function isSameOrAfter (input, units) {
    return isSame(input, units) || isAfter(input, units);
}

export function isSameOrBefore (input, units) {
    return isSame(input, units) || isBefore(input, units);
}
