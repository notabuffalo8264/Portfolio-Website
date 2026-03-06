const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseProjectDate(date: string): Date {
  const match = date.match(dateOnlyPattern);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }

  return new Date(date);
}

export function formatDate(date: string): string {
  const parsed = parseProjectDate(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (dateOnlyPattern.test(date)) {
    options.timeZone = "UTC";
  }

  return new Intl.DateTimeFormat("en-US", options).format(parsed);
}
