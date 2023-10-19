import React from 'react';
import { classNames } from '../../../../packages/utils';

interface DayProps {
    className?: string;
    dayOfMonth: number;
    dayOfWeek: number;
    disabled?: boolean;
    highlighted?: boolean;
    locked?: boolean;
    range?: boolean;
    startRange?: boolean;
    endRange?: boolean;
    selected?: boolean;
    today?: boolean;
    weekend?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Day = ({
    className,
    dayOfMonth,
    dayOfWeek,
    disabled,
    highlighted,
    locked,
    range,
    startRange,
    endRange,
    selected,
    today,
    weekend,
    children,
    onClick,
}: DayProps): React.ReactElement => {
    const computedClasses = classNames(
        className,
        disabled && 'is-disabled',
        highlighted && 'is-highlighted',
        locked && 'is-locked',
        range && 'is-range',
        startRange && 'is-start-range',
        endRange && 'is-end-range',
        selected && 'is-selected',
        today && 'is-today',
        weekend && 'is-weekend'
    );

    return (
        <button
            className={computedClasses}
            style={{
                marginLeft:
                    dayOfMonth === 1
                        ? `${dayOfWeek * (100 / 7)}%`
                        : undefined,
            }}
            onClick={onClick}
        >
          {children}

        </button>
    );
};
