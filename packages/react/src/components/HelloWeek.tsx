import React, { useRef, useCallback, useState } from 'react';
// Components
import { Navigation } from './Navigation';
import { Month } from './Month';
import { Day } from './Day';
import { Week } from './Week';
import { WeekDay } from './WeekDay';
// Calendar
import { ICalendar, IDayOptions } from '../../../../packages/core/src';
import { isSameDay } from '../../../../packages/core/src/utils/date';
import { useHelloWeek } from '../hook';

interface HelloWeekProps extends Omit<ICalendar, 'selectedDates'> {
  initialDates?: ICalendar["selectedDates"];
  range?: boolean;
  onNavigate?: () => void;
  onDayClick?: (day: IDayOptions) => void;
}

type Range = {
  start?: Date;
  end?: Date;
};

export const HelloWeek = ({
  initialDates,
  lang,
  defaultDate,
  formatDate,
  highlightedDates,
  disabledDaysOfWeek,
  disabledPastDates,
  disabledDates,
  minDate,
  maxDate,
  highlightedToday,
  weekStart,
  locked,
  range,
  onNavigate,
  onDayClick,
}: HelloWeekProps): React.ReactElement => {
  const [selectedDates, setSelectedDates] = useState(initialDates);
  const rangeDates = useRef<Range>({
    start: undefined,
    end: undefined,
  });

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

  const onHandleDayClick = useCallback(
    (day: IDayOptions) => {
      const {
        is: { selected, disabled },
        date,
      } = day;

      if (disabled) return;

      if (range)
        if (range) {
          if (!rangeDates.current.start || rangeDates.current.end) {
            rangeDates.current = {
              start: date,
              end: undefined,
            };
          } else {
            rangeDates.current.end = date;
          }

          if (rangeDates.current.start) {
            setSelectedDates([rangeDates.current.start])
          }

          if (rangeDates.current.start && rangeDates.current.end) {
            setSelectedDates([rangeDates.current.start, rangeDates.current.end]);
          }
        } else {
          setSelectedDates((prev) =>
            prev
              ? selected
                ? prev.filter((val) => !isSameDay(val, date))
                : [...prev, date]
              : [date]
          );
        }

      if (onDayClick) onDayClick(day);
    },
    [rangeDates]
  );

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
                dayOfMonth={day.date.getDate()}
                dayOfWeek={day.date.getDay()}
                disabled={day.is.disabled}
                highlighted={day.is.highlighted}
                locked={day.is.locked}
                range={day.is.range}
                startRange={day.is.startRange}
                endRange={day.is.endRange}
                selected={day.is.selected}
                today={day.is.today}
                weekend={day.is.weekend}
                onClick={() => onHandleDayClick(day)}
              >
                <time dateTime={day.dateFormatted}>
                  {day.date.getDate().toString()}
                </time>
              </Day>
            ))}
          </Month>
        </>
      )}
    </div>
  );
};
