import { useParams } from "react-router-dom";
import { useGetPatientAppointmentsListsForDoctorQuery } from "../../redux/api/doctor/doctor-appintment/doctor-appintment";

const DoctorPatientAppointmentListComponent = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetPatientAppointmentsListsForDoctorQuery(id);

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
                {(data as [])?.map((appointment: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{`${appointment.appointmentStartTime} to ${appointment.appointmentEndTime}`}</td>
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

export default DoctorPatientAppointmentListComponent;
