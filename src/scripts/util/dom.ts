import { isDef, isString, isArray, isObject } from './types';
import { cssClasses } from '../shared/constants';

export function render(vnode: any, parentDom?: HTMLElement) {
  // Strings just convert to #text Nodes:
  if (vnode.split) {
    return document.createTextNode(vnode);
  }

  // create a DOM element with the nodeName of our VDOM element:
  const node = document.createElement(vnode.nodeName);

  // copy attributes onto the new node:
  const attributes = vnode.attributes || {};

  Object.keys(attributes).forEach((key: string) => {
    if (key === 'class') {
      if (isString(attributes[key])) {
        node.className = attributes[key];
      } else if (isArray(attributes[key])) {
        attributes[key].forEach((value: any) => {
          addClass(node, value);
        });
      }
    } else if (key === 'style') {
      if (isString(attributes[key])) {
        node.style = attributes[key];
      } else if (isObject(attributes[key])) {
        Object.keys(attributes[key]).forEach((props: any) => {
          node.style.setProperty(props, attributes[key][props]);
        });
      }
    } else if (key === 'dataset') {
      Object.keys(attributes[key]).forEach((props: any) => {
        node.setAttribute('data-' + props, attributes[key][props]);
      });
    } else {
      node.setAttribute(key, attributes[key]);
    }
  });

  // render (build) and then append child nodes:
  (vnode.children || []).forEach((c: any) => node.appendChild(render(c)));

  return parentDom ? parentDom.appendChild(node) : node;
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
  return isDef(where) ? where.querySelector(`.${className}`) : document.querySelector(`.${className}`);
}
