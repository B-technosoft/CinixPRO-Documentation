import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import AppointmentTabLayoutComponent from "../layout/AppointmentTabLayoutComponent/AppointmentTabLayoutComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import ReceptionistCancelAppointmentComponent from "../ReceptionistCancelAppointmentComponent/ReceptionistCancelAppointmentComponent";
import ReceptionistCompleteAppointmentComponent from "../ReceptionistCompleteAppointmentComponent/ReceptionistCompleteAppointmentComponent";
import ReceptionistPendingAppointmentComponent from "../ReceptionistPendingAppointmentComponent/ReceptionistPendingAppointmentComponent";
import ReceptionistTodayAppointmentComponent from "../ReceptionistTodayAppointmentComponent/ReceptionistTodayAppointmentComponent";
import ReceptionistUpcomingAppointmentComponent from "../ReceptionistUpcomingAppointmentComponent/ReceptionistUpcomingAppointmentComponent";

const ReceptionistAppointmentListComponent = () => {
  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h1 className="font-bold">Appointment LIST</h1>
            <BreadcrumbComponent />
          </div>
          <AppointmentTabLayoutComponent
            pendingAppointmentComponent={
              <ReceptionistPendingAppointmentComponent />
            }
            todayAppointmentComponent={
              <ReceptionistTodayAppointmentComponent />
            }
            upcomingAppointmentComponent={
              <ReceptionistUpcomingAppointmentComponent />
            }
            completeAppointmentComponent={
              <ReceptionistCompleteAppointmentComponent />
            }
            cancelAppointmentComponent={
              <ReceptionistCancelAppointmentComponent />
            }
          />
        </div>
      </LayoutComponent>
    </>
  );
};

export default ReceptionistAppointmentListComponent;
