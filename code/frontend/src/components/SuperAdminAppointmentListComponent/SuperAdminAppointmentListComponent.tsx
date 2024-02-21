import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import AppointmentTabLayoutComponent from "../layout/AppointmentTabLayoutComponent/AppointmentTabLayoutComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import SuperAdminCancelAppointmentComponent from "../SuperAdminCancelAppointmentComponent/SuperAdminCancelAppointmentComponent";
import SuperAdminCompleteAppointmentComponent from "../SuperAdminCompleteAppointmentComponent/SuperAdminCompleteAppointmentComponent";
import SuperAdminPendingAppointmentComponent from "../SuperAdminPendingAppointmentComponent/SuperAdminPendingAppointmentComponent";
import SuperAdminTodayAppointmentComponent from "../SuperAdminTodayAppointmentComponent/SuperAdminTodayAppointmentComponent";
import SuperAdminUpcomingAppointmentComponent from "../SuperAdminUpcomingAppointmentComponent/SuperAdminUpcomingAppointmentComponent";

const SuperAdminAppointmentListComponent = () => {
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
              <SuperAdminPendingAppointmentComponent />
            }
            todayAppointmentComponent={<SuperAdminTodayAppointmentComponent />}
            upcomingAppointmentComponent={
              <SuperAdminUpcomingAppointmentComponent />
            }
            completeAppointmentComponent={
              <SuperAdminCompleteAppointmentComponent />
            }
            cancelAppointmentComponent={
              <SuperAdminCancelAppointmentComponent />
            }
          />
        </div>
      </LayoutComponent>
    </>
  );
};

export default SuperAdminAppointmentListComponent;
