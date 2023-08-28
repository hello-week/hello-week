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
        day.details.disabled && 'is-disabled',
        day.details.highlighted && 'is-highlighted',
        day.details.locked && 'is-locked',
        day.details.range && 'is-range',
        day.details.selected && 'is-selected',
        day.details.today && 'is-today',
        day.details.weekend && 'is-weekend'
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
            {day.date.getDate().toString()}
        </button>
    );
};
