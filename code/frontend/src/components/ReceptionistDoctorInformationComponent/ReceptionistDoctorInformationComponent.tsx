import { useState } from "react";
import { DoctorInformationTabEnum } from "./doctor_information_tab_enum";
import ReceptionistDoctorAppointmentListComponent from "../ReceptionistDoctorAppointmentListComponent/ReceptionistDoctorAppointmentListComponent";
import ReceptionistDoctorPrescriptionListComponent from "../ReceptionistDoctorPrescriptionListComponent/ReceptionistDoctorPrescriptionListComponent";
import ReceptionistDoctorInvoiceComponent from "../ReceptionistDoctorInvoiceComponent/ReceptionistDoctorInvoiceComponent";

const ReceptionistDoctorInformationComponent = () => {
  const [tab, setTab] = useState(DoctorInformationTabEnum.AppointmentList);

  const onClickTab = (tab: DoctorInformationTabEnum) => {
    setTab(tab);
  };

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <div className="tabs tabs-bordered flex">
          <div
            className={`tab tab-bordered w-[20rem] ${
              tab === DoctorInformationTabEnum.AppointmentList
                ? "tab-active"
                : ""
            } `}
            onClick={() => onClickTab(DoctorInformationTabEnum.AppointmentList)}
          >
            Appointment List
          </div>
          <div
            className={`tab tab-bordered w-[20rem] ${
              tab === DoctorInformationTabEnum.PrescriptionList
                ? "tab-active"
                : ""
            } `}
            onClick={() =>
              onClickTab(DoctorInformationTabEnum.PrescriptionList)
            }
          >
            Prescription List
          </div>
          <div
            className={`tab tab-bordered w-[20rem] ${
              tab === DoctorInformationTabEnum.Invoice ? "tab-active" : ""
            } `}
            onClick={() => onClickTab(DoctorInformationTabEnum.Invoice)}
          >
            Invoice
          </div>
        </div>
        <div className="p-4">
          {tab === DoctorInformationTabEnum.AppointmentList && (
            <ReceptionistDoctorAppointmentListComponent />
          )}
          {tab === DoctorInformationTabEnum.PrescriptionList && (
            <ReceptionistDoctorPrescriptionListComponent />
          )}
          {tab === DoctorInformationTabEnum.Invoice && (
            <ReceptionistDoctorInvoiceComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDoctorInformationComponent;
