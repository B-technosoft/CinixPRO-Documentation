import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useCancelAppointmentForPatientMutation,
  useGetAllAppointmentListForPatientQuery,
} from "../../redux/api/patient/patient-appointment/patient-appointment";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const PatientAppointmentListComponent = () => {
  const { data, isFetching } = useGetAllAppointmentListForPatientQuery({});

  const [cancelAppointment] = useCancelAppointmentForPatientMutation();

  const onClickCancelAppointment = async (id: number) => {
    await cancelAppointment(id);
  };

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h1 className="font-bold">Appointment LIST</h1>
            <div>BreadcrumbComponent</div>
            <BreadcrumbComponent />
          </div>
          <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">
            <div className="flex justify-end">
              <div className="w-full max-w-xs relative">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            {isFetching && (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
            {!isFetching && (
              <>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead className="bg-base-200">
                      <tr>
                        <th>Sr.No.</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.result as []).map((appointment: any, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>08:00:00 to 08:30:00</td>
                          <td>
                            <div className="badge badge-warning">Paid</div>
                          </td>
                          <td>
                            {!appointment.isCancel &&
                              !appointment.isComplete && (
                                <button
                                  className="btn btn-error text-white font-bold py-2 px-4 rounded"
                                  onClick={() =>
                                    onClickCancelAppointment(appointment.id)
                                  }
                                >
                                  Cancel
                                </button>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </LayoutComponent>
    </>
  );
};

export default PatientAppointmentListComponent;
