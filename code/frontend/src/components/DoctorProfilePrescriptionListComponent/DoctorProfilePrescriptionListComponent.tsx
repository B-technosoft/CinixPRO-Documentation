import { useGetPrescriptionsListForDoctorQuery } from "../../redux/api/doctor/doctor-prescriptions/doctor-prescriptions";

const DoctorProfilePrescriptionListComponent = () => {
  const { data, isFetching } = useGetPrescriptionsListForDoctorQuery({});

  return (
    <>
      <div className="overflow-x-auto">
        {isFetching && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {!isFetching && (
          <>
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>Sr.No.</th>
                  <th>Patient Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {(data as [])?.map((prescription: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{`${prescription.patient.firstName} ${prescription.patient.lastName}`}</td>
                    <td>{prescription.prescriptionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default DoctorProfilePrescriptionListComponent;
