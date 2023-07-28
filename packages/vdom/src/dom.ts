export const DOM_FORCE_UPDATE = 'forceUpdate';

/**
 * Checks if a property name represents an event prop (starts with "on").
 * @param name - The name of the property to check.
 * @returns `true` if the property name represents an event prop, otherwise `false`.
 */
function isEventProp(name: string): boolean {
    return /^on/.test(name);
}

/**
 * Extracts the event name from a property name.
 * @param name - The name of the property containing the event.
 * @returns The extracted event name in lowercase.
 */
function extractEventName(name: string): string {
    return name.slice(2).toLowerCase();
}

/**
 * Checks if a property name is a custom prop (event prop or DOM_FORCE_UPDATE).
 * @param name - The name of the property to check.
 * @returns `true` if the property name is a custom prop, otherwise `false`.
 */
function isCustomProp(name: string): boolean {
    return isEventProp(name) || name === DOM_FORCE_UPDATE;
}

/**
 * Sets a boolean property on an element.
 * @param el - The element on which to set the property.
 * @param name - The name of the property to set.
 * @param value - The value of the property to set (boolean).
 */
function setBooleanProp(el: Element, name: string, value: boolean) {
    if (value) {
        el.setAttribute(name, value.toString());
        Object.assign(el, { [name]: true });
    } else {
        Object.assign(el, { [name]: false });
    }
}

/**
 * Removes a boolean property from an element.
 * @param el - The element from which to remove the property.
 * @param name - The name of the property to remove.
 */
function removeBooleanProp(el: Element, name: string) {
    el.removeAttribute(name);
    Object.assign(el, { [name]: false });
}

/**
 * Sets a property on an element.
 * @param el - The element on which to set the property.
 * @param name - The name of the property to set.
 * @param value - The value of the property to set.
 */
export function setProp(el: Element, name: string, value: unknown) {
    if (isCustomProp(name)) return;

    if (name === 'className') {
        el.setAttribute('class', value.toString());
    } else if (name === 'style') {
        Object.assign((el as HTMLElement).style, value);
    } else if (typeof value === 'boolean') {
        setBooleanProp(el, name, value);
    } else {
        el.setAttribute(name, value.toString());
    }
}

/**
 * Removes a property from an element.
 * @param el - The element from which to remove the property.
 * @param name - The name of the property to remove.
 * @param value - The value of the property to remove (string).
 */
export function removeProp(el: Element, name: string, value: string) {
    if (isCustomProp(name)) return;

    if (name === 'className') {
        el.removeAttribute('class');
    } else if (typeof value === 'boolean') {
        removeBooleanProp(el, name);
    } else {
        el.removeAttribute(name);
    }
}

/**
 * Adds event listeners to an element based on the provided properties.
 * @param el - The element to which event listeners will be added.
 * @param props - An object containing properties representing event listeners.
 */
export function addEventListeners(
    el: Element,
    props: Record<string, EventListenerOrEventListenerObject>
) {
    for (const name in props) {
        if (isEventProp(name)) {
            el.addEventListener(extractEventName(name), props[name]);
        }
    }
}

/**
 * Creates an element with the specified tag name.
 * @param tagName - The tag name of the element to create.
 * @returns The created element.
 */
export function createElement(tagName: string): Element {
    return document.createElement(tagName);
}

/**
 * Creates a text node with the specified text content.
 * @param text - The text content of the text node.
 * @returns The created text node.
 */
export function createTextNode(text: string): Text {
    return document.createTextNode(text);
}
