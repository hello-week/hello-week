import { HelloWeek } from './hello-week';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MyModule {
    export const Calendar = HelloWeek;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).HelloWeek = MyModule.Calendar;

export default HelloWeek;
