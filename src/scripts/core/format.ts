import { defaults } from './../shared/options'

export function format(day: number, month: number, year: number): string {
  return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`
}

export const formats = {
  dd: (date: Date, lang: string = defaults.lang) =>
    new Intl.DateTimeFormat(lang, { day: 'numeric' }).format(date),
  DD: (date: Date, lang: string = defaults.lang) =>
    new Intl.DateTimeFormat(lang, { day: '2-digit' }).format(date),
  mm: (date: Date, lang: string = defaults.lang) =>
    new Intl.DateTimeFormat(lang, { month: 'numeric' }).format(date),
  MM: (date: Date, lang: string = defaults.lang) =>
    new Intl.DateTimeFormat(lang, { month: '2-digit' }).format(date),
  yy: (date: Date, lang: string = defaults.lang) =>
    new Intl.DateTimeFormat(lang, { year: '2-digit' }).format(date),
  YY: (date: Date, lang: string = defaults.lang) =>
    new Intl.DateTimeFormat(lang, { year: 'numeric' }).format(date),
  default: (date: Date) =>
    new Intl.DateTimeFormat(defaults.lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
}
