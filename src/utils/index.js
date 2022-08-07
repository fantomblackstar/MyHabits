function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}

export function getDayOfWeek(date) {
  return date.toUTCString().split(',')[0]
}

export function getDateFromStr(str) {
  // str must be: DD:MM:YYYY
  let startDate = str.split(/\D/g);
  return new Date(+startDate[2], +startDate[1] - 1, +startDate[0])
}