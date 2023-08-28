import React from 'react';

interface MonthProps {
    children: React.ReactNode;
}

export const Month = ({ children }: MonthProps): React.ReactElement => {
    return <div className="month">{children}</div>;
};
