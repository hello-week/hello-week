export function getIndexForEventTarget(daysOfMonth: NodeList, target: EventTarget): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

