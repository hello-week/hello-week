import { config } from '../core/config.ts';

type CallbackFunction = (...args: any[]) => void;

/**
 * Create HTML elements for Hello Week.
 * @param {string}      className
 * @param {HTMLElement} parentElement
 * @param {string} textNode
 * @public
 */
export function creatHTMLElement(
        el: HTMLElement,
        className: string,
        parentElement: HTMLElement,
        textNode?: string | undefined
    ) {

    let elem = el.querySelector('.' + className);

    if (!elem) {
        elem = document.createElement('div');
        elem.classList.add(className);
        if (!textNode) {
            const text = document.createTextNode(textNode as string);
            elem.appendChild(text);
        }
        parentElement.appendChild(elem);
    }
    return elem;
}

export function setDataAttr(el: HTMLElement, name: string, value: string) {
    return el.setAttribute(name, value);
}

export function setStyle(el: HTMLElement, prop: string, value: string) {
    return el.style.setProperty(prop, value);
}

export function addClass(el: HTMLElement, className: string) {
    return el.classList.add(className);
}

export function removeClass(el: HTMLElement, className: string) {
    return el.classList.remove(className);
}

export function toggleClass(el: HTMLElement, className: string) {
    return el.classList.toggle(className);
}

/**
 * Reads a file.
 * @param      {string}    file
 * @param      {Function}  callback
 * @public
 */
export function readFile(file: string, callback: CallbackFunction): void {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

export function getIndexForEventTarget(daysOfMonth: any, target: HTMLElement): number {
    return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

export function extend(options: CallbackFunction, configurations?: any): object {
    const settings = configurations ? configurations : config;

    return Object.assign(settings, options);
}
