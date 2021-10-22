import moment from "moment-timezone";
import "moment/locale/id";
moment.locale("id");

export const dateOnly = (date) => {
  return moment(date).tz("Asia/Jakarta").format("dddd, DD MMMM yyyy");
};

export const dateAndTime = (date) => {
  return (
    moment(date).tz("Asia/Jakarta").format("dddd, DD MMMM yyyy (HH:mm  ") +
    "WIB)"
  );
};
