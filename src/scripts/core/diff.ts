import { timestampToHuman } from "./timestamp";

export function diff(start: any, end: any) {
    const dates = [];
    let currentDate = start;
    const addDays = (days: any) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.getTime();
    };
    while (currentDate <= end) {
        dates.push(timestampToHuman(currentDate));
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}
