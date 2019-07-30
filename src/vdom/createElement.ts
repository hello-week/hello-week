export function createElement(vnode: any, parentDom?: HTMLElement) {
    // Strings just convert to #text Nodes:
    if (vnode.split) {
        return document.createTextNode(vnode);
    }

    // create a DOM element with the nodeName of our VDOM element:
    const n = document.createElement(vnode.nodeName);

    // copy attributes onto the new node:
    const a = vnode.attributes || {};
    Object.keys(a).forEach( (k) => n.setAttribute(k, a[k]) );

    // render (build) and then append child nodes:
    (vnode.children || []).forEach( (c: any) => n.appendChild(createElement(c)) );

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

