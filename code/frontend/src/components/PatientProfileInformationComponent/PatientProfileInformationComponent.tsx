import { useState } from "react";
import { PatientInformationTabEnum } from "../PatientInformationComponent/patient_information_tab_enum";
import ProfileMedicalInformationComponent from "../ProfileMedicalInformationComponent/ProfileMedicalInformationComponent";
import ProfilePatientAppointmentListComponent from "../ProfilePatientAppointmentListComponent/ProfilePatientAppointmentListComponent";
import ProfilePatientPrescriptionListComponent from "../ProfilePatientPrescriptionListComponent/ProfilePatientPrescriptionListComponent";
import ProfilePatientInvoiceComponent from "../ProfilePatientInvoiceComponent/ProfilePatientInvoiceComponent";

const PatientProfileInformationComponent = () => {
  const [tab, setTab] = useState(PatientInformationTabEnum.MedicalInformation);

  const onClickTab = (tab: PatientInformationTabEnum) => {
    setTab(tab);
  };

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <div className="tabs tabs-bordered ">
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
            <ProfileMedicalInformationComponent />
          )}
          {tab === PatientInformationTabEnum.AppointmentList && (
            <ProfilePatientAppointmentListComponent />
          )}
          {tab === PatientInformationTabEnum.PrescriptionList && (
            <ProfilePatientPrescriptionListComponent />
          )}
          {tab === PatientInformationTabEnum.Invoice && (
            <ProfilePatientInvoiceComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileInformationComponent;
