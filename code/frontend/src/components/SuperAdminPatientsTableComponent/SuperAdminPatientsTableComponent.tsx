import { useState } from "react";
import { Role } from "../../enums/role.enums";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import {
  useGetPatientListForSuperAdminQuery,
  useRemovePatientForSuperAdminMutation,
} from "../../redux/api/super-admin/super-admin-patient/super-admin-patient";
import { useAppDispatch } from "../../redux/redux-hook";
import { setDialogId } from "../../redux/features/dialogSlice/dialogSlice";
import DialogComponent from "../DialogComponent/DialogComponent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const SuperAdminPatientsTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetPatientListForSuperAdminQuery({
    params: {
      search,
    },
  });

  const [removePatient] = useRemovePatientForSuperAdminMutation();

  const dispatch = useAppDispatch();

  const onDeleteClick = async (id: number) => {
    dispatch(setDialogId(id));

    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <DialogComponent deleteCallBack={removePatient} />
      <CardTitleComponent
        title="Patient"
        route={`/${Role.SuperAdmin}/patients/create`}
        search={search}
        setSearch={setSearch}
      />
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
                        pathname: `/${Role.SuperAdmin}/patients/${patient.id}`,
                        search: `?name=${encodeURIComponent(
                          `${patient.firstName} ${patient.lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} size="xs" />
                    </Link>
                    <Link
                      to={{
                        pathname: `/${Role.SuperAdmin}/patients/update/${patient.id}`,
                        search: `?name=${encodeURIComponent(
                          `${patient.firstName} ${patient.lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faPen} size="xs" />
                    </Link>
                    <button
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      onClick={() => onDeleteClick(patient.id)}
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

export default SuperAdminPatientsTableComponent;
