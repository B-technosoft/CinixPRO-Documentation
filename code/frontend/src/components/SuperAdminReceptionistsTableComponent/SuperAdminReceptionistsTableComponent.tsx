import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { Role } from "../../enums/role.enums";
import DialogComponent from "../DialogComponent/DialogComponent";
import { setDialogId } from "../../redux/features/dialogSlice/dialogSlice";
import { useAppDispatch } from "../../redux/redux-hook";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useGetReceptionistListForSuperAdminQuery,
  useRemoveReceptionistForSuperAdminMutation,
} from "../../redux/api/super-admin/super-admin-reception/super-admin-reception";

const SuperAdminReceptionistsTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetReceptionistListForSuperAdminQuery({
    params: {
      search,
    },
  });

  const [removeReceptionist] = useRemoveReceptionistForSuperAdminMutation();

  const dispatch = useAppDispatch();

  const onDeleteClick = (id: number) => {
    dispatch(setDialogId(id));

    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <DialogComponent deleteCallBack={removeReceptionist} />
      <CardTitleComponent
        title="Receptionist"
        route={`/${Role.SuperAdmin}/receptionists/create`}
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
              (data as [])?.map((receptionist: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${receptionist.firstName} ${receptionist.lastName}`}</td>
                  <td>{receptionist.contact}</td>
                  <td>{receptionist.email}</td>
                  <td className="flex gap-2">
                    <Link
                      to={{
                        pathname: `/${Role.SuperAdmin}/receptionists/${receptionist.id}`,
                        search: `?name=${encodeURIComponent(
                          `${receptionist.firstName} ${receptionist.lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} size="xs" />
                    </Link>
                    <Link
                      to={{
                        pathname: `/${Role.SuperAdmin}/receptionists/update/${receptionist.id}`,
                        search: `?name=${encodeURIComponent(
                          `${receptionist.firstName} ${receptionist.lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faPen} size="xs" />
                    </Link>
                    <button
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      onClick={() => onDeleteClick(receptionist.id)}
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

export default SuperAdminReceptionistsTableComponent;
