import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useGetInvoicesListForPatientQuery } from "../../redux/api/patient/patient-invoice/patient-invoice";
import { Link } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PatientInvoicesTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetInvoicesListForPatientQuery({
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
              <th>Status</th>
              <th>Option</th>
            </tr>
          </thead>
        }
        tbodys={
          <tbody>
            {!isFetching &&
              (data as [])?.map((invoice: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${invoice.doctor.firstName} ${invoice.doctor.lastName}`}</td>
                  <td>{invoice.appointment.appointmentDate}</td>
                  <td>{`${invoice.appointment.appointmentStartTime} To ${invoice.appointment.appointmentEndTime}`}</td>
                  <td>{invoice.paymentStatus}</td>
                  <td>
                    <Link
                      to={`/${Role.Patient}/invoice/view/${invoice.fileName}`}
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

export default PatientInvoicesTableComponent;
