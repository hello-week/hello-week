export interface CalendarTemplate {
    navigation: HTMLElement;
    prevMonth: HTMLElement;
    period: HTMLElement;
    nextMonth: HTMLElement;
    week: HTMLElement;
    month: HTMLElement;
}

export interface Template {
    selector: HTMLElement;
    calendar: CalendarTemplate;
}
