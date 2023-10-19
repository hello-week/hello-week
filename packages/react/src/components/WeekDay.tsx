import React from 'react';

interface WeekDayProps {
  className?: string;
  children: React.ReactNode;
}

export const WeekDay = ({
  className,
  children,
}: WeekDayProps): React.ReactElement => {
  return <div className={className}>{children}</div>;
};
