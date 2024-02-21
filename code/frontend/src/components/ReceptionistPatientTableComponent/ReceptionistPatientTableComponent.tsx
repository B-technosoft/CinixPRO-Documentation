import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useGetPatientListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-patient/receptionist-patient";
import { Link } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ReceptionistPatientTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetPatientListForReceptionisQuery({
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
              <th>Contact No</th>
              <th>Email</th>
              <th>Option</th>
            </tr>
          </thead>
        }
        tbodys={
          <tbody>
            {!isFetching &&
              (data as [])?.map((patient: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${patient.firstName} ${patient.lastName}`}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.email}</td>
                  <td className="flex gap-2">
                    <Link
                      to={{
                        pathname: `/${Role.Receptionist}/patients/${patient.id}`,
                        search: `?name=${encodeURIComponent(
                          `${patient.firstName} ${patient.lastName}`
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

export default ReceptionistPatientTableComponent;
