import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetDoctorDetailsForReceptionisQuery } from "../../redux/api/receptionist/receptionist-doctor/receptionist-doctor";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { API_URL } from "../../redux/api/api-slice";
import ReceptionistDoctorAppointmentsCountComponent from "../ReceptionistDoctorAppointmentsCountComponent/ReceptionistDoctorAppointmentsCountComponent";
import ReceptionistDoctorInformationComponent from "../ReceptionistDoctorInformationComponent/ReceptionistDoctorInformationComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const ReceptionistDoctorDetailsComponent = () => {
  const { id } = useParams();

  const { data, isFetching, isSuccess } =
    useGetDoctorDetailsForReceptionisQuery(id);

  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">Doctor Profile</h1>
          <BreadcrumbComponent />
        </div>
        <div className="flex gap-6 grow">
          <div className="w-[50rem]">
            <div className="flex flex-col gap-6">
              <div className="bg-white drop-shadow-md divide-y h-[20rem] flex flex-col justify-between rounded-xl">
                <div className="bg-[url('/assets/images/profile-img.png')] flex-1 bg-cover bg-no-repeat bg-center">
                  <div className="p-4">
                    <p>Doctor Information</p>
                  </div>
                </div>
                <div className="p-4 flex gap-8 ">
                  <div className="flex flex-col gap-8 relative">
                    <div className="absolute bottom-16">
                      <div className="avatar">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          {isFetching && (
                            <span className="loading loading-spinner loading-lg"></span>
                          )}
                          {data && isSuccess && (
                            <LazyLoadImage
                              src={`${API_URL}/api/media/doctor/${data?.profilePhoto}`}
                              alt={data?.profilePhoto}
                              effect="blur"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-[4rem]">
                      {data && isSuccess && (
                        <p className="text-base">
                          {data.firstName} {data.lastName}
                        </p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white drop-shadow-md divide-y-2 rounded-xl">
                <div className="p-4">
                  <p>Personal Information</p>
                </div>
                <div className="px-4 divide-y">
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Full Name:</p>
                      {data && isSuccess && (
                        <p className="flex-1">
                          {data.firstName} {data.lastName}
                        </p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Contact No:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.contact}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Email:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.email}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Degree:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.degree}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Experience:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.experience}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Fees:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.fees}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
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
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                      {data &&
                        isSuccess &&
                        data.availableDays?.map((availableDay: any) => (
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
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                      {data &&
                        isSuccess &&
                        data.availableTime?.map((availableTime: any) => (
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
            <ReceptionistDoctorAppointmentsCountComponent />
            <ReceptionistDoctorInformationComponent />
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default ReceptionistDoctorDetailsComponent;
