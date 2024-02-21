import { useParams } from "react-router-dom";
import { useGetReceptionistAppointmentsListsForDoctorQuery } from "../../redux/api/doctor/doctor-appintment/doctor-appintment";

const DoctorReceptionistsInformationComponent = () => {
  const { id } = useParams();

  const { data, isFetching } =
    useGetReceptionistAppointmentsListsForDoctorQuery(id);

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
      <div>
        <div className="tabs tabs-bordered flex">
          <div className={`tab tab-bordered w-full tab-active`}>
            Appointment List
          </div>
        </div>
        <div className="p-4">
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
        </div>
      </div>
    </div>
  );
};

export default DoctorReceptionistsInformationComponent;
