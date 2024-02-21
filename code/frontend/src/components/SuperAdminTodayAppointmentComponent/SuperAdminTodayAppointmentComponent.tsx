import {
  useCancelAppointmentForSuperAdminMutation,
  useGetTodayAppointmentListForSuperAdminQuery,
} from "../../redux/api/super-admin/super-admin-appointment/super-admin-appointment";

const SuperAdminTodayAppointmentComponent = () => {
  const { data, isFetching } = useGetTodayAppointmentListForSuperAdminQuery({});

  const [cancelAppointment] = useCancelAppointmentForSuperAdminMutation();

  const onClickCancelAppointment = async (id: number) => {
    const result = await cancelAppointment(id);

    console.log(result);
  };

  return (
    <>
      <div className="overflow-x-auto">
        {isFetching && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {!isFetching && (
          <>
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>Sr.No.</th>
                  <th>Doctor Name</th>
                  <th>Patient Name</th>
                  <th>Patient Contact No</th>
                  <th>Patient Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {typeof data === "object" &&
                  data !== null &&
                  "result" in data &&
                  (data?.result as [])?.map((appointment: any, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                      <td>{appointment.patient.contact}</td>
                      <td>{appointment.patient.email}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td>
                        `${appointment.appointmentStartTime} To $
                        {appointment.appointmentEndTime}`
                      </td>
                      <td>
                        <button
                          className="btn btn-error text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            onClickCancelAppointment(appointment.id)
                          }
                        >
                          Cancel
                        </button>
                      </td>
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

export default SuperAdminTodayAppointmentComponent;
