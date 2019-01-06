import {
  isDate,
  isFuture,
  isValid,
  differenceInYears,
  parse
} from 'date-fns';

export const isValidDate = (dateStr: string): boolean => {
  const date = parse(dateStr);
  return isValid(date)
  && isDate(date)
  && !isFuture(date)
  && differenceInYears(Date.now(), date) < 150;
};
