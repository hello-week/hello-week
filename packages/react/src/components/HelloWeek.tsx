import React, { useCallback } from 'react';
// Components
import { Navigation } from './Navigation';
import { Month } from './Month';
import { Day } from './Day';
import { Week } from './Week';
import { WeekDay } from './WeekDay';
// Calendar
import { ICalendar, IDayOptions } from '../../../../packages/core/src';
import { useHelloWeek } from '../hook';

interface HelloWeekProps extends ICalendar {
    onNavigate?: () => void;
    onDayClick?: (day: IDayOptions) => void;
}

export const HelloWeek = ({
    lang,
    defaultDate,
    formatDate,
    selectedDates,
    highlightedDates,
    disabledDaysOfWeek,
    disabledPastDates,
    disabledDates,
    minDate,
    maxDate,
    highlightedToday,
    weekStart,
    locked,
    onNavigate,
    onDayClick,
}: HelloWeekProps): React.ReactElement => {
    const { data, onPrevMonth, onNextMonth } = useHelloWeek({
        lang,
        defaultDate,
        formatDate,
        selectedDates,
        highlightedDates,
        disabledDaysOfWeek,
        disabledPastDates,
        disabledDates,
        minDate,
        maxDate,
        highlightedToday,
        weekStart,
        locked,
    });

    const onHandlePrevMonth = useCallback(() => {
        onPrevMonth();
        if (onNavigate) onNavigate();
    }, []);

    const onHandleNextMonth = useCallback(() => {
        onNextMonth();
        if (onNavigate) onNavigate();
    }, []);

    return (
        <div className="hello-week">
            {data && (
                <>
                    <Navigation
                        className="navigation"
                        prevSlot={
                            <button
                                className="prev"
                                onClick={onHandlePrevMonth}
                            >
                                <svg
                                    width={24}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        }
                        nextSlot={
                            <button
                                className="next"
                                onClick={onHandleNextMonth}
                            >
                                <svg
                                    width={24}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        }
                    >
                        <div className="period">{`${data.month} ${data.year}`}</div>
                    </Navigation>
                    <Week className="week">
                        {data.weekDays?.map((week, index) => (
                            <WeekDay key={`${week}-${index}`} className="day">
                                {week}
                            </WeekDay>
                        ))}
                    </Week>
                    <Month className="month">
                        {data.days?.map((day) => (
                            <Day
                                key={day.date.getTime()}
                                className="day"
                                day={day}
                                onClick={onDayClick}
                            />
                        ))}
                    </Month>
                </>
            )}
        </div>
    );
};
