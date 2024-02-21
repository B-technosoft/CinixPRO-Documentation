import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { Role } from "../../enums/role.enums";
import {
  doctorPrescriptions,
  useGetPrescriptionsListForDoctorQuery,
  useRemovePrescriptionsForDoctorMutation,
} from "../../redux/api/doctor/doctor-prescriptions/doctor-prescriptions";
import { useAppDispatch } from "../../redux/redux-hook";
import { setDialogId } from "../../redux/features/dialogSlice/dialogSlice";
import { store } from "../../redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import DialogComponent from "../DialogComponent/DialogComponent";

const DoctorPrescriptionsTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetPrescriptionsListForDoctorQuery({
    params: {
      search,
    },
  });

  const [removePrescription] = useRemovePrescriptionsForDoctorMutation();
  const dispatch = useAppDispatch();

  const onDeleteClick = async (id: number) => {
    dispatch(setDialogId(id));

    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  const onClickwhatsappBtn = async (phoneNumber: number, fileName: string) => {
    const result = await store.dispatch(
      doctorPrescriptions.endpoints.prescriptionsPDFForDoctor.initiate(fileName)
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
      <DialogComponent deleteCallBack={removePrescription} />
      <CardTitleComponent
        title="Presctiption"
        route={`/${Role.Doctor}/prescriptions/create`}
        search={search}
        setSearch={setSearch}
      />
      <TableComponent
        isLoading={isFetching}
        theads={
          <thead className="bg-base-200">
            <tr>
              <th>Sr.No.</th>
              <th>Patient Name</th>
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
                  <td>{`${prescription.appointment.appointmentDate}`}</td>
                  <td>{`${prescription.appointment.appointmentStartTime} to ${prescription.appointment.appointmentEndTime}`}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/${Role.Doctor}/prescriptions/view/${prescription.fileName}`}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} size="xs" />
                    </Link>
                    <Link
                      to={{
                        pathname: `/${Role.Doctor}/prescriptions/update/${prescription.id}`,
                        search: `?name=${encodeURIComponent(
                          `${prescription.patient.firstName} ${prescription.patient.lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faPen} size="xs" />
                    </Link>
                    <button
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      onClick={() => onDeleteClick(prescription.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="xs" />
                    </button>
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

export default DoctorPrescriptionsTableComponent;
