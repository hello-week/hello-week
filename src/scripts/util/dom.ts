import { isDef } from "./types";
import { cssClasses } from "../shared/constants";

export function render(vnode: any, parentDom?: HTMLElement) {
    // Strings just convert to #text Nodes:
    if (vnode.split) {
        return document.createTextNode(vnode);
    }

    // create a DOM element with the nodeName of our VDOM element:
    const n = document.createElement(vnode.nodeName);

    // copy attributes onto the new node:
    const a = vnode.attributes || {};
    Object.keys(a).forEach(k => n.setAttribute(k, a[k]));

    // render (build) and then append child nodes:
    (vnode.children || []).forEach((c: any) => n.appendChild(render(c)));

    return parentDom ? parentDom.appendChild(n) : n;
}

export function h(nodeName: string, attributes: any, ...args: any) {
    const vnode: any = { nodeName };

    if (attributes) {
        vnode.attributes = attributes;
    }

    if (args.length) {
        vnode.children = [].concat(...args);
    }

    return vnode;
}

export function createElement(nodeName: string, attributes: any, children?: any, parentDom?: HTMLElement) {
    return render(h(nodeName, attributes, children), parentDom);
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
