export const classNames = (
    ...classes: (false | null | undefined | string)[]
): string => classes.filter(Boolean).join(' ');
