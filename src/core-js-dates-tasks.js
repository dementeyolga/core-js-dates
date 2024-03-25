/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Number(new Date(date));
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  return date.toLocaleTimeString();
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dateObj = new Date(Date.parse(date));

  return weekDays[dateObj.getUTCDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const weekDay = date.getUTCDay();
  let diff;

  if (weekDay < 5) {
    diff = 5 - weekDay;
  } else {
    diff = 7 - weekDay + 5;
  }

  date.setDate(date.getDate() + diff);

  return date;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const date = new Date(year, month - 1);
  const copy = new Date(date);
  copy.setUTCMonth(date.getUTCMonth() + 1);
  const diff = (copy - date) / 1000 / 60 / 60 / 24;

  return diff;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStartStr, dateEndStr) {
  const dateStart = new Date(dateStartStr);
  const dateEnd = new Date(dateEndStr);

  const dayInMilliseconds = 1000 * 60 * 60 * 24;

  return (dateEnd - dateStart) / dayInMilliseconds + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(dateStr, period) {
  const date = new Date(dateStr);
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);

  if (date < startDate || date > endDate) return false;

  return true;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = date.getUTCSeconds();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const dayPart = hours >= 1 && hours <= 11 ? 'AM' : 'PM';
  const hoursFormatted = hours !== 0 && hours !== 12 ? hours % 12 : 12;

  return `${month}/${day}/${year}, ${hoursFormatted}:${formattedMinutes}:${formattedSeconds} ${dayPart}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const daysInMonth = getCountDaysInMonth(month, year);
  const date = new Date(year, month - 1);
  let counter = 0;

  for (let i = 0; i < daysInMonth; i += 1) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + i);

    if (copy.getDay() === 6 || copy.getDay() === 0) counter += 1;
  }

  return counter;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const yearStart = new Date(date);
  yearStart.setUTCMonth(0, 1);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor((date - yearStart) / msPerDay);

  let shift = 0;
  if (yearStart.getUTCDay() !== 1 && yearStart.getUTCDay() !== 0) {
    shift = yearStart.getUTCDay() - 1;
  } else if (yearStart.getUTCDay() === 0) {
    shift = 6;
  }

  const weekNo = Math.ceil((diffInDays + shift + 1) / 7);

  return weekNo;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const copy = new Date(date);
  let monthCounter = copy.getMonth();
  let found;

  while (typeof monthCounter === 'number') {
    const localCopy = new Date(copy);
    localCopy.setMonth(monthCounter, 13);

    if (localCopy.getDay() === 5) {
      found = localCopy;
      break;
    }

    monthCounter += 1;
  }

  return found;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getMonth() + 1;

  return Math.ceil(month / 3);
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const [startDay, startMonth, startYear] = period.start.split('-');
  const startDate = new Date(startYear, startMonth - 1, startDay);

  const [endDay, endMonth, endYear] = period.end.split('-');
  const endDate = new Date(endYear, endMonth - 1, endDay);
  const startDateCopy = new Date(startDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.ceil((endDate - startDate) / msPerDay);

  const workDaysArr = [];
  let interimDateCounter = 0;

  while (interimDateCounter <= diff) {
    for (let j = 0; j < countWorkDays; j += 1) {
      const localCopy = new Date(startDateCopy);
      localCopy.setUTCDate(localCopy.getUTCDate() + interimDateCounter);

      const date = localCopy.getUTCDate();
      const month = localCopy.getUTCMonth() + 1;
      const formatted = `${date < 10 ? `0${date}` : date}-${month < 10 ? `0${month}` : month}-${localCopy.getUTCFullYear()}`;
      workDaysArr.push(formatted);

      interimDateCounter += 1;
      if (interimDateCounter > diff) break;
    }

    interimDateCounter += countOffDays;
  }

  return workDaysArr;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }

  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
