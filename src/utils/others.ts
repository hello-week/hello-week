import { CallbackFunction } from '../types';

export function readFile(file: string, callback: CallbackFunction): void {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", file, true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

export function getIndexForEventTarget(daysOfMonth: NodeList, target: EventTarget): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

export function checkUrl(str: string) {
    const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return regexp.test(str);
}
