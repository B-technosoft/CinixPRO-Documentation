import { Link, useParams } from "react-router-dom";
import { useGetPrescriptionsByDoctorIdForReceptionisQuery } from "../../redux/api/receptionist/receptionist-prescriptions/receptionist-prescriptions";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ReceptionistDoctorPrescriptionListComponent = () => {
  const { id } = useParams();

  const { data, isFetching } =
    useGetPrescriptionsByDoctorIdForReceptionisQuery(id);

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
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {(data as [])?.map((prescription: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{`${prescription.patient.firstName} ${prescription.patient.lastName}`}</td>
                    <td>{prescription.prescriptionDate}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/${Role.Receptionist}/prescriptions/view/${prescription.fileName}`,
                        }}
                        className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      >
                        <FontAwesomeIcon icon={faEye} size="xs" />
                      </Link>
                    </td>
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

export default ReceptionistDoctorPrescriptionListComponent;
