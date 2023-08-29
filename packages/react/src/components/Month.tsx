import React from 'react';

interface MonthProps {
    className?: string;
    children: React.ReactNode;
}

export const Month = ({ className, children }: MonthProps): React.ReactElement => {
    return <div className={className}>{children}</div>;
};
