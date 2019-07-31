export function formatDate(day: number, month: number, year: number): string {
    return `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + day).slice(-2)}`;
}
