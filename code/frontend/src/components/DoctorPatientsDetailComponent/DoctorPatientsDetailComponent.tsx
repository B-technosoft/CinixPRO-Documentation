import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useGetPatientDetailsForDoctorQuery } from "../../redux/api/doctor/doctor-patients/doctor-patients";
import DoctorPatientAppointmentsCountComponent from "../DoctorPatientAppointmentsCountComponent/DoctorPatientAppointmentsCountComponent";
import DoctorPatientInformationComponent from "../DoctorPatientInformationComponent/DoctorPatientInformationComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import { API_URL } from "../../redux/api/api-slice";

const DoctorPatientsDetailComponent = () => {
  const { id } = useParams();

  const { data, isFetching, isSuccess } =
    useGetPatientDetailsForDoctorQuery(id);

  return (
    <LayoutComponent>
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
                <div className="p-4 flex gap-8">
                  <div className="flex flex-col gap-8 relative">
                    <div className="absolute bottom-20">
                      <div className="avatar">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          {isFetching && (
                            <span className="loading loading-spinner loading-lg"></span>
                          )}
                          {data && isSuccess && (
                            <LazyLoadImage
                              src={`${API_URL}/api/media/patients/${data.profilePhoto}`}
                              effect="blur"
                              alt={data.profilePhoto}
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
                  <p>Patient Information</p>
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
                      <p className="flex-1">Age:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.age}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Gender:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.gender}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex w-full">
                      <p className="flex-1">Address:</p>
                      {data && isSuccess && (
                        <p className="flex-1">{data.currentAddress}</p>
                      )}
                      {isFetching && (
                        <span className="loading loading-spinner loading-lg"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6 flex-col">
            <DoctorPatientAppointmentsCountComponent />
            <DoctorPatientInformationComponent />
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default DoctorPatientsDetailComponent;
