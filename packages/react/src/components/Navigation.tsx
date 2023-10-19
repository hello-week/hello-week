import React from "react";

interface NavigationProps {
  className?: string;
  children?: React.ReactNode;
  prevSlot?: React.ReactNode;
  nextSlot?: React.ReactNode;
}

export const Navigation = ({
  className,
  children,
  prevSlot,
  nextSlot,
}: NavigationProps): React.ReactElement => {
  return (
    <div className={className}>
      {prevSlot}
      {children}
      {nextSlot}
    </div>
  );
};
