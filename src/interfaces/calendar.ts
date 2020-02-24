export interface ICalendarTemplate {
  navigation: HTMLElement;
  prevMonth: HTMLElement;
  period: HTMLElement;
  nextMonth: HTMLElement;
  week: HTMLElement;
  month: HTMLElement;
}

export interface ITemplate {
  selector: HTMLElement;
  calendar: ICalendarTemplate;
}
