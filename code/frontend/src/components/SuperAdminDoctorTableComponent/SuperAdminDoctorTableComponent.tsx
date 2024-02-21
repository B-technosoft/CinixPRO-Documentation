import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import { Role } from "../../enums/role.enums";
import TableComponent from "../TableComponent/TableComponent";
import {
  useGetDoctorListForSuperAdminQuery,
  useRemoveDoctorForSuperAdminMutation,
} from "../../redux/api/super-admin/super-admin-doctor/super-admin-doctor";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../redux/redux-hook";
import { setDialogId } from "../../redux/features/dialogSlice/dialogSlice";
import DialogComponent from "../DialogComponent/DialogComponent";

const SuperAdminDoctorTableComponent = () => {
  const [search, setSearch] = useState("");

  const [removeDoctor] = useRemoveDoctorForSuperAdminMutation();

  const { data, isFetching } = useGetDoctorListForSuperAdminQuery({
    params: {
      search,
    },
  });

  console.log(isFetching && data);

  const dispatch = useAppDispatch();

  const onDeleteClick = async (id: number) => {
    dispatch(setDialogId(id));

    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <DialogComponent deleteCallBack={removeDoctor} />
      <CardTitleComponent
        title="Doctor"
        route={`/${Role.SuperAdmin}/doctors/create`}
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
              data &&
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
                        pathname: `/${Role.SuperAdmin}/doctors/update/${doctor.doctor_id}`,
                        search: `?name=${encodeURIComponent(
                          `${doctor.doctor_firstName} ${doctor.doctor_lastName}`
                        )}`,
                      }}
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faPen} size="xs" />
                    </Link>

                    <button
                      className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      onClick={() => onDeleteClick(doctor.doctor_id)}
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

export default SuperAdminDoctorTableComponent;
