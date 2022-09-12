# API Reference

## Calendar Options

```ts
export type CalendarOptions = {
    navigation: HTMLElement | Element;
    period: Element;
    prevMonth: Element;
    nextMonth: Element;
    week: Element;
    month: Element;
};
```

## Day Options

```ts
export type DayOptions = {
    day: number;
    element: Element;
    isHighlight: boolean;
    isSelected: boolean;
    isToday: boolean;
    isWeekend: boolean;
    locked: boolean;
    timestamp: number;
};
```

## Options

```ts
export interface Options {
    selector?: string;
    lang?: string;
    langFolder?: string;
    format?: string;
    monthShort?: boolean;
    weekShort?: boolean;
    defaultDate?: null;
    minDate?: Date;
    maxDate?: Date;
    disabledDaysOfWeek?: number[];
    disableDates?: string[] | [string, string][];
    weekStart?: number;
    timezoneOffset?: number;
    daysSelected?: string[];
    daysHighlight?: DaysHighlight[];
    multiplePick?: boolean;
    disablePastDays?: boolean;
    todayHighlight?: boolean;
    range?: boolean;
    locked?: boolean;
    rtl?: boolean;
    nav?: string[];
    onClear?: () => void;
    onLoad?: () => void;
    onNavigation?: () => void;
    onSelect?: () => void;
    beforeCreateDay?: (data: DayOptions) => DayOptions;
}
````

## Days Highlight

```ts
export type DaysHighlight = {
    days: string[] | [string, string];
    title?: string;
    color?: string;
    backgroundColor?: string;
};
```

## Range

```ts
export type IntervalRange = { begin: number; end: number };
```

## Languages

```ts
export interface Langs {
    days: string[];
    daysShort: string[];
    months: string[];
    monthsShort: string[];
}
```
