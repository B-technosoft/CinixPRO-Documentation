import { useState } from "react";
import { Role } from "../../enums/role.enums";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import NewButtonComponent from "../NewButtonComponent/NewButtonComponent";
import dayjs from "dayjs";
import PatientCalendarComponent from "../PatientCalendarComponent/PatientCalendarComponent";
import { useGetAppointmentCalenderForPatientQuery } from "../../redux/api/patient/patient-appointment/patient-appointment";
import PatientCalendarAppointmentListComponent from "../PatientCalendarAppointmentListComponent/PatientCalendarAppointmentListComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const PatientCalendarAppointmentComponent = () => {
  const [day, setDay] = useState<dayjs.Dayjs>(dayjs());

  const setDayFn = (day: dayjs.Dayjs) => {
    setDay(day);
  };

  const { data, isFetching } = useGetAppointmentCalenderForPatientQuery({});

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
              route={`/${Role.Patient}/appointment/create`}
              title="APPOINTMENT"
            />
          </div>
          <div className="flex gap-6">
            <PatientCalendarComponent
              setDayFn={setDayFn}
              data={data}
              isFetching={isFetching}
            />
            <PatientCalendarAppointmentListComponent day={day} />
          </div>
        </div>
      </LayoutComponent>
    </>
  );
};

export default PatientCalendarAppointmentComponent;
