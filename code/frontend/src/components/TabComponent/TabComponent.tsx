import { AppointmentTabEnum } from "../../enums/appointment_tab.enums";
import { TabComponentInterface } from "./TabComponentInterface";

const TabComponent = ({ tab, setTab }: TabComponentInterface) => {
  const onClickTab = (tab: number) => {
    setTab(tab);
  };

  return (
    <div className="tabs tabs-bordered flex">
      <div
        className={`tab tab-bordered flex-grow ${
          tab === AppointmentTabEnum.Today ? "tab-active" : ""
        } `}
        onClick={() => onClickTab(AppointmentTabEnum.Today)}
      >
        Today&apos;s Appointment List
      </div>
      <div
        className={`tab tab-bordered flex-grow ${
          tab === AppointmentTabEnum.Pending ? "tab-active" : ""
        } `}
        onClick={() => onClickTab(AppointmentTabEnum.Pending)}
      >
        Pending Appointment
      </div>
      <div
        className={`tab tab-bordered flex-grow ${
          tab === AppointmentTabEnum.Upcoming ? "tab-active" : ""
        } `}
        onClick={() => onClickTab(AppointmentTabEnum.Upcoming)}
      >
        Upcoming Appointment
      </div>
      <div
        className={`tab tab-bordered flex-grow ${
          tab === AppointmentTabEnum.Complete ? "tab-active" : ""
        } `}
        onClick={() => onClickTab(AppointmentTabEnum.Complete)}
      >
        Complete Appointment
      </div>
      <div
        className={`tab tab-bordered flex-grow ${
          tab === AppointmentTabEnum.Cancel ? "tab-active" : ""
        }`}
        onClick={() => onClickTab(AppointmentTabEnum.Cancel)}
      >
        Cancel Appointment
      </div>
    </div>
  );
};

export default TabComponent;
