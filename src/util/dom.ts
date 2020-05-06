import { isDef } from './types';

export function setAttr(el: HTMLElement, name: string, value: string) {
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

export function existElement(className: string, where: HTMLElement) {
    return isDef(where)
        ? where.querySelector(`.${className}`)
        : document.querySelector(`.${className}`);
}
