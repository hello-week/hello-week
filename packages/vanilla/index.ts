import { Calendar, IDayOptions, ICalendar } from '../core/src';
import { isSameDay } from '../core/src/utils/date';
import Component, { h, mount, unmount } from '../vdom/src';
import { classNames } from '../utils';

interface IProps extends ICalendar {
    onNavigate?: () => void;
}

interface IState {
    month: string;
    year: string;
    weekDays: string[];
    days: IDayOptions[];
    selectedDates: Date[];
}

class CalendarComponent extends Component<IProps, IState> {
    private calendar: Calendar;

    constructor(props: IProps) {
        super(props);
        // Initialize the calendar with default options
        console.log('Initialize');
        this.calendar = new Calendar({
            lang: props.lang,
            defaultDate: new Date(),
            formatDate: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'narrow',
            },
            weekStart: 0,
            selectedDates: [new Date('2023-07-01'), new Date('2023-07-10')],
            highlightedDates: [
                new Date('2023-07-10'),
                new Date('2023-07-15'),
                new Date(), // Today will always be highlighted
            ],
            disabledPastDates: false,
            disabledDates: [[new Date('2023-07-15'), new Date('2023-07-20')]],
            minDate: undefined,
            maxDate: undefined,
        });

        // Set the initial state based on the calendar's data
        this.state = {
            month: this.getMonth(),
            year: this.getYear(),
            weekDays: this.calendar.getWeekDays(),
            days: this.calendar.getDays(),
            selectedDates: this.calendar
                .getDays()
                .map((day) => day.details.selected && day.date)
                .filter(Boolean),
        };
    }

    private getMonth(): string {
        return this.calendar.getMonth({ format: 'long' });
    }

    private getYear(): string {
        return this.calendar.getYear();
    }

    private update(): void {
        console.log(this.state.selectedDates);
        this.setState((prevState) => {
            return {
                ...prevState,
                month: this.getMonth(),
                year: this.getYear(),
                days: this.calendar.getDays().map((day) => {
                    if (
                        this.state.selectedDates.find((dt) =>
                            isSameDay(dt, day.date)
                        )
                    ) {
                        return {
                            ...day,
                            details: {
                                ...day.details,
                                selected: true,
                            },
                        };
                    }

                    return day;
                }),
            };
        });
    }
    /**
     * Handle click on a day to toggle its selected state.
     * @param day - The clicked day.
     */
    private onHandleDayClick(day: IDayOptions): void {
        this.setState((prevState) => {
            return {
                ...prevState,
                days: prevState.days.map((dayOptions) => {
                    if (isSameDay(day.date, dayOptions.date)) {
                        return {
                            ...day,
                            details: {
                                ...dayOptions.details,
                                selected: !dayOptions.details.selected,
                            },
                        };
                    }
                    return dayOptions;
                }),
            };
        });
    }

    /**
     * Render the CalendarComponent.
     * @param props - The component's props.
     * @param state - The component's state.
     * @returns The virtual DOM representation.
     */
    render({ onNavigate }: IProps, { month, year, weekDays, days }: IState) {
        return h(
            'div',
            {
                className: 'hello-week',
            },
            // Render navigation bar
            h(
                'div',
                { className: 'navigation' },
                h(
                    'div',
                    {
                        className: 'prev',
                        onClick: () => {
                            this.calendar.prevMonth();
                            this.update();

                            if (onNavigate) onNavigate();
                        },
                    },
                    '◀'
                ),
                h('div', { className: 'period' }, `${month} ${year}`),
                h(
                    'div',
                    {
                        className: 'next',
                        onClick: () => {
                            this.calendar.nextMonth();
                            this.update();

                            if (onNavigate) onNavigate();
                        },
                    },
                    '▶'
                )
            ),
            // Render week days
            h(
                'div',
                { className: 'week' },
                ...weekDays.map((day) =>
                    h(
                        'div',
                        {
                            onClick: () => {},
                            className: 'day',
                        },
                        day
                    )
                )
            ),
            // Render calendar days
            h(
                'div',
                { className: 'month' },
                ...days.map((day) =>
                    h(
                        'div',
                        {
                          "data-formatted": day.dateFormatted,
                            onClick: () => {
                                console.log(
                                    'Handle Day Click',
                                    day.dateFormatted
                                );
                                this.onHandleDayClick(day);
                            },
                            onMouseEnter: () => console.log("mouse"),
                            className: classNames(
                                'day',
                                day.details.disabled && 'is-disabled',
                                day.details.highlighted && 'is-highlighted',
                                day.details.locked && 'is-locked',
                                day.details.range && 'is-range',
                                day.details.selected && 'is-selected',
                                day.details.today && 'is-today',
                                day.details.weekend && 'is-weekend'
                            ),
                            style: day.date.getDate() === 1 && {
                                marginLeft: `${day.date.getDay() * (100 / 7)}%`,
                            },
                        },
                        day.dateFormatted
                    )
                )
            )
        );
    }
}

export class HelloWeekNext {
    constructor({ selector, defaultDate }: { selector: string } & IProps) {
        const App = h(CalendarComponent, { selector, defaultDate });

        mount(App, document.querySelector(selector));
    }
}
