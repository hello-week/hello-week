import { Calendar, IDayOptions, ICalendar } from '../core/src';
import { isSameDay } from '../core/src/utils/date';
import Component, { h, mount } from '../vdom/src';
// Components
import { Day } from './Day';
import { Navigation } from './Navigation';

interface IAppProps extends ICalendar {
    onNavigate?: () => void;
}

interface IAppState {
    month: string;
    year: string;
    weekDays: string[];
    days: IDayOptions[];
    selectedDates: Date[];
}

class App extends Component<IAppProps, IAppState> {
    private calendar: Calendar;

    constructor(props: IAppProps) {
        super(props);

        this.calendar = new Calendar({
            lang: props.lang,
            defaultDate: new Date("2023-09-10"),
            formatDate: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'narrow',
            },
            weekStart: 0,
            selectedDates: [new Date('2023-07-01'), new Date('2023-07-10')],
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
        this.setState((prevState) => {
            return {
                ...prevState,
                month: this.getMonth(),
                year: this.getYear(),
                days: this.calendar.getDays(),
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

    render(
        { onNavigate }: IAppProps,
        { month, year, weekDays, days }: IAppState
    ) {
      console.log("days",days);
        return h(
            'div',
            {
                className: 'hello-week',
            },
            h(Navigation, {
                month,
                year,
                onPrevMonth: () => {
                    this.calendar.prevMonth();
                    this.update();

                    if (onNavigate) onNavigate();
                },
                onNextMonth: () => {
                    this.calendar.nextMonth();
                    this.update();

                    if (onNavigate) onNavigate();
                },
            }),
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

            h(
                'div',
                { className: 'month' },
                ...days.map((day) =>
                    h(Day, {
                        day,
                        onClick: (day: IDayOptions) =>
                            this.onHandleDayClick(day),
                    })
                )
            )
        );
    }
}

export class HelloWeekNext {
    constructor({ selector, defaultDate, onNavigate }: { selector: string } & IAppProps) {
        const Root = h(App, { selector, defaultDate, onNavigate });

        mount(Root, document.querySelector(selector));
    }
}
