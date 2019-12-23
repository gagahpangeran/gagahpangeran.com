import moment from "moment";

export default function getDate(date: string) {
  return moment(date)
    .utcOffset(7)
    .format("D MMM YYYY, HH.mm");
}
