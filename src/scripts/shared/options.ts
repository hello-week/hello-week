import { IOptions } from "../interfaces/iOptions"

export const defaults: IOptions = {
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
