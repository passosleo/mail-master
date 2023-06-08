import moment from 'moment';

export function useDateHelper() {
  function formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  function date() {
    return moment().format('YYYY-MM-DD');
  }

  function formatedDate() {
    return moment().format('DD/MM/YYYY');
  }

  function thirtyDaysAgo() {
    return moment().subtract(30, 'days').format('YYYY-MM-DD');
  }

  function datetime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  function oneHourForward() {
    return moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
  }

  function actualMonth() {
    return moment().month() + 1;
  }

  function calculateExpiration({
    minutes,
    hours,
    days,
  }: {
    minutes?: number;
    hours?: number;
    days?: number;
  }) {
    const expiresAt = new Date();

    if (minutes) expiresAt.setMinutes(expiresAt.getMinutes() + minutes);

    if (hours) expiresAt.setHours(expiresAt.getHours() + hours);

    if (days) expiresAt.setDate(expiresAt.getDate() + days);

    return expiresAt;
  }

  function isExpiredDate(date: Date | string) {
    return moment(date).isBefore(moment());
  }

  return {
    formatDate,
    date,
    formatedDate,
    thirtyDaysAgo,
    datetime,
    oneHourForward,
    actualMonth,
    calculateExpiration,
    isExpiredDate,
  };
}
