import { useState } from "react";
import { PatientInformationTabEnum } from "../PatientInformationComponent/patient_information_tab_enum";
import DoctorMedicalInformationComponent from "../DoctorMedicalInformationComponent/DoctorMedicalInformationComponent";
import DoctorPatientAppointmentListComponent from "../DoctorPatientAppointmentListComponent/DoctorPatientAppointmentListComponent";
import DoctorPatientPrescriptionListComponent from "../DoctorPatientPrescriptionListComponent/DoctorPatientPrescriptionListComponent";
import DoctorPatientInvoiceComponent from "../DoctorPatientInvoiceComponent/DoctorPatientInvoiceComponent";

const DoctorPatientInformationComponent = () => {
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
            <DoctorMedicalInformationComponent />
          )}
          {tab === PatientInformationTabEnum.AppointmentList && (
            <DoctorPatientAppointmentListComponent />
          )}
          {tab === PatientInformationTabEnum.PrescriptionList && (
            <DoctorPatientPrescriptionListComponent />
          )}
          {tab === PatientInformationTabEnum.Invoice && (
            <DoctorPatientInvoiceComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientInformationComponent;
