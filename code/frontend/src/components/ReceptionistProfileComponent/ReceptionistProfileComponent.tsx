import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API_URL } from "../../redux/api/api-slice";
import { useGetProfileForReceptionistQuery } from "../../redux/api/receptionist/receptionist-profile/receptionist-profile";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReceptionistProfileAppointmentsCountComponent from "../ReceptionistProfileAppointmentsCountComponent/ReceptionistProfileAppointmentsCountComponent";
import ReceptionistsProfileInformationComponent from "../ReceptionistsProfileInformationComponent/ReceptionistsProfileInformationComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const ReceptionistProfileComponent = () => {
  const {
    data: profile,
    isFetching: profileIsFetching,
    isSuccess,
  } = useGetProfileForReceptionistQuery("");

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h1 className="font-bold">Patient Profile</h1>
            <div>BreadcrumbComponent</div>
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
                                effect="blur"
                                src={`${API_URL}/api/media/receptionist/${profile?.profilePhoto}`}
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
                          to="update"
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
                  </div>
                </div>
                <div className="bg-white drop-shadow-md divide-y-2 rounded-xl pb-4">
                  <div className="p-4">
                    <p>Assign Doctor Information</p>
                  </div>
                  <div className="divide-y flex flex-col gap-4">
                    <div className="flex px-4 py-2 flex-col gap-3">
                      <div className="flex flex-wrap gap-3">
                        {profileIsFetching && (
                          <span className="loading loading-spinner loading-lg"></span>
                        )}
                        {profile &&
                          isSuccess &&
                          profile.doctors?.map((doctor: any) => (
                            <div
                              className="badge badge-accent p-3 text-white bg-[#50a5f1]"
                              key={doctor.id}
                            >
                              {doctor.firstName} {doctor.lastName}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-6 flex-col">
              <ReceptionistProfileAppointmentsCountComponent />
              <ReceptionistsProfileInformationComponent />
            </div>
          </div>
        </div>
      </LayoutComponent>
    </>
  );
};

export default ReceptionistProfileComponent;
