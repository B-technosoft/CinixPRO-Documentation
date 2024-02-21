import dayjs from "dayjs";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";
import { CalendarInterface } from "../../interface/calendarInterface.interface";

const PatientCalendarComponent = ({
  setDayFn,
  data,
  isFetching,
}: CalendarInterface) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!isFetching && data) {
      const events = data.result?.map((event: any) => {
        const { doctor } = event;

        return {
          title: `${doctor.firstName} ${doctor.lastName}`,
          date: event.appointmentDate,
        };
      });

      setEvents(events);
    }
  }, [data, isFetching]);

  const dateClick = (arg: DateClickArg) => {
    setDayFn(dayjs(arg.date));
  };

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-2 flex-1 basis-1/2">
      {isFetching && (
        <div className="flex justify-center items-center flex-1">
          <LoadingSpinnerComponent />
        </div>
      )}
      {!isFetching && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={dateClick}
        />
      )}
    </div>
  );
};

export default PatientCalendarComponent;
