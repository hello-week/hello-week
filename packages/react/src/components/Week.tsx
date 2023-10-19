import React from 'react';

interface WeekProps {
  className?: string;
  children: React.ReactNode;
}

export const Week = ({ className, children }: WeekProps): React.ReactElement => {
  return <div className={className}>{children}</div>;
};
