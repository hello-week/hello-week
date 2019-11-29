export function isDef(v: any): boolean {
  return v !== undefined && v !== null
}

export function isTrue(v: any): boolean {
  return v === true
}

export function isFalse(v: any): boolean {
  return v === false
}

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

export function isString(val: string): boolean {
  return typeof val === 'string'
}

export function toArray(obj: any) {
  return Object.values(obj)
}
