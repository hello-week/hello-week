/**
 * Create HTML elements for Hello Week.
 * @param {string}      className
 * @param {HTMLElement} parentElement
 * @param {string} textNode
 * @public
 */
export function creatElement(
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
