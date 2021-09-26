import moment from "moment";

export const dateOnly = (date) => {
  return moment(date).format("DD-MM-yyyy");
};
