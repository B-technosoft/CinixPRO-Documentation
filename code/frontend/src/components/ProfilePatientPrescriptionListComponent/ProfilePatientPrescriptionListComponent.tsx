import { useGetPrescriptionsListForPatientQuery } from "../../redux/api/patient/patient-prescription/patient-prescription";

const ProfilePatientPrescriptionListComponent = () => {
  const { data, isFetching } = useGetPrescriptionsListForPatientQuery({
    params: {},
  });

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
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {(data as [])?.map((prescription: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{`${prescription.doctor.firstName} ${prescription.doctor.lastName}`}</td>
                    <td>{prescription.prescriptionDate}</td>
                    <td>option</td>
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

export default ProfilePatientPrescriptionListComponent;
