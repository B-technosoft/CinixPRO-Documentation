import TableComponent from "../TableComponent/TableComponent";
import { useGetAllAppointmentListForPatientQuery } from "../../redux/api/patient/patient-appointment/patient-appointment";
import { AppointmentListInterface } from "../../interface/appointmentListInterface.interface";

const PatientCalendarAppointmentListComponent = ({
  day,
}: AppointmentListInterface) => {
  const { data, isFetching } = useGetAllAppointmentListForPatientQuery({
    day: day.format("YYYY-MM-DD"),
  });

  return (
    <div className="basis-1/2">
      <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6 flex-1 basis-1/3">
        <div className="flex items-center gap-2 font-bold">
          <span>Appointment List</span>
          <span>|</span>
          <span>{day.format("DD MMM, YYYY")}</span>
        </div>
        <TableComponent
          isLoading={isFetching}
          theads={
            <thead className="bg-base-200">
              <tr>
                <th>Sr.No.</th>
                <th>Patient Name</th>
                <th>Patient Number</th>
                <th>Time</th>
              </tr>
            </thead>
          }
          tbodys={
            <tbody>
              {!isFetching &&
                (data.result as [])?.map((appointment: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{`${appointment.doctor.contact}`}</td>
                    <td>{`${appointment.appointmentStartTime} to ${appointment.appointmentEndTime}`}</td>
                  </tr>
                ))}
            </tbody>
          }
        />
      </div>
    </div>
  );
};

export default PatientCalendarAppointmentListComponent;
