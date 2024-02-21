import { useState } from "react";
import { AppointmentTabEnum } from "../../../enums/appointment_tab.enums";
import TabComponent from "../../TabComponent/TabComponent";

export interface AppointmentTabLayoutComponentInterface {
  todayAppointmentComponent: React.ReactNode;
  pendingAppointmentComponent: React.ReactNode;
  completeAppointmentComponent: React.ReactNode;
  cancelAppointmentComponent: React.ReactNode;
  upcomingAppointmentComponent: React.ReactNode;
}

const AppointmentTabLayoutComponent = ({
  cancelAppointmentComponent,
  completeAppointmentComponent,
  pendingAppointmentComponent,
  todayAppointmentComponent,
  upcomingAppointmentComponent,
}: AppointmentTabLayoutComponentInterface) => {
  const [tab, setTab] = useState(AppointmentTabEnum.Pending);

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <TabComponent tab={tab} setTab={setTab} />
        <div className="p-4">
          {tab === AppointmentTabEnum.Today && todayAppointmentComponent}
          {tab === AppointmentTabEnum.Pending && pendingAppointmentComponent}
          {tab === AppointmentTabEnum.Upcoming && upcomingAppointmentComponent}
          {tab === AppointmentTabEnum.Complete && completeAppointmentComponent}
          {tab === AppointmentTabEnum.Cancel && cancelAppointmentComponent}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTabLayoutComponent;
