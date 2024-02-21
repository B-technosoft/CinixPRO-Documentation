import { useMemo } from "react";
import HomeCardCompoenent from "../HomeCardCompoenent/HomeCardCompoenent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import WelcomeDashboardComponent from "../WlecomeDashboardComponent/WelcomeDashboardComponent";
import WlecomeProfileCardComponent from "../WlecomeProfileCardComponent/WlecomeProfileCardComponent";
import {
  faArrowRight,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useGetCountForPatientQuery } from "../../redux/api/patient/patient-count/patient-count";
import { useGetProfileForPatientQuery } from "../../redux/api/patient/patient-profile/patient-profile";
import { API_URL } from "../../redux/api/api-slice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PatientDashboardComponent = () => {
  const { data, isFetching } = useGetCountForPatientQuery({});

  const details = useMemo(
    () => [
      {
        title: "Today's Appointments",
        isFetching: isFetching,
        value: data?.totalAppointments ?? 0,
        icon: faCalendarCheck,
      },
    ],
    [data]
  );

  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForPatientQuery({});

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
              profile={`${API_URL}/${profile?.profilePhoto}`}
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

export default PatientDashboardComponent;
