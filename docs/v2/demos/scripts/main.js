import HelloWeek from './hello.week.esm.js';

const commonOptions = {
    selector: '.calendar',
    langFolder: './langs/',
};

const YEAR = new Date().getFullYear();
const MONTH = (new Date().getMonth() + 1).toString().padStart(2, 0);

function locked() {
    const calendar = new HelloWeek({
        ...commonOptions,
        locked: true,
        onNavigation: () => {
            calendar.setLocked(false);
            calendar.update();
        },
    });
}

function minMax({ min, max }) {
    document.querySelector('.btn').addEventListener('click', () => {
        to.reset({ minDate: false });
        from.reset({ maxDate: false });
    });

    const to = new HelloWeek({
        ...commonOptions,
        selector: min,
        todayHighlight: false,
        onSelect: () => {
            from.setMinDate(to.getDaySelected());
            from.update();
        },
    });

    const from = new HelloWeek({
        ...commonOptions,
        selector: max,
        todayHighlight: false,
        onSelect: () => {
            to.setMaxDate(from.getDaySelected());
            to.update();
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

function reset() {
    const calendar = new HelloWeek({
        ...commonOptions,
        defaultDate: `${YEAR}-${MONTH}-01`,
        minDate: `${YEAR}-${MONTH}-10`,
        maxDate: `${YEAR}-${MONTH}-20`,
    });

    document.querySelector('.btn').addEventListener('click', () => {
        calendar.reset({
            minDate: false,
            maxDate: false,
        });
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
        daysSelected: ['2022-10-10', '2022-10-12', '2022-10-13', '2022-10-25'],
        todayHighlight: true,
        multiplePick: true,
    });
}

export const Example = {
    Locked: locked,
    MinMax: minMax,
    OnSelect: onSelect,
    Range: range,
    Reset: reset,
    RTL: rtl,
    SelectedDays: selectedDays,
};
