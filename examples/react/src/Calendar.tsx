import { HelloWeek } from './../../../packages/react/src';

export const Calendar = (): React.ReactElement => {
    return (
        <div className="grid">
            <div className="calendar">
                <HelloWeek defaultDate={new Date('2023-01-01')} />
            </div>
            <div className="calendar">
                <HelloWeek
                    defaultDate={new Date('2023-02-01')}
                    range
                />
            </div>
            <div className="calendar">
                <HelloWeek defaultDate={new Date('2023-03-01')} lang="pt" />
            </div>
            <div className="calendar">
                <HelloWeek
                    defaultDate={new Date('2023-04-01')}
                    onDayClick={(day) => console.log(day)}
                    highlightedToday={true}
                    highlightedDates={[
                        {
                            days: [
                                new Date('2023-04-04'),
                                new Date('2023-04-11'),
                            ],
                            title: 'Business Travel',
                        },
                        {
                            days: [
                                [
                                    new Date('2023-04-14'),
                                    new Date('2023-04-16'),
                                ],
                                [
                                    new Date('2023-04-23'),
                                    new Date('2023-04-25'),
                                ],
                            ],

                            title: 'Family Vacations',
                        },
                    ]}
                />
            </div>
            <div className="calendar">
                <HelloWeek defaultDate={new Date('2023-05-01')} locked />
            </div>
            <div className="calendar">
                <HelloWeek
                    defaultDate={new Date('2023-06-01')}
                    disabledDaysOfWeek={[0, 6]}
                />
            </div>
            <div className="calendar">
                <HelloWeek
                    defaultDate={new Date('2023-07-01')}
                    disabledDates={[
                        new Date('2023-07-03'),
                        new Date('2023-07-04'),
                        [new Date('2023-07-13'), new Date('2023-07-19')],
                        [new Date('2023-07-23'), new Date('2023-07-29')],
                    ]}
                />
            </div>
            <div className="calendar">
                <HelloWeek
                    defaultDate={new Date('2023-08-01')}
                    minDate={new Date('2023-08-12')}
                    maxDate={new Date('2023-08-21')}
                />
            </div>
            <div className="calendar">
                <HelloWeek
                    defaultDate={new Date('2023-09-01')}
                    disabledPastDates
                />
            </div>
        </div>
    );
};
