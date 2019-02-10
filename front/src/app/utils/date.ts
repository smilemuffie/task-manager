import {
  isDate,
  isFuture,
  isValid,
  differenceInYears,
  parse,
  format
} from 'date-fns';

export const isValidDate = (dateStr: string): boolean => {
  const date = parse(dateStr);
  return isValid(date);
};

export const convertToDate = (date: Date) => {
  return format(date, 'YYYY-MM-DD');
};
