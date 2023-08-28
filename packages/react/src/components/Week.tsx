import React from 'react';

interface WeekProps {
    children: React.ReactNode;
}

export const Week = ({ children }: WeekProps): React.ReactElement => {
    return <div className="week">{children}</div>;
};
