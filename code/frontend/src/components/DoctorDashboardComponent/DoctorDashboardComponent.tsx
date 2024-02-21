import { useMemo } from "react";
import HomeCardCompoenent from "../HomeCardCompoenent/HomeCardCompoenent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import WelcomeDashboardComponent from "../WlecomeDashboardComponent/WelcomeDashboardComponent";
import WlecomeProfileCardComponent from "../WlecomeProfileCardComponent/WlecomeProfileCardComponent";
import {
  faArrowRight,
  faCalendarCheck,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useGetCountForDoctorQuery } from "../../redux/api/doctor/doctor-count/doctor-count";
import { useGetProfileForDoctorQuery } from "../../redux/api/doctor/doctor-profile/doctor-profile";
import { API_URL } from "../../redux/api/api-slice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DoctorDashboardComponent = () => {
  const { data } = useGetCountForDoctorQuery({});

  const details = useMemo(
    () => [
      {
        title: "Appointments",
        isFetching: data?.isFetching,
        value: data?.totalAppointments ?? 0,
        icon: faCalendarCheck,
      },
      {
        title: "Today's Appointments",
        isFetching: data?.isFetching,
        value: data?.totalAppointments ?? 0,
        icon: faHandHoldingDollar,
      },
      {
        title: "Tomorrow Appointments",
        isFetching: data?.isFetching,
        value: data?.tomorrowAppointments ?? 0,
        icon: faHandHoldingDollar,
      },
      {
        title: "Upcoming Appointments",
        isFetching: data?.isFetching,
        value: data?.upcomingAppointments ?? 0,
        icon: faHandHoldingDollar,
      },
    ],
    [data]
  );

  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForDoctorQuery({});

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <WelcomeDashboardComponent />
        </div>
        <div className="flex gap-6 grow">
          <div className="w-[50rem]">
            <WlecomeProfileCardComponent
              isFetching={profileIsFetching}
              profile={
                profile?.profilePhoto
                  ? `${API_URL}/${profile?.profilePhoto}`
                  : null
              }
              name={`${profile?.firstName} ${profile?.lastName}`}
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

export default DoctorDashboardComponent;
