export function normalizeDate(date: number): number {
  const dt = new Date(date);
  return dt.getFullYear() + dt.getMonth() + 1 + dt.getDate();
}
