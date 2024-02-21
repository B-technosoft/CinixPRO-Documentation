import { Link, useParams } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useGetPrescriptionsByPatientIdForDoctorQuery } from "../../redux/api/doctor/doctor-prescriptions/doctor-prescriptions";

const DoctorPatientPrescriptionListComponent = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetPrescriptionsByPatientIdForDoctorQuery(id);

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
                    <td>
                      <Link
                        to={{
                          pathname: `/${Role.Doctor}/prescriptions/view/${prescription.fileName}`,
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

export default DoctorPatientPrescriptionListComponent;
