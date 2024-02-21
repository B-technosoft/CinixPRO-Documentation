import { useState } from "react";
import { PatientInformationTabEnum } from "./patient_information_tab_enum";
import ReceptionistMedicalInformationComponent from "../ReceptionistMedicalInformationComponent/ReceptionistMedicalInformationComponent";
import ReceptionistPatientAppointmentListComponent from "../ReceptionistPatientAppointmentListComponent/ReceptionistPatientAppointmentListComponent";
import ReceptionistPatientPrescriptionListComponent from "../ReceptionistPatientPrescriptionListComponent/ReceptionistPatientPrescriptionListComponent";
import ReceptionistPatientInvoiceComponent from "../ReceptionistPatientInvoiceComponent/ReceptionistPatientInvoiceComponent";

const ReceptionistPatientInformationComponent = () => {
  const [tab, setTab] = useState(PatientInformationTabEnum.MedicalInformation);

  const onClickTab = (tab: PatientInformationTabEnum) => {
    setTab(tab);
  };

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <div className="tabs tabs-bordered flex">
          <div
            className={`tab tab-bordered w-[15rem] ${
              tab === PatientInformationTabEnum.MedicalInformation
                ? "tab-active"
                : ""
            } `}
            onClick={() =>
              onClickTab(PatientInformationTabEnum.MedicalInformation)
            }
          >
            Medical Information
          </div>
          <div
            className={`tab tab-bordered w-[15rem] ${
              tab === PatientInformationTabEnum.AppointmentList
                ? "tab-active"
                : ""
            } `}
            onClick={() =>
              onClickTab(PatientInformationTabEnum.AppointmentList)
            }
          >
            Appointment List
          </div>
          <div
            className={`tab tab-bordered w-[15rem] ${
              tab === PatientInformationTabEnum.PrescriptionList
                ? "tab-active"
                : ""
            } `}
            onClick={() =>
              onClickTab(PatientInformationTabEnum.PrescriptionList)
            }
          >
            Prescription List
          </div>
          <div
            className={`tab tab-bordered w-[15rem] ${
              tab === PatientInformationTabEnum.Invoice ? "tab-active" : ""
            } `}
            onClick={() => onClickTab(PatientInformationTabEnum.Invoice)}
          >
            Invoice
          </div>
        </div>
        <div className="p-4">
          {tab === PatientInformationTabEnum.MedicalInformation && (
            <ReceptionistMedicalInformationComponent />
          )}
          {tab === PatientInformationTabEnum.AppointmentList && (
            <ReceptionistPatientAppointmentListComponent />
          )}
          {tab === PatientInformationTabEnum.PrescriptionList && (
            <ReceptionistPatientPrescriptionListComponent />
          )}
          {tab === PatientInformationTabEnum.Invoice && (
            <ReceptionistPatientInvoiceComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistPatientInformationComponent;
