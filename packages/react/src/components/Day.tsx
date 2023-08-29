import { useCallback } from 'react';
import { IDayOptions } from '../../../../packages/core/src';
import { classNames } from '../../../../packages/utils';

interface DayProps {
    day: IDayOptions;
    onClick?: (options: IDayOptions) => void;
}

export const Day = ({ day, onClick }: DayProps): React.ReactElement => {
    const computedClasses = classNames(
        'day',
        day.is.disabled && 'is-disabled',
        day.is.highlighted && 'is-highlighted',
        day.is.locked && 'is-locked',
        day.is.range && 'is-range',
        day.is.startRange && 'is-start-range',
        day.is.endRange && 'is-end-range',
        day.is.selected && 'is-selected',
        day.is.today && 'is-today',
        day.is.weekend && 'is-weekend'
    );
    const onHandleClick = useCallback(() => {
        if (onClick) onClick(day);
    }, [day, onClick]);

    return (
        <button
            className={computedClasses}
            style={{
                marginLeft:
                    day.date.getDate() === 1
                        ? `${day.date.getDay() * (100 / 7)}%`
                        : undefined,
            }}
            onClick={onHandleClick}
        >
            <time dateTime={day.dateFormatted}>
                {day.date.getDate().toString()}
            </time>
        </button>
    );
};
