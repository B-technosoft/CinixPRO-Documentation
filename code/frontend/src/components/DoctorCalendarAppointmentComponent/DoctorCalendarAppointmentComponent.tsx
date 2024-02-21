import { useState } from "react";
import { Role } from "../../enums/role.enums";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import NewButtonComponent from "../NewButtonComponent/NewButtonComponent";
import dayjs from "dayjs";
import DoctorCalendarComponent from "../DoctorCalendarComponent/DoctorCalendarComponent";
import { useGetAppointmentCalenderForDoctorQuery } from "../../redux/api/doctor/doctor-appintment/doctor-appintment";
import DoctorCalendarAppointmentListComponent from "../DoctorCalendarAppointmentListComponent/DoctorCalendarAppointmentListComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const DoctorCalendarAppointmentComponent = () => {
  const [day, setDay] = useState<dayjs.Dayjs>(dayjs());

  const setDayFn = (day: dayjs.Dayjs) => {
    setDay(day);
  };

  const { data, isFetching } = useGetAppointmentCalenderForDoctorQuery({});

  console.log(data);

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
              route={`/${Role.Doctor}/appointment/create`}
              title="APPOINTMENT"
            />
          </div>
          <div className="flex gap-6">
            <DoctorCalendarComponent
              setDayFn={setDayFn}
              data={data}
              isFetching={isFetching}
            />
            <DoctorCalendarAppointmentListComponent day={day} />
          </div>
        </div>
      </LayoutComponent>
    </>
  );
};

export default DoctorCalendarAppointmentComponent;
