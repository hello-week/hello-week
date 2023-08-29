import { IDayOptions } from '../core/src';
import Component, { h } from '../vdom/src';
import { classNames } from '../utils';

interface IDayProps {
    day: IDayOptions;
    onClick: (options: IDayOptions) => void;
}

interface IDayState {}

export class Day extends Component<IDayProps, IDayState> {
    constructor(props: IDayProps) {
        super(props);
    }

    render({ day, onClick }: IDayProps) {
        return h(
            'div',
            {
                onClick: () => {
                    if (onClick) onClick(day);
                },
                className: classNames(
                    'day',
                    day.is.disabled && 'is-disabled',
                    day.is.highlighted && 'is-highlighted',
                    day.is.locked && 'is-locked',
                    day.is.range && 'is-range',
                    day.is.selected && 'is-selected',
                    day.is.today && 'is-today',
                    day.is.weekend && 'is-weekend'
                ),
                style: day.date.getDate() === 1 && {
                    marginLeft: `${day.date.getDay() * (100 / 7)}%`,
                },
            },
            day.date.getDate().toString()
        );
    }
}
