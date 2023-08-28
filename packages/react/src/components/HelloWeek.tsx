import React, { useCallback, useEffect, useState } from 'react';
// Components
import { Navigation } from './Navigation';
import { Month } from './Month';
import { Day } from './Day';
import { Week } from './Week';
import { WeekDay } from './WeekDay';
// Calendar
import { Calendar, ICalendar, IDayOptions } from '../../../../packages/core/src';

interface HelloWeekProps extends ICalendar {
    onNavigate?: () => void;
    onDayClick?: (day: IDayOptions) => void;
}

export const HelloWeek = ({
    lang,
    defaultDate,
    selectedDates,
    highlightedDates,
    disabledDates,
    disabledPastDates,
    minDate,
    maxDate,
    onNavigate,
    onDayClick,
}: HelloWeekProps): React.ReactElement => {
    const [calendar, setCalendar] = useState<Calendar>();
    const [data, setData] = useState<{
        month: string;
        year: string;
        days: IDayOptions[];
        weekDays: string[];
    }>();


    useEffect(() => {
        const instance = new Calendar({
            weekStart: 0,
            formatDate: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'narrow',
            },
        });
        setCalendar(instance);
    }, []);

    const updateCalendar = useCallback(() => {
        if (!calendar) return;
        setData({
            month: calendar.getMonth({ format: 'long' }),
            year: calendar.getYear(),
            days: calendar.getDays(),
            weekDays: calendar.getWeekDays(),
        });
    }, [calendar]);

    useEffect(() => {
        calendar?.setOptions((prev) => ({
            ...prev,
            lang,
            defaultDate,
            selectedDates,
            highlightedDates,
            disabledPastDates,
            disabledDates,
            minDate,
            maxDate,
        }));
        updateCalendar();
    }, [
        calendar,
        defaultDate,
        selectedDates,
        lang,
        updateCalendar,
        highlightedDates,
        disabledDates,
        disabledPastDates,
        minDate,
        maxDate,
    ]);

    const onHandlePrevMonth = useCallback(() => {
        calendar?.prevMonth();
        if (onNavigate) onNavigate();
        updateCalendar();
    }, [calendar, onNavigate, updateCalendar]);

    const onHandleNextMonth = useCallback(() => {
        calendar?.nextMonth();
        if (onNavigate) onNavigate();
        updateCalendar();
    }, [calendar, onNavigate, updateCalendar]);

    return (
        <div className="hello-week">
            <Navigation
                month={data?.month}
                year={data?.year}
                onPrevMonth={onHandlePrevMonth}
                onNextMonth={onHandleNextMonth}
            />
            <Week>
                {data?.weekDays?.map((week, index) => (
                    <WeekDay key={`${week}-${index}`}>{week}</WeekDay>
                ))}
            </Week>
            <Month>
                {data?.days?.map((day) => (
                    <Day
                        key={day.date.getTime()}
                        day={day}
                        onClick={onDayClick}
                    />
                ))}
            </Month>
        </div>
    );
};
