import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useGetReceptionistListForDoctorQuery } from "../../redux/api/doctor/doctor-receptionists/doctor-receptionists";
import { Link } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DoctorReceptionistsTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetReceptionistListForDoctorQuery({
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
              (data as [])?.map((receptionist: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${receptionist.firstName} ${receptionist.lastName}`}</td>
                  <td>{receptionist.contact}</td>
                  <td>{receptionist.email}</td>
                  <td className="flex gap-2">
                    <Link
                      to={{
                        pathname: `/${Role.Doctor}/receptionists/${receptionist.id}`,
                        search: `?name=${encodeURIComponent(
                          `${receptionist.firstName} ${receptionist.lastName}`
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

export default DoctorReceptionistsTableComponent;
