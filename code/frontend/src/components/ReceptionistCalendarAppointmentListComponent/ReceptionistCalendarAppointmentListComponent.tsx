import TableComponent from "../TableComponent/TableComponent";
import { AppointmentListInterface } from "../../interface/appointmentListInterface.interface";
import { useGetAllAppointmentListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-appointment/receptionist-appointment";

const ReceptionistCalendarAppointmentListComponent = ({
  day,
}: AppointmentListInterface) => {
  const { data, isFetching } = useGetAllAppointmentListForReceptionisQuery({
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
                <th>Doctor Name</th>
                <th>Patient Number</th>
                <th>Time</th>
              </tr>
            </thead>
          }
          tbodys={
            <tbody>
              {!isFetching &&
                (data?.result as [])?.map((appointment: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.patient.contact}</td>
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

export default ReceptionistCalendarAppointmentListComponent;
