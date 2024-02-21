import dayjs from "dayjs";

export interface CalendarInterface {
  setDayFn: (day: dayjs.Dayjs) => void;
  data: any;
  isFetching: boolean;
}
