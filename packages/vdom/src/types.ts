/**
 * Represents a Virtual Node (VNode) used in virtual DOM rendering.
 * @template T - The type of the custom component or element.
 */
export type VNode<T> = {
    // The name of the custom component or HTML tag for this virtual node.
    nodeName: T | string;
    // An object containing attributes or props for this virtual node.
    attributes: unknown;
    // An array of child virtual nodes or text content.
    children: unknown[];
};

/**
 * Represents a function that receives the previous state and returns the updated state.
 * @template T - The type of the state to be updated.
 * @param prevState - The previous state of type T.
 * @returns The updated state of type T.
 */
export type PrevState<T> = (prevState: T) => T;
