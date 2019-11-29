export type CallbackFunction = (...args: any[]) => void

interface IOptions {
  selector: string
  langFolder: string
  daysHighlight: any
  daysSelected: any
  defaultDate?: any
  disableDates: any
  disableDaysOfWeek: any
  disablePastDays: boolean
  format: any
  lang: string
  locked: boolean
  maxDate: any
  minDate: any
  monthShort: boolean
  multiplePick: boolean
  nav: ['◀', '▶']
  range: boolean
  rtl: boolean
  todayHighlight: true
  weekShort: true
  weekStart: number
  onLoad: CallbackFunction
  onClear: CallbackFunction
  onNavigation: CallbackFunction
  onSelect: CallbackFunction
}

export let defaults: IOptions = {
  selector: ".hello-week",
  lang: "en",
  langFolder: "./langs/",
  format: "DD/MM/YYYY",
  monthShort: false,
  weekShort: true,
  defaultDate: null,
  minDate: null,
  maxDate: null,
  disableDaysOfWeek: null,
  disableDates: null,
  weekStart: 0,
  daysSelected: null,
  daysHighlight: null,
  multiplePick: false,
  disablePastDays: false,
  todayHighlight: true,
  range: false,
  locked: false,
  rtl: false,
  nav: ["◀", "▶"],
  onLoad: () => {},
  onClear: () => {},
  onNavigation: () => {},
  onSelect: () => {}
}

export type Options = IOptions
