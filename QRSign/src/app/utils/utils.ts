export function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

export function getTodayTime() {
  var today = new Date();
  var hh = String(today.getHours());
  Number(hh) < 10 ? (hh = '0' + hh) : hh;
  var mm = String(today.getMinutes());
  Number(mm) < 10 ? (mm = '0' + mm) : mm;
  return hh + ':' + mm;
}

export function getValidDateFormat(): string {
  return getTodayDate() + 'T' + getTodayTime();
}
