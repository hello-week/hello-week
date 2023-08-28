import { Calendar } from '../core/src';
import Component, { h } from '../vdom/src';

interface INavigationProps {
    month?: string;
    year?: string;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
}

interface IINavigationState {}

export class Navigation extends Component<INavigationProps, IINavigationState> {
    private calendar: Calendar;

    static cssClases: {
        ROOT: string;
    };

    constructor(props: INavigationProps) {
        super(props);

        Navigation.cssClases = {
          ROOT: "navigation",
        }
    }

    render({ month, year, onPrevMonth, onNextMonth }: INavigationProps) {
        return h(
            'div',
            { className: Navigation.cssClases.ROOT },
            h(
                'div',
                {
                    className: 'prev',
                    onClick: () => {
                        if (onPrevMonth) onPrevMonth();
                    },
                },
                '◀'
            ),
            h('div', { className: 'period' }, `${month} ${year}`),
            h(
                'div',
                {
                    className: 'next',
                    onClick: () => {
                        if (onNextMonth) onNextMonth();
                    },
                },
                '▶'
            )
        );
    }
}
