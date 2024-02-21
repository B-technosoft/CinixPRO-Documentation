import { useState } from "react";
import { ReceptionistsInformationTabEnum } from "../ReceptionistsInformationComponent/receptionis_information_tab_enum";
import ReceptionistsProfileAppointmentListComponent from "../ReceptionistsProfileAppointmentListComponent/ReceptionistsProfileAppointmentListComponent";

const ReceptionistsProfileInformationComponent = () => {
  const [tab, setTab] = useState(
    ReceptionistsInformationTabEnum.AppointmentList
  );

  const onClickTab = (tab: ReceptionistsInformationTabEnum) => {
    setTab(tab);
  };

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <div className="tabs tabs-bordered">
          <div
            className={`tab tab-bordered w-full ${
              tab === ReceptionistsInformationTabEnum.AppointmentList
                ? "tab-active"
                : ""
            } `}
            onClick={() =>
              onClickTab(ReceptionistsInformationTabEnum.AppointmentList)
            }
          >
            Appointment List
          </div>
        </div>
        <div className="p-4">
          {tab === ReceptionistsInformationTabEnum.AppointmentList && (
            <ReceptionistsProfileAppointmentListComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistsProfileInformationComponent;
