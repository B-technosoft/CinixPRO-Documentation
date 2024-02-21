import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useGetDoctorListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-doctor/receptionist-doctor";
import { Link } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ReceptionistDoctorTableComponent = () => {
  const [search, setSearch] = useState("");
  const { data, isFetching } = useGetDoctorListForReceptionisQuery({
    params: {
      search,
    },
  });

  return (
    <>
      <CardTitleComponent search={search} setSearch={setSearch} />
      <TableComponent
        isLoading={isFetching}
        theads={
          <thead className="bg-base-200">
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Pending Appointment</th>
              <th>Complete Appointment</th>
              <th>Option</th>
            </tr>
          </thead>
        }
        tbodys={
          <tbody>
            {!isFetching &&
              (data as [])?.map((doctor: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${doctor.doctor_firstName} ${doctor.doctor_lastName}`}</td>
                  <td>{`${doctor.doctor_specialization}`}</td>
                  <td>{`${doctor.doctor_email}`}</td>
                  <td>{`${doctor.doctor_contact}`}</td>
                  <td>{`${doctor.pending_appointment}`}</td>
                  <td>{`${doctor.complete_appointment}`}</td>
                  <td className="flex gap-2">
                    <Link
                      to={{
                        pathname: `/${Role.Receptionist}/doctor/${doctor.doctor_id}`,
                        search: `?name=${encodeURIComponent(
                          `${doctor.doctor_firstName} ${doctor.doctor_lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} size="xs" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        }
      />
    </>
  );
};

export default ReceptionistDoctorTableComponent;
