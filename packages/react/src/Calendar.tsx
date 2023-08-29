import { useCallback, useState } from 'react';
import { HelloWeek } from './components/HelloWeek';
import { IDayOptions } from '../../../packages/core/src';
import { isSameDay } from '../../../packages/core/src/utils/date';

export const Calendar = (): React.ReactElement => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);

    const onHandleDayClick = useCallback((day: IDayOptions) => {
        const {
            is: { selected, disabled },
            date,
        } = day;

        if (disabled) return;

        setSelectedDates((prev) =>
            selected
                ? prev.filter((val) => !isSameDay(val, date))
                : [...prev, date]
        );
    }, []);

    return (
        <div className="grid">
            <div className="calendar">
                <HelloWeek
                    selectedDates={selectedDates}
                    onDayClick={onHandleDayClick}
                />
            </div>
            <div className="calendar">
                <HelloWeek
                    selectedDates={[
                        new Date('2023-08-04'),
                        new Date('2023-08-06'),
                        [new Date('2023-08-13'), new Date('2023-08-19')],
                    ]}
                />
            </div>
            <div className="calendar">
                <HelloWeek lang="pt" />
            </div>
            <div className="calendar">
                <HelloWeek
                    onDayClick={(day) => console.log(day)}
                    highlightedToday={true}
                    highlightedDates={[
                        {
                            days: [
                                new Date('2023-08-04'),
                                new Date('2023-08-11'),
                            ],
                            title: 'Business Travel',
                        },
                        {
                            days: [
                                [
                                    new Date('2023-08-14'),
                                    new Date('2023-08-16'),
                                ],
                                [
                                    new Date('2023-08-23'),
                                    new Date('2023-08-25'),
                                ],
                            ],

                            title: 'Family Vacations',
                        },
                    ]}
                />
            </div>
            <div className="calendar">
                <HelloWeek disabledPastDates />
            </div>
            <div className="calendar">
                <HelloWeek disabledDaysOfWeek={[0, 6]} />
            </div>
            <div className="calendar">
                <HelloWeek
                    disabledDates={[
                        new Date('2023-08-03'),
                        new Date('2023-08-04'),
                        [new Date('2023-08-13'), new Date('2023-08-19')],
                        [new Date('2023-08-23'), new Date('2023-08-29')],
                    ]}
                />
            </div>
            <div className="calendar">
                <HelloWeek locked />
            </div>
            <div className="calendar">
                <HelloWeek
                    minDate={new Date('2023-08-12')}
                    maxDate={new Date('2023-08-21')}
                />
            </div>
        </div>
    );
};
