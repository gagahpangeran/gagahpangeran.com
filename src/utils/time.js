const moment = require("moment");

export default function getDate(date) {
  return moment(date)
    .utcOffset(7)
    .format("D MMM YYYY, HH.mm");
}
