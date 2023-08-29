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
                    day.details.disabled && 'is-disabled',
                    day.details.highlighted && 'is-highlighted',
                    day.details.locked && 'is-locked',
                    day.details.range && 'is-range',
                    day.details.selected && 'is-selected',
                    day.details.today && 'is-today',
                    day.details.weekend && 'is-weekend'
                ),
                style: day.date.getDate() === 1 && {
                    marginLeft: `${day.date.getDay() * (100 / 7)}%`,
                },
            },
            day.date.getDate().toString()
        );
    }
}