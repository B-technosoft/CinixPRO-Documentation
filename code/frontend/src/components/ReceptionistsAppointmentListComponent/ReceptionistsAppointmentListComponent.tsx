import { useParams } from "react-router-dom";
import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";
import { useGetReceptionistAppointmentsListsForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-appointment/super-admin-appointment";

const ReceptionistsAppointmentListComponent = () => {
  const { id } = useParams();

  const { data, isFetching } =
    useGetReceptionistAppointmentsListsForSuperAdminQuery(id);

  return (
    <>
      <div className="overflow-x-auto">
        {isFetching && (
          <div className="flex items-center justify-center">
            <LoadingSpinnerComponent />
          </div>
        )}
        {!isFetching && (
          <>
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>Sr.No.</th>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {!isFetching &&
                  (data as [])?.map((appointment: any, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td>{`${appointment.appointmentStartTime} To ${appointment.appointmentStartTime}`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ReceptionistsAppointmentListComponent;
