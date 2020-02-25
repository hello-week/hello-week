export function isDef(val: any): boolean {
  return val !== undefined && val !== null;
}

export function isTrue(val: boolean): boolean {
  return val === true;
}

export function isFalse(val: boolean): boolean {
  return val === false;
}

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object';
}

export function isArray(obj: any): boolean {
  return obj !== null && Array.isArray(obj);
}

export function isFuncation(func: any): boolean {
  return typeof func === 'function';
}

export function isString(val: string): boolean {
  return typeof val === 'string';
}

export function toArray(obj: any) {
  return Object.values(obj);
}

export function isNode(arg: any) {
  return arg && arg.nodeType;
}
