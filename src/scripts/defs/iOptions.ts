export interface IOptions {
  selector: string;
  langFolder: string;
  daysHighlight: any;
  daysSelected: any;
  defaultDate?: string | null;
  disableDates: any;
  disableDaysOfWeek: any;
  disablePastDays: boolean;
  format: any;
  lang: string;
  locked: boolean;
  maxDate: any;
  minDate: any;
  monthShort: boolean;
  multiplePick: boolean;
  nav: ['◀', '▶'];
  range: boolean | [string];
  rtl: boolean;
  todayHighlight: boolean;
  weekShort: boolean;
  weekStart: number;
  onLoad: () => void;
  onClear: () => void;
  onNavigation: () => void;
  onSelect: () => void;
}

export interface ICssClasses {
  CALENDAR: string;
  DAY: string;
  MONTH: string;
  NAVIGATION: string;
  NEXT: string;
  PERIOD: string;
  PREV: string;
  RTL: string;
  WEEK: string;
}

export interface ICssStates {
  IS_BEGIN_RANGE: string;
  IS_END_RANGE: string;
  IS_RANGE: string;
  IS_DISABLED: string;
  IS_HIGHLIGHT: string;
  IS_SELECTED: string;
  IS_TODAY: string;
  IS_WEEKEND: string;
}

export interface IDaysWeek {
  FRIDAY: number;
  MONDAY: number;
  SATURDAY: number;
  SUNDAY: number;
  THURSDAY: number;
  TUESDAY: number;
  WEDNESDAY: number;
}
