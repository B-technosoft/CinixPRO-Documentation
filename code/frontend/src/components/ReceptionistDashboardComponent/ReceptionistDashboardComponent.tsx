import {
  faArrowRight,
  faCalendarCheck,
  faHandHoldingDollar,
  faHouseMedical,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import HomeCardCompoenent from "../HomeCardCompoenent/HomeCardCompoenent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import WelcomeDashboardComponent from "../WlecomeDashboardComponent/WelcomeDashboardComponent";
import WlecomeProfileCardComponent from "../WlecomeProfileCardComponent/WlecomeProfileCardComponent";
import { useGetCountForReceptionisQuery } from "../../redux/api/receptionist/receptionist-count/receptionist-count";
import { useMemo } from "react";
import { useGetProfileForReceptionistQuery } from "../../redux/api/receptionist/receptionist-profile/receptionist-profile";
import { API_URL } from "../../redux/api/api-slice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReceptionistDashboardComponent = () => {
  const { data, isFetching } = useGetCountForReceptionisQuery({});

  const details = useMemo(
    () => [
      {
        title: "Appointments",
        isFetching: isFetching,
        value: data?.totalAppointments ?? 0,
        icon: faCalendarCheck,
      },
      {
        title: "Doctors",
        isFetching: isFetching,
        value: data?.doctors ?? 0,
        icon: faHouseMedical,
      },
      {
        title: "Patients",
        isFetching: isFetching,
        value: data?.patients ?? 0,
        icon: faUsers,
      },
      {
        title: "Today's Appointments",
        isFetching: isFetching,
        value: data?.patients ?? 0,
        icon: faHandHoldingDollar,
      },
      {
        title: "Tomorrow Appointments",
        isFetching: isFetching,
        value: data?.tomorrowAppointments ?? 0,
        icon: faHandHoldingDollar,
      },
      {
        title: "Upcoming Appointments",
        isFetching: isFetching,
        value: data?.upcomingAppointments ?? 0,
        icon: faHandHoldingDollar,
      },
    ],
    [data]
  );

  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForReceptionistQuery({});

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <WelcomeDashboardComponent />
        </div>
        <div className="flex gap-6 grow">
          <div className="w-[50rem]">
            <WlecomeProfileCardComponent
              name={`${profile?.firstName} ${profile?.lastName}`}
              profile={`${API_URL}/api/media/receptionist/${profile?.profilePhoto}`}
              isFetching={profileIsFetching}
            >
              <div className="flex justify-end items-end gap-3">
                <Link
                  to={"profile/update"}
                  className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Edit Profile
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </WlecomeProfileCardComponent>
          </div>
          <HomeCardCompoenent details={details} />
        </div>
      </LayoutComponent>
    </>
  );
};

export default ReceptionistDashboardComponent;
