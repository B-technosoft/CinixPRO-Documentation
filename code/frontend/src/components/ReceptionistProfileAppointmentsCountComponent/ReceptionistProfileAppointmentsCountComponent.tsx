import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faHandHoldingDollar,
  faHouseMedical,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useGetCountForReceptionisQuery } from "../../redux/api/receptionist/receptionist-count/receptionist-count";

const ReceptionistProfileAppointmentsCountComponent = () => {
  const { data: profile, isFetching } = useGetCountForReceptionisQuery({});

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Appointments</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {!isFetching && <p>{profile?.totalAppointments ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faCalendarCheck} size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Doctors</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {!isFetching && <p>{profile?.doctors ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faHouseMedical} size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Patients</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {!isFetching && <p>{profile?.patients ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faUsers} size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Today&apos;s Appointments</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {!isFetching && <p>{profile?.todayAppointments ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Tomorrow Appointments</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {!isFetching && <p>{profile?.tomorrowAppointments ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl">
          <div className="flex flex-col gap-2">
            <p className="font-mono">Upcoming Appointments</p>
            {isFetching && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
            {!isFetching && <p>{profile?.upcomingAppointments ?? 0}</p>}
          </div>
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceptionistProfileAppointmentsCountComponent;
