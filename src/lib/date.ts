import { format as dateFnsFormat, addDays as dateFnsAddDays, startOfWeek as dateFnsStartOfWeek, endOfWeek as dateFnsEndOfWeek } from 'date-fns'

export const format = (date: Date, formatStr: string): string => {
  return dateFnsFormat(date, formatStr)
}

export const addDays = (date: Date, amount: number): Date => {
  return dateFnsAddDays(date, amount)
}

export const startOfWeek = (
  date: Date,
  options?: { weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 }
): Date => {
  return dateFnsStartOfWeek(date, options)
}

export const endOfWeek = (
  date: Date,
  options?: { weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 }
): Date => {
  return dateFnsEndOfWeek(date, options)
}

export const parseDate = (dateStr: string) => {
  const [month, day] = dateStr.split('/').map(Number);
  const currentYear = new Date().getFullYear();
  // If the month is less than the current month, it's likely in the next year
  const year = month < new Date().getMonth() + 1 ? currentYear + 1 : currentYear;
  return new Date(year, month - 1, day);
};