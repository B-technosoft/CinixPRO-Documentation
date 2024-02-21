import { useGetAllAppointmentListForDoctorQuery } from "../../redux/api/doctor/doctor-appintment/doctor-appintment";

const DoctorProfileAppointmentListComponent = () => {
  const { data, isFetching } = useGetAllAppointmentListForDoctorQuery({});

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
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  (data.result as [])?.map((appointment: any, i) => (
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

export default DoctorProfileAppointmentListComponent;
