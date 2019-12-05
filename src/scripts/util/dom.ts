import { isDef, isString, isArray, isObject } from './types';
import { cssClasses } from '../shared/constants';

export function render(vnode: any, parentDom?: HTMLElement) {
  // Strings just convert to #text Nodes:
  if (vnode.split) {
    return document.createTextNode(vnode);
  }

  // create a DOM element with the nodeName of our VDOM element:
  const n = document.createElement(vnode.nodeName);

  // copy attributes onto the new node:
  const a = vnode.attributes || {};
  Object.keys(a).forEach(k => {
    if (k === 'class') {
      if (isString(a[k])) {
        n.className = a[k];
      } else if (isArray(a[k])) {
        a[k].forEach((v: any) => {
          n.classList.add(v);
        });
      }
    } else if (k === 'style') {
      if (isString(a[k])) {
        n.style = a[k];
      } else if (isArray(a[k])) {
        a[k].forEach((y: any, v: any) => {
          if (isObject(y)) {
            Object.keys(y).forEach((z, p) => {
              n.style.setProperty(z, y[z]);
            });
          }
        });
      }
    }
  });

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
