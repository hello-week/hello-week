import { VNode } from "./types";

/**
 * Creates a Virtual Node (VNode) representing a custom component or HTML element.
 * @template T - The type of the custom component or element.
 * @param nodeName - The name of the custom component or HTML element.
 * @param attrs - An optional object containing attributes or props for the VNode.
 * @param children - Any additional child VNodes or text content.
 * @returns The Virtual Node (VNode) representing the custom component or HTML element.
 */
export function h<T>(
    nodeName: T,
    attrs?: unknown,
    ...children: unknown[]
): VNode<T> {
    return { nodeName, attributes: attrs || {}, children };
}
