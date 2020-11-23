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
  var mm = String(today.getMinutes());
  return hh + ':' + mm;
}
