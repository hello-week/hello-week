import { ICssClasses, ICssStates, IDaysWeek } from "../interfaces/iOptions"

export const cssClasses: ICssClasses = {
  CALENDAR: 'hello-week',
  DAY: 'day',
  MONTH: 'month',
  NAVIGATION: 'navigation',
  NEXT: 'next',
  PERIOD: 'period',
  PREV: 'prev',
  RTL: 'rtl',
  WEEK: 'week'
}

export const cssStates: ICssStates = {
  IS_BEGIN_RANGE: 'is-begin-range',
  IS_DISABLED: 'is-disabled',
  IS_END_RANGE: 'is-end-range',
  IS_HIGHLIGHT: 'is-highlight',
  IS_SELECTED: 'is-selected',
  IS_TODAY: 'is-today',
  IS_WEEKEND: 'is-weekend'
}

export const daysWeek: IDaysWeek = {
  FRIDAY: 5,
  MONDAY: 1,
  SATURDAY: 6,
  SUNDAY: 0,
  THURSDAY: 4,
  TUESDAY: 2,
  WEDNESDAY: 3
}

export const formatDate = {
  DEFAULT: 'YYYY-MM-DD'
}
