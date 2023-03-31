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
    title?: string;
};
```

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

## Options

```ts
export interface Options {
    selector?: string;
    lang?: string;
    langFolder?: string;
    format?: string;
    weekShort?: boolean;
    monthShort?: boolean;
    multiplePick?: boolean;
    defaultDate?: null;
    minDate?: Date;
    maxDate?: Date;
    disabledDaysOfWeek?: number[];
    disableDates?: string[] | [string, string][];
    weekStart?: number;
    timezoneOffset?: number;
    daysSelected?: string[];
    daysHighlight?: DaysHighlight[];
    disablePastDays?: boolean;
    todayHighlight?: boolean;
    range?: boolean;
    locked?: boolean;
    rtl?: boolean;
    nav?: string[];
    onReset?: () => void;
    onLoad?: () => void;
    onNavigation?: () => void;
    onSelect?: () => void;
    beforeCreateDay?: (node: DayOptions) => DayOptions;
}
```

## Day of Week

```ts
export interface DaysWeek {
    FRIDAY: number;
    MONDAY: number;
    SATURDAY: number;
    SUNDAY: number;
    THURSDAY: number;
    TUESDAY: number;
    WEDNESDAY: number;
}
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

## Class Names

```ts
export interface ClassNames {
    calendar?: string;
    month?: string;
    day?: string;
    week?: string;
    navigation?: string;
    period?: string;
    prev?: string;
    next?: string;
    rtl?: string;
    isHighlight?: string;
    isSelected?: string;
    isBeginRange?: string;
    isEndRange?: string;
    isDisabled?: string;
    isToday?: string;
    isWeekend?: string;
}
```
