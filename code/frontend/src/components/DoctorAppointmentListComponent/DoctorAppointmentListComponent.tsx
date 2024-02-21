import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import DoctorCancelAppointmentComponent from "../DoctorCancelAppointmentComponent/DoctorCancelAppointmentComponent";
import DoctorCompleteAppointmentComponent from "../DoctorCompleteAppointmentComponent/DoctorCompleteAppointmentComponent";
import DoctorPendingAppointmentComponent from "../DoctorPendingAppointmentComponent/DoctorPendingAppointmentComponent";
import DoctorTodayAppointmentComponent from "../DoctorTodayAppointmentComponent/DoctorTodayAppointmentComponent";
import DoctorUpcomingAppointmentComponent from "../DoctorUpcomingAppointmentComponent/DoctorUpcomingAppointmentComponent";
import AppointmentTabLayoutComponent from "../layout/AppointmentTabLayoutComponent/AppointmentTabLayoutComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";

const DoctorAppointmentListComponent = () => {
  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h1 className="font-bold">Appointment LIST</h1>
            <BreadcrumbComponent />
          </div>
          <AppointmentTabLayoutComponent
            pendingAppointmentComponent={<DoctorPendingAppointmentComponent />}
            todayAppointmentComponent={<DoctorTodayAppointmentComponent />}
            upcomingAppointmentComponent={
              <DoctorUpcomingAppointmentComponent />
            }
            completeAppointmentComponent={
              <DoctorCompleteAppointmentComponent />
            }
            cancelAppointmentComponent={<DoctorCancelAppointmentComponent />}
          />
        </div>
      </LayoutComponent>
    </>
  );
};

export default DoctorAppointmentListComponent;
