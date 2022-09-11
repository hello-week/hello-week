import { addClass, setAttr } from './dom';
import { isArray, isDef, isObject, isString } from './is';

function dataProps(vnode, node, name) {
    for (const prop of Object.keys(vnode.attributes[name])) {
        setAttr(node, `data-${prop}`, vnode.attributes[name][prop]);
    }
}

function classProps(vnode: HTMLElement, node: HTMLElement, name: NamedNodeMap) {
    if (isString(vnode.attributes[name])) {
        node.className = vnode.attributes[name];
    } else if (isArray(vnode.attributes[name])) {
        vnode.attributes[name].forEach((value: string) => {
            addClass(node, value);
        });
    }
}

function styleProps(vnode, node, name) {
    if (isString(vnode.attributes[name])) {
        node.style = vnode.attributes[name];
    } else if (isObject(vnode.attributes[name])) {
        for (const prop of Object.keys(vnode.attributes[name])) {
            node.style[prop] = vnode.attributes[name][prop];
        }
    }
}

function diffProps(vnode, node) {
    for (const name of Object.keys(vnode.attributes)) {
        if (name === 'class') {
            classProps(vnode, node, name);
        } else if (name === 'style') {
            styleProps(vnode, node, name);
        } else if (name === 'data') {
            dataProps(vnode, node, name);
        } else {
            setAttr(node, name, vnode.attributes[name]);
        }
    }
}

function h(nodeName: string, attributes: any, ...args: any) {
    const vnode: any = { nodeName };

    if (attributes) vnode.attributes = attributes;
    if (args.length) vnode.children = [].concat(...args);
    return vnode;
}

export function render(vnode: any, parentDom?: HTMLElement) {
    if (vnode.split) return document.createTextNode(vnode);
    const node = document.createElement(vnode.nodeName);

    if (isDef(vnode.attributes)) {
        diffProps(vnode, node);
    }

    (vnode.children || []).forEach((c: any) => node.appendChild(render(c)));

    return parentDom ? parentDom.appendChild(node) : node;
}

export { h as el };
export { h as createElement };

