import { isDef } from './../util/index'
import { defaults } from './../shared/options'
import { formats } from './format'

export function date(dt?: any): any {
  if (isDef(dt)) {
    return new Date(dt)
  }
  return new Date()
}

export function today(): any {
  return formats.default(new Date())
}
