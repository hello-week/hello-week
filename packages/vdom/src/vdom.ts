import Component from "./component";
import {
    addEventListeners,
    createElement,
    createTextNode,
    removeProp,
    setProp,
} from "./dom";
import { VNode } from "./types";

/**
 * Set multiple properties on an element.
 *
 * @param el - The element on which to set properties.
 * @param props - An object containing property names and their values.
 */
function setProps(el: Element, props: Record<string, string>): void {
    for (const name in props) {
        setProp(el, name, props[name]);
    }
}

/**
 * Renders a virtual node (VNode) or text into a DOM element or text node.
 *
 * @param vnode - The virtual node or text to render.
 * @returns The DOM element or text node representing the virtual node.
 */
function renderNode<T>(vnode: VNode<T> | string): Element | Text {
    let el: Element;

    if (typeof vnode === "string") return createTextNode(vnode);

    if (typeof vnode.nodeName === "string") {
        el = createElement(vnode.nodeName);
        setProps(el, vnode.attributes as Record<string, string>);
        addEventListeners(
            el,
            vnode.attributes as Record<string, EventListenerOrEventListenerObject>
        );
    }

    if (typeof vnode.nodeName === "function") {
        // initiate our component
        const component = new (vnode.nodeName as typeof Component)(vnode.attributes);
        el = renderNode(
            component.render(component.props, component.state)
        ) as Element;
        // save DOM reference to `base` field as in `updateComponent`
        component.base = el;
    }
    // recursively do this to all of its children
    (vnode.children || []).forEach((child: VNode<T>) => {
        el.appendChild(renderNode(child));
    });

    return el;
}

/**
 * Performs a diffing algorithm to update the DOM with the new virtual node (VNode).
 *
 * @param dom - The existing DOM element to diff against.
 * @param vnode - The new virtual node (VNode) to update.
 * @returns The updated DOM element representing the virtual node.
 */
export function diff<T>(dom: Element, vnode: VNode<T>): Element {
    if (typeof vnode === "string") {
        dom.nodeValue = vnode;
        return dom;
    }
    if (typeof vnode.nodeName === "function") {
        const component = new (vnode.nodeName as typeof Component)(vnode.attributes);
        const rendered = component.render(component.props, component.state);

        diff(dom, rendered);
        return dom;
    }

    // Naive check for the number of children of the virtual node and the DOM
    if (vnode.children.length !== dom.childNodes.length) {
        dom.appendChild(
            // render only the last child
            renderNode(vnode.children[vnode.children.length - 1] as VNode<typeof vnode.children>)
        );
    }

    if (vnode.children.length === dom.childNodes.length) {
        const newProps = vnode.attributes as Record<string, string>;
        const oldProps = dom.attributes as unknown as Record<string, string>;
        const props = Object.assign({}, newProps, oldProps);

        for (const name in props) {
            if (!newProps[name]) {
                removeProp(dom, name, oldProps[name]);
            } else if (!oldProps[name] || newProps[name] !== oldProps[name]) {
                setProp(dom, name, newProps[name]);
            }
        }
    }

    // run diffing for children
    dom.childNodes.forEach((child: Element, i) =>
        diff(child, vnode.children[i] as VNode<typeof child>)
    );

    return dom;
}

/**
 * Mounts a virtual node (VNode) into the DOM.
 *
 * @param vnode - The virtual node (VNode) to mount.
 * @param parent - The parent element to mount the virtual node into.
 * @returns The newly created DOM element representing the virtual node.
 */
export function mount<T>(vnode: VNode<T>, parent: Element | null): Element | Text {
    const newDom = renderNode(vnode);
    parent.appendChild(newDom);
    return newDom;
}

/**
 * Unmounts a virtual node (VNode) from the DOM.
 *
 * @param vnode - The virtual node (VNode) to unmount.
 */
export function unmount(vnode: { el: Element }): void {
    vnode.el.parentNode.removeChild(vnode.el);
}
