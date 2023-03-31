import HelloWeek from './hello.week.esm.js';

const commonOptions = {
    selector: '.calendar',
    langFolder: './langs/',
};

const YEAR = new Date().getFullYear();
const MONTH = (new Date().getMonth() + 1).toString().padStart(2, 0);

function beforeCreateDay() {
    new HelloWeek({
        ...commonOptions,
        beforeCreateDay: (node) => {
            const span = document.createElement('span');

            Object.assign(span.style, {
                position: 'absolute',
                top: '8px',
                width: '5px',
                height: '5px',
                backgroundColor: '#5a67d8',
                borderRadius: '50%',
            });

            return {
                ...node,
                element:
                    node.day % 2 === 0 && !node.isWeekend
                        ? node.element.appendChild(span)
                        : node.element,
            };
        },
    });
}

function disableDates() {
    new HelloWeek({
        ...commonOptions,
        disableDates: [[`${YEAR}-${MONTH}-02`, `${YEAR}-${MONTH}-12`]],
    });
}

function disablePastDays() {
    new HelloWeek({
        ...commonOptions,
        disablePastDays: true,
    });
}

function disabledDaysOfWeek() {
    new HelloWeek({
        ...commonOptions,
        disabledDaysOfWeek: [0, 1], // disabling weekends
    });
}

function getMonthYear() {
    const calendar = new HelloWeek({
        ...commonOptions,
        onNavigation: () => {
            console.log('Current Month: ', calendar.getMonth());
            console.log('Current Year: ', calendar.getYear());
        },
    });
}

function gotTo() {
    const calendar = new HelloWeek({
        ...commonOptions,
        onLoad: () => {
            calendar.goToDate(`2030-${MONTH}-01`);
        },
    });
}

function highlights() {
    new HelloWeek({
        ...commonOptions,
        todayHighlight: false,
        daysHighlight: [
            {
                days: [[`${YEAR}-${MONTH}-03`, `${YEAR}-${MONTH}-07`]],
                title: 'Holidays in Portugal',
                backgroundColor: '#f44336',
                color: '#fff',
            },
            {
                days: [[`${YEAR}-${MONTH}-20`, `${YEAR}-${MONTH}-22`]],
                title: 'Holidays in Paris',
                backgroundColor: '#2196F3',
                color: '#fff',
            },
            {
                days: [`${YEAR}-${MONTH}-18`],
                title: 'Mom Birthday',
                backgroundColor: '#9c27b0',
                color: '#fff',
            },
        ],
    });
}

function locked() {
    const calendar = new HelloWeek({
        ...commonOptions,
        locked: true,
        onNavigation: () => {
            calendar.setOptions((prev) => ({
                ...prev,
                locked: false,
            }));
        },
    });
}

function minMax({ min, max }) {
    document.querySelector('.btn').addEventListener('click', () => {
        to.restore();
        from.restore();
    });

    const to = new HelloWeek({
        ...commonOptions,
        selector: min,
        todayHighlight: false,
        onSelect: () => {
            const minDate = new Date(to.getDaySelected());
            minDate.setDate(minDate.getDate() - 1);
            from.setOptions((prev) => ({
                ...prev,
                minDate,
            }));
        },
    });

    const from = new HelloWeek({
        ...commonOptions,
        selector: max,
        todayHighlight: false,
        onSelect: () => {
            const maxDate = new Date(from.getDaySelected());
            maxDate.setDate(maxDate.getDate() + 1);
            from.setOptions((prev) => ({
                ...prev,
                maxDate,
            }));
        },
    });
}

function onSelect() {
    new HelloWeek({
        ...commonOptions,
        daysSelected: [
            `${YEAR}-${MONTH}-6`,
            `${YEAR}-${MONTH}-12`,
            `${YEAR}-${MONTH}-13`,
            `${YEAR}-${MONTH}-14`,
            `${YEAR}-${MONTH}-18`,
        ],
        multiplePick: true,
        onSelect: () => {
            console.log(calendar.getDays());
        },
    });
}

function range() {
    new HelloWeek({
        ...commonOptions,
        todayHighlight: false,
        range: true,
        multiplePick: true,
        daysSelected: [`${YEAR}-${MONTH}-10`, `${YEAR}-${MONTH}-20`],
    });
}

function rtl() {
    new HelloWeek({
        ...commonOptions,
        rtl: true,
    });
}

function selectedDays() {
    new HelloWeek({
        ...commonOptions,
        daysSelected: [
            `${YEAR}-${MONTH}-10`,
            `${YEAR}-${MONTH}-12`,
            `${YEAR}-${MONTH}-13`,
            `${YEAR}-${MONTH}-25`,
        ],
        todayHighlight: true,
        multiplePick: true,
    });
}

export const Example = {
    BeforeCreateDay: beforeCreateDay,
    DisableDates: disableDates,
    DisablePastDays: disablePastDays,
    DisabledDaysOfWeek: disabledDaysOfWeek,
    MonthYear: getMonthYear,
    GoTo: gotTo,
    Highlights: highlights,
    Locked: locked,
    MinMax: minMax,
    OnSelect: onSelect,
    Range: range,
    RTL: rtl,
    SelectedDays: selectedDays,
};
