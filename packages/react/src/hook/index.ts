import { useState, useEffect, useCallback, useRef } from 'react';
// Calendar
import {
  Calendar,
  ICalendar,
  IDayOptions,
} from '../../../../packages/core/src';

export const useHelloWeek = ({
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
  locked,
  weekStart,
}: ICalendar) => {
  const calendarRef = useRef<Calendar | null>(null);
  const [data, setData] = useState<{
    month: string;
    year: string;
    days: IDayOptions[];
    weekDays: string[];
  }>();

  useEffect(() => {
    calendarRef.current = new Calendar({
      defaultDate: defaultDate || new Date(),
    });
  }, [defaultDate]);

  const updateCalendar = useCallback(() => {
    const calendar = calendarRef.current;
    if (!calendar) return;
    setData({
      month: calendar.getMonth({ format: 'long' }),
      year: calendar.getYear(),
      days: calendar.getDays(),
      weekDays: calendar.getWeekDays(),
    });
  }, []);

  useEffect(() => {
    const calendar = calendarRef.current;
    calendar?.setOptions((prev) => ({
      ...prev,
      lang,
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
      formatDate: formatDate || {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'narrow',
      },
    }));
    updateCalendar();
  }, [
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

  const onPrevMonth = useCallback(() => {
    const calendar = calendarRef.current;

    calendar?.prevMonth();
    updateCalendar();
  }, [updateCalendar]);

  const onNextMonth = useCallback(() => {
    const calendar = calendarRef.current;
    calendar?.nextMonth();
    updateCalendar();
  }, [updateCalendar]);

  return {
    data,
    onPrevMonth,
    onNextMonth,
  };
};
