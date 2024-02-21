import { AppointmentTabEnum } from "../../enums/appointment_tab.enums";

export interface TabComponentInterface {
  tab: AppointmentTabEnum;
  setTab: React.Dispatch<React.SetStateAction<AppointmentTabEnum>>;
}
