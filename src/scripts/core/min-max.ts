import { date } from './dates'

export function setMaxDate(dt: any) {
  const max = date(dt)
  max.setHours(0, 0, 0, 0)
  max.setDate(max + 1)
  console.log(max)
}
