export function formatDate(date: Date) {
  const format = date.toISOString().slice(0, 10);

  return format;
}
