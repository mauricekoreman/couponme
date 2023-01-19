export function localDateString(ISODate: string) {
  const local = new Date(ISODate).toLocaleDateString();
  return local;
}

export function inputDateString(date: Date) {
  const format = date.toISOString().slice(0, 10);
  return format;
}
