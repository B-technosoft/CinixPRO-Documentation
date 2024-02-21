import { useState } from "react";
import { DoctorInformationTabEnum } from "../ReceptionistDoctorInformationComponent/doctor_information_tab_enum";
import DoctorProfileAppointmentListComponent from "../DoctorProfileAppointmentListComponent/DoctorProfileAppointmentListComponent";
import DoctorProfilePrescriptionListComponent from "../DoctorProfilePrescriptionListComponent/DoctorProfilePrescriptionListComponent";
import DoctorProfileInvoiceComponent from "../DoctorProfileInvoiceComponent/DoctorProfileInvoiceComponent";

const DoctorProfileInformationComponent = () => {
  const [tab, setTab] = useState(DoctorInformationTabEnum.AppointmentList);

  const onClickTab = (tab: DoctorInformationTabEnum) => {
    setTab(tab);
  };

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <div className="tabs tabs-bordered">
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
            <DoctorProfileAppointmentListComponent />
          )}
          {tab === DoctorInformationTabEnum.PrescriptionList && (
            <DoctorProfilePrescriptionListComponent />
          )}
          {tab === DoctorInformationTabEnum.Invoice && (
            <DoctorProfileInvoiceComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileInformationComponent;
