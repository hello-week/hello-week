/**
 * Checks if the given object is an array.
 *
 * @param obj - The object to check.
 * @returns A boolean indicating whether the object is an array.
 *
 * @remarks
 * This function checks if the provided object is not null and is an array.
 * It is a safer way to check if an object is an array than using the `Array.isArray` method directly, as it guards against the `null` value.
 *
 * @example
 * ```ts
 * // Check if an object is an array.
 * const result1 = isArray([1, 2, 3]); // true
 * const result3 = isArray('hello');  // false
 * ```
 */
export function isArray<T>(obj: unknown): obj is Array<T> {
  return obj !== null && Array.isArray(obj);
}
