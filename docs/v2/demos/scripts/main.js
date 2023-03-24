import HelloWeek from './hello.week.esm.js';

const commonOptions = {
    selector: '.calendar',
    langFolder: './langs/',
};

function range() {
    new HelloWeek({
        ...commonOptions,
        range: ['2020-01-10', '2020-01-24'],
        todayHighlight: false,
    });
}

function reset() {
    const calendar = new HelloWeek({
        ...commonOptions,
        defaultDate: '2020-01-01',
        minDate: '2020-01-10',
        maxDate: '2020-03-28',
    });

    document.querySelector('.btn').addEventListener('click', () => {
        calendar.reset({
            minDate: false,
            maxDate: false,
        });
    });

    document.querySelector('.destroy').addEventListener('click', () => {
        calendar.destroy();
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
    Range: range,
    Reset: reset,
    RTL: rtl,
    SelectedDays: selectedDays,
};
