export function isAfter(input: any, units: any) {
  return units
}

export function isBefore(input: any, units: any) {
  return units
}

export function isBetween(from: string, to: string, units: string) {
  return units
}

export function isSame(input: any, units: any) {
  return units
}

export function isSameOrAfter(input: any, units: any) {
  return isSame(input, units) || isAfter(input, units)
}

export function isSameOrBefore(input: any, units: any) {
  return isSame(input, units) || isBefore(input, units)
}
