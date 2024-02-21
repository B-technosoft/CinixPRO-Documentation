import { useParams } from "react-router-dom";
import { useGetPrescriptionsByPatientIdForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-prescription/super-admin-prescription";

const PatientTabPrescriptionListComponent = () => {
  const { id } = useParams();

  const { data, isFetching } =
    useGetPrescriptionsByPatientIdForSuperAdminQuery(id);

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
                </tr>
              </thead>
              <tbody>
                {data &&
                  (data as [])?.map((prescription: any, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{`${prescription.doctor.firstName} ${prescription.doctor.lastName}`}</td>
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

export default PatientTabPrescriptionListComponent;
