import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useGetPrescriptionsListForPatientQuery } from "../../redux/api/patient/patient-prescription/patient-prescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PatientPrescriptionsTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetPrescriptionsListForPatientQuery({
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
              <th>Doctor Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Option</th>
            </tr>
          </thead>
        }
        tbodys={
          <tbody>
            {!isFetching &&
              (data as [])?.map((prescription: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${prescription.doctor.firstName} ${prescription.doctor.lastName}`}</td>
                  <td>{`${prescription.appointment.appointmentDate}`}</td>
                  <td>{`${prescription.appointment.appointmentStartTime} to ${prescription.appointment.appointmentEndTime}`}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/${Role.Patient}/prescription/view/${prescription.fileName}`}
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

export default PatientPrescriptionsTableComponent;
