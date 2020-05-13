export function getIndexForEventTarget(
    daysOfMonth: any,
    target: HTMLElement
): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}
