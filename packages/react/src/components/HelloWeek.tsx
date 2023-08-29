import React, { useCallback, useEffect, useState } from 'react';
// Components
import { Navigation } from './Navigation';
import { Month } from './Month';
import { Day } from './Day';
import { Week } from './Week';
import { WeekDay } from './WeekDay';
// Calendar
import {
    Calendar,
    ICalendar,
    IDayOptions,
} from '../../../../packages/core/src';

interface HelloWeekProps extends ICalendar {
    onNavigate?: () => void;
    onDayClick?: (day: IDayOptions) => void;
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    weekday: 'narrow',
};

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
    const [calendar, setCalendar] = useState<Calendar>();
    const [data, setData] = useState<{
        month: string;
        year: string;
        days: IDayOptions[];
        weekDays: string[];
    }>();

    useEffect(() => {
        const instance = new Calendar();
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
            formatDate: formatDate || DATE_FORMAT,
            selectedDates,
            highlightedDates,
            disabledDaysOfWeek,
            disabledPastDates,
            disabledDates,
            minDate,
            maxDate,
            highlightedToday,
            locked,
            weekStart,
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
        disabledDaysOfWeek,
        highlightedToday,
        weekStart,
        formatDate,
        locked,
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
            {data && (
                <>
                    <Navigation
                        month={data.month}
                        year={data.year}
                        onPrevMonth={onHandlePrevMonth}
                        onNextMonth={onHandleNextMonth}
                    />
                    <Week>
                        {data.weekDays?.map((week, index) => (
                            <WeekDay key={`${week}-${index}`}>{week}</WeekDay>
                        ))}
                    </Week>
                    <Month>
                        {data.days?.map((day) => (
                            <Day
                                key={day.date.getTime()}
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
