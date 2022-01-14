export function creatHTMLElement(
    el: HTMLElement,
    className: string,
    parentElement: HTMLElement | Element,
    textNode: string = null
) {
    let elem = el.querySelector("." + className);
    if (!elem) {
        elem = document.createElement("div");
        elem.classList.add(className);
        if (textNode !== null) {
            const text = document.createTextNode(textNode);
            (<HTMLElement>elem).appendChild(text);
        }
        (<HTMLElement>parentElement).appendChild(elem);
    }
    return elem;
}

export function setDataAttr(el: HTMLElement, name: string, value: string) {
    return el.setAttribute(name, value);
}

export function setStyle(el: HTMLElement, prop: string, value: string) {
    return el.style.setProperty(prop, value);
}

export function addClass(el: HTMLElement | Element, className: string) {
    return el.classList.add(className);
}

export function removeClass(el: HTMLElement, className: string) {
    return el.classList.remove(className);
}

export function toggleClass(el: HTMLElement, className: string) {
    return el.classList.toggle(className);
}
