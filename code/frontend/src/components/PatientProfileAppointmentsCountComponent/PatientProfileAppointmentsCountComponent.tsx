import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { useGetCountForPatientQuery } from "../../redux/api/patient/patient-count/patient-count";

const PatientProfileAppointmentsCountComponent = () => {
  const { data, isFetching, isSuccess } = useGetCountForPatientQuery({});

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Appointments</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {data && isSuccess && <p>{data?.totalAppointments ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faCalendarCheck} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfileAppointmentsCountComponent;
