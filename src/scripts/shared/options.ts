import { IOptions, IDayOptions } from '../defs/index';

export const defaults: IOptions = {
  selector: '.hello-week',
  lang: 'en-GB',
  langFolder: './langs/',
  format: 'DD/MM/YYYY',
  monthShort: false,
  weekShort: true,
  defaultDate: null,
  minDate: null,
  maxDate: null,
  disableDaysOfWeek: null,
  timezoneOffset: new Date().getTimezoneOffset(),
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
  nav: ['◀', '▶'],
  onLoad: () => {
    /** callback */
  },
  onClear: () => {
    /** callback */
  },
  onNavigation: () => {
    /** callback */
  },
  onSelect: () => {
    /** callback */
  },
  beforeCreateDay: (data: IDayOptions) => data
};
