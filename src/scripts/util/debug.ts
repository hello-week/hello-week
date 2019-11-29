import { version } from '../../../package.json'

export function warn(msg: any) {
  console.group(`[Warn]`)
  console.warn(msg)
  console.groupEnd()
}

export function log(msg: any) {
  console.group(`[Log]`)
  console.log(msg)
  console.groupEnd()
}

export function error(msg: any) {
  throw new Error(`[Hello Week Error]: ${msg}`)
}
