import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import {
  prescriptionsReceptionis,
  useGetPrescriptionsListForReceptionisQuery,
} from "../../redux/api/receptionist/receptionist-prescriptions/receptionist-prescriptions";
import { store } from "../../redux";
import { Link } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ReceptionistPrescriptionsTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetPrescriptionsListForReceptionisQuery({
    params: {
      search,
    },
  });

  const onClickwhatsappBtn = async (phoneNumber: number, fileName: string) => {
    const result = await store.dispatch(
      prescriptionsReceptionis.endpoints.prescriptionsPDFForReceptionis.initiate(
        fileName
      )
    );

    console.log(result);

    if (result.status === "fulfilled") {
      const url = `https://wa.me/${phoneNumber}?text=hello&media=${new Blob(
        [result.data],
        {
          type: "application/pdf",
        }
      )}`;

      window.open(url, "_blank");
    }
  };

  return (
    <>
      <CardTitleComponent search={search} setSearch={setSearch} />
      <TableComponent
        isLoading={isFetching}
        theads={
          <thead className="bg-base-200">
            <tr>
              <th>Sr.No.</th>
              <th>Patient Name</th>
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
                  <td>{`${prescription.patient.firstName} ${prescription.patient.lastName}`}</td>
                  <td>{`${prescription.doctor.firstName} ${prescription.doctor.lastName}`}</td>
                  <td>{`${prescription.appointment.appointmentDate}`}</td>
                  <td>{`${prescription.appointment.appointmentStartTime} to ${prescription.appointment.appointmentEndTime}`}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/${Role.Receptionist}/prescriptions/view/${prescription.fileName}`}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} size="xs" />
                    </Link>
                    <button
                      onClick={() =>
                        onClickwhatsappBtn(
                          prescription.patient.contact,
                          prescription.fileName
                        )
                      }
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        }
      />
    </>
  );
};

export default ReceptionistPrescriptionsTableComponent;
