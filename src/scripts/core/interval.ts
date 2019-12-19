import { timestampToHuman } from './timestamp';

export function getIntervalOfDates(startDate: number, endDate: number, langs: any) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function(this: any, days: any) {
    const dt = new Date(this.valueOf());
    dt.setDate(dt.getDate() + days);
    return dt.getTime();
  };
  while (currentDate <= endDate) {
    dates.push(timestampToHuman(currentDate, langs));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}
