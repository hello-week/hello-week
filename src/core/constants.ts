import { ClassNames, DaysWeek } from '../types';

export const CSS_CLASSES: ClassNames = {
  calendar: 'hello-week',
  month: 'month',
  day: 'day',
  week: 'week',
  navigation: 'navigation',
  period: 'period',
  prev: 'prev',
  next: 'next',
  rtl: 'rtl',
  isHighlight: 'is-highlight',
  isSelected: 'is-selected',
  isBeginRange: 'is-begin-range',
  isEndRange: 'is-end-range',
  isDisabled: 'is-disabled',
  isToday: 'is-today',
  isWeekend: 'is-weekend',
};

export const FORMAT_DATE = 'YYYY-MM-DD';

export const DAYS_WEEK: DaysWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};
