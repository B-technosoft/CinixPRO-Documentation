import { useMemo } from "react";
import { useGetCountForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-count/super-admin-count";
import HomeCardCompoenent from "../HomeCardCompoenent/HomeCardCompoenent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import WelcomeDashboardComponent from "../WlecomeDashboardComponent/WelcomeDashboardComponent";
import WlecomeProfileCardComponent from "../WlecomeProfileCardComponent/WlecomeProfileCardComponent";
import {
  faCalendarCheck,
  faCalendarDay,
  faCalendarDays,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { useGetProfileForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-profile/super-admin-profile";
import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";

const SuperAdminDashboardComponent = () => {
  const { data, isFetching } = useGetCountForSuperAdminQuery({
    params: {
      query: "appointment",
    },
  });

  const { data: countData, isFetching: countDataIsFetching } =
    useGetCountForSuperAdminQuery({});

  const details = useMemo(
    () => [
      {
        title: "Appointments",
        isFetching: isFetching,
        value: data?.totalAppointments ?? 0,
        icon: faCalendarCheck,
      },
      {
        title: "Today's Appointments",
        isFetching: isFetching,
        value: data?.todayAppointments ?? 0,
        icon: faCalendarDays,
      },
      {
        title: "Tomorrow Appointments",
        isFetching: isFetching,
        value: data?.tomorrowAppointments ?? 0,
        icon: faCalendarDay,
      },
      {
        title: "Upcoming Appointments",
        isFetching: isFetching,
        value: data?.upcomingAppointments ?? 0,
        icon: faCalendarWeek,
      },
    ],
    [data]
  );

  const { isFetching: profileIsFetching, data: profile } =
    useGetProfileForSuperAdminQuery({});

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <WelcomeDashboardComponent />
        </div>
        <div className="flex gap-6 grow">
          <div className="w-[50rem]">
            <WlecomeProfileCardComponent
              profile={profile?.profile}
              isFetching={profileIsFetching}
              name={profile?.name}
            >
              <div className="grid grid-cols-2 gap-6 grow">
                <div>
                  {countDataIsFetching && <LoadingSpinnerComponent />}
                  {!countDataIsFetching && (
                    <>
                      <p>{countData?.doctors ?? 0}</p>
                      <p>Doctors</p>
                    </>
                  )}
                </div>
                <div>
                  {countDataIsFetching && <LoadingSpinnerComponent />}
                  {!countDataIsFetching && (
                    <>
                      <p>{countData?.patients ?? 0}</p>
                      <p>Patients</p>
                    </>
                  )}
                </div>
                <div>
                  {countDataIsFetching && <LoadingSpinnerComponent />}
                  {!countDataIsFetching && (
                    <>
                      <p>{countData?.receptionists ?? 0}</p>
                      <p>Receptionist</p>
                    </>
                  )}
                </div>
              </div>
            </WlecomeProfileCardComponent>
          </div>
          <HomeCardCompoenent details={details} />
        </div>
      </LayoutComponent>
    </>
  );
};

export default SuperAdminDashboardComponent;
