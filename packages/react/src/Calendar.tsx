import { useCallback, useState } from 'react';
import { HelloWeek } from './components/HelloWeek';
import { IDayOptions } from '../../../packages/core/src';
import { isSameDay } from '../../../packages/core/src/utils/date';

export const Calendar = (): React.ReactElement => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const onHandleDayClick = useCallback((day: IDayOptions) => {
        const {
            details: { selected, disabled },
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
        <HelloWeek
            selectedDates={selectedDates}
            highlightedDates={[
                new Date('2023-08-09'),
                new Date('2023-08-10'),
                [new Date('2023-09-13'), new Date('2023-09-19')],
            ]}
            disabledDates={[
                new Date('2023-08-03'),
                new Date('2023-08-04'),
                [new Date('2023-08-13'), new Date('2023-08-19')],
                [new Date('2023-08-23'), new Date('2023-08-29')],
            ]}
            onDayClick={onHandleDayClick}
        />
    );
};
