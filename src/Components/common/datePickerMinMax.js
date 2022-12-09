export var maxDateTo = getDateFormat();
export var maxDateFrom = getDateFormat();
export var minDateTo;
export var minDateFrom;

function getDateFormat() {
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  return year + "-" + month + "-" + day;
}

export default function dateChange(e, type) {
  if (type == "from_date") {
    minDateTo = e;
  }
  if (type == "to_date") {
    maxDateFrom = e;
  }
}
