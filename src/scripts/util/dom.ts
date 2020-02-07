import { isDef, isString, isArray, isObject } from './types';

export function render(vnode: any, parentDom?: HTMLElement) {
  if (vnode.split) return document.createTextNode(vnode);
  const node = document.createElement(vnode.nodeName);
  diffProps(vnode, node);

  (vnode.children || []).forEach((c: any) => node.appendChild(render(c)));

  return parentDom ? parentDom.appendChild(node) : node;
}

function diffProps(vnode, node) {
  for (const name of Object.keys(vnode.attributes)) {
    const value = vnode.attributes[name];
    node[name] = value;
    if (name in node) {
      if (name === 'class') {
        classProps(vnode, node, name);
      } else if (name === 'style') {
        styleProps(vnode, node, name);
      } else if (name === 'data') {
        dataProps(vnode, node, name);
      }
    } else {
      setAttr(node, name, value);
    }
  }
}

function dataProps(vnode, node, name) {
  for (const prop of Object.keys(vnode.attributes[name])) {
    setAttr(node, `data-${name}`, vnode.attributes[name][prop]);
  }
}

function classProps(vnode, node, name) {
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

function h(nodeName: string, attributes: any, ...args: any) {
  const vnode: any = { nodeName };

  if (attributes) vnode.attributes = attributes;
  if (args.length) vnode.children = [].concat(...args);
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

export { h as el };
