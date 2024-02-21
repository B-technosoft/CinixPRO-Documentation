import { useState } from "react";
import { Role } from "../../enums/role.enums";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import NewButtonComponent from "../NewButtonComponent/NewButtonComponent";

import dayjs from "dayjs";
import ReceptionistCalendarComponent from "../ReceptionistCalendarComponent/ReceptionistCalendarComponent";
import ReceptionistCalendarAppointmentListComponent from "../ReceptionistCalendarAppointmentListComponent/ReceptionistCalendarAppointmentListComponent";
import { useGetAppointmentCalenderForReceptionisQuery } from "../../redux/api/receptionist/receptionist-appointment/receptionist-appointment";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const ReceptionistCalendarAppointmentComponent = () => {
  const [day, setDay] = useState<dayjs.Dayjs>(dayjs());

  const setDayFn = (day: dayjs.Dayjs) => {
    setDay(day);
  };

  const { data, isFetching } = useGetAppointmentCalenderForReceptionisQuery({});

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h1 className="font-bold">BOOK APPOINTMENT</h1>
            <BreadcrumbComponent />
          </div>
          <div className="flex justify-between">
            <NewButtonComponent
              route={`/${Role.Receptionist}/appointment/create`}
              title="APPOINTMENT"
            />
          </div>
          <div className="flex gap-6">
            <ReceptionistCalendarComponent
              setDayFn={setDayFn}
              data={data}
              isFetching={isFetching}
            />
            <ReceptionistCalendarAppointmentListComponent day={day} />
          </div>
        </div>
      </LayoutComponent>
    </>
  );
};

export default ReceptionistCalendarAppointmentComponent;
