import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API_URL } from "../../redux/api/api-slice";
import { useGetProfileForDoctorQuery } from "../../redux/api/doctor/doctor-profile/doctor-profile";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DoctorProfileAppointmentsCountComponent from "../DoctorProfileAppointmentsCountComponent/DoctorProfileAppointmentsCountComponent";
import DoctorProfileInformationComponent from "../DoctorProfileInformationComponent/DoctorProfileInformationComponent";

const DoctorProfileComponent = () => {
  const {
    data: profile,
    isFetching: profileIsFetching,
    isSuccess,
  } = useGetProfileForDoctorQuery("");

  return (
    <section className="flex flex-col gap-7 mt-28 mx-auto w-[98rem] grow py-8">
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">Patient Profile</h1>
          <BreadcrumbComponent />
        </div>
        <div className="flex gap-6 grow">
          <div className="w-[50rem]">
            <div className="flex flex-col gap-6">
              <div className="bg-white drop-shadow-md divide-y h-[20rem] flex flex-col justify-between rounded-xl">
                <div className="bg-[url('/assets/images/profile-img.png')] flex-1 bg-cover bg-no-repeat bg-center">
                  <div className="p-4">
                    <p>Patient Information</p>
                  </div>
                </div>
                <div className="p-4 flex">
                  <div className="flex flex-col gap-8 relative w-full">
                    <div className="absolute bottom-20">
                      <div className="avatar">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          {profileIsFetching && (
                            <span className="loading loading-spinner loading-lg text-center"></span>
                          )}
                          {!profileIsFetching && (
                            <LazyLoadImage
                              src={`${API_URL}/${profile?.profilePhoto}`}
                              effect="blur"
                              alt={profile?.profilePhoto}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-[5rem] flex gap-10 items-center">
                      <div>
                        {!profileIsFetching && profile && (
                          <p className="text-base">
                            {`${profile?.firstName} ${profile?.lastName}`}
                          </p>
                        )}
                      </div>
                      <Link
                        to="/doctor/profile/update"
                        className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      >
                        <p>Edit Profile</p>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white drop-shadow-md divide-y-2 rounded-xl">
                <div className="p-4">
                  <p>Patient Information</p>
                </div>
                <div className="px-4 divide-y">
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Full Name:</p>
                      {!profileIsFetching && profile && (
                        <p className="flex-1">
                          {`${profile?.firstName} ${profile?.lastName}`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Contact No:</p>
                      {!profileIsFetching && profile && (
                        <p className="flex-1">{profile?.contact}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Email:</p>
                      {!profileIsFetching && profile && (
                        <p className="flex-1">{profile?.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Degree:</p>
                      {!profileIsFetching && profile && (
                        <p className="flex-1">{profile?.degree}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Experience:</p>
                      {!profileIsFetching && profile && (
                        <p className="flex-1">{profile?.experience}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Fees:</p>
                      {!profileIsFetching && profile && (
                        <p className="flex-1">{profile?.fees}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white drop-shadow-md divide-y-2 rounded-xl pb-4">
                <div className="p-4">
                  <p>Doctor Available Day And Time</p>
                </div>
                <div className="divide-y flex flex-col gap-4">
                  <div className="flex px-4 py-2 flex-col gap-3">
                    <p>Available Day</p>
                    <div className="flex flex-wrap gap-3">
                      {profileIsFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                      {profile &&
                        isSuccess &&
                        profile.availableDays?.map((availableDay: any) => (
                          <div
                            className="badge badge-accent p-3 text-white bg-[#50a5f1]"
                            key={availableDay.id}
                          >
                            {availableDay.day}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex px-4 py-2 flex-col gap-3">
                    <p>Available Time</p>
                    <div className="flex flex-wrap gap-3">
                      {profileIsFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                      {profile &&
                        isSuccess &&
                        profile.availableTime?.map((availableTime: any) => (
                          <div
                            className="badge badge-accent p-3 text-white bg-[#50a5f1]"
                            key={availableTime.id}
                          >
                            {`${availableTime.timeFrom} To ${availableTime.timeTo}`}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6 flex-col">
            <DoctorProfileAppointmentsCountComponent />
            <DoctorProfileInformationComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfileComponent;
