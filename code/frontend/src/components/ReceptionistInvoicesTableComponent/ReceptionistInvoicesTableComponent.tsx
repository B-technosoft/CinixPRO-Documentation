import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { Role } from "../../enums/role.enums";
import {
  useGetInvoicesListForReceptionisQuery,
  useRemoveInvoicesForReceptionisMutation,
} from "../../redux/api/receptionist/receptionist-invoices/receptionist-invoices";
import { useAppDispatch } from "../../redux/redux-hook";
import { setDialogId } from "../../redux/features/dialogSlice/dialogSlice";
import DialogComponent from "../DialogComponent/DialogComponent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ReceptionistInvoicesTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetInvoicesListForReceptionisQuery({
    params: {
      search,
    },
  });

  const dispatch = useAppDispatch();

  const [removeInvoice] = useRemoveInvoicesForReceptionisMutation();

  const onDeleteClick = async (id: number) => {
    dispatch(setDialogId(id));

    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <DialogComponent deleteCallBack={removeInvoice} />
      <CardTitleComponent
        title="Invoice List"
        route={`/${Role.Receptionist}/invoices/create`}
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
                  <td>{`${invoice.patient.firstName} ${invoice.patient.lastName}`}</td>
                  <td>{invoice.appointment.appointmentDate}</td>
                  <td>{`${invoice.appointment.appointmentStartTime} To ${invoice.appointment.appointmentEndTime}`}</td>
                  <td>{invoice.paymentStatus}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/${Role.Receptionist}/invoices/view/${invoice.fileName}`}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} size="xs" />
                    </Link>
                    <Link
                      to={{
                        pathname: `/${Role.Receptionist}/invoices/update/${invoice.id}`,
                        search: `?name=${encodeURIComponent(
                          `${invoice.patient.firstName} ${invoice.patient.lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faPen} size="xs" />
                    </Link>
                    <button
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      onClick={() => onDeleteClick(invoice.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="xs" />
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

export default ReceptionistInvoicesTableComponent;
