import React from 'react';

interface WeekDayProps {
    children: React.ReactNode;
}

export const WeekDay = ({ children }: WeekDayProps): React.ReactElement => {
    return <div className="day">{children}</div>;
};
