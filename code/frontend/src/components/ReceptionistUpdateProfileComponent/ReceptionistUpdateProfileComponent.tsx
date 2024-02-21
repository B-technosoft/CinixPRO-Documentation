import { useEffect, useState } from "react";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { Controller, useForm } from "react-hook-form";
import {
  useGetProfileForReceptionistQuery,
  useUpdateProfilesForReceptionistMutation,
} from "../../redux/api/receptionist/receptionist-profile/receptionist-profile";
import { useAllDoctorListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-doctor/receptionist-doctor";

import Select from "react-select";
import { useNavigate } from "react-router-dom";
import ImageUploadComponent from "../ImageUploadComponent/ImageUploadComponent";
import { API_URL } from "../../redux/api/api-slice";

const ReceptionistUpdateProfileComponent = () => {
  const [doctorOptions, setDoctorOptions] = useState([]);
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm();
  const { data, isFetching, isSuccess } = useGetProfileForReceptionistQuery("");
  const { data: doctorData, isFetching: doctorDataIsFetching } =
    useAllDoctorListForReceptionisQuery({});

  useEffect(() => {
    if (
      !isFetching &&
      isSuccess &&
      data &&
      !doctorDataIsFetching &&
      doctorData
    ) {
      const filteredDoctors = data.doctors
        .filter((doctor: any) => {
          return doctorData.some(
            (doctorData: any) => doctorData.id === doctor.id
          );
        })
        .map((doctor: any) => ({
          label: `${doctor.firstName} ${doctor.lastName}`,
          value: doctor.id,
        }));

      reset({ ...data, doctors: filteredDoctors });
    }
  }, [isFetching, isSuccess, data, doctorData, doctorDataIsFetching, reset]);

  const [updateProfile] = useUpdateProfilesForReceptionistMutation();

  useEffect(() => {
    if (!doctorDataIsFetching) {
      const options = doctorData.map((doctor: any) => ({
        label: `${doctor.firstName} ${doctor.lastName}`,
        value: doctor.id,
      }));

      setDoctorOptions(options);
    }
  }, [doctorDataIsFetching, doctorData]);

  const onSubmit = async (data: any) => {
    const doctorIds = (data.doctors as [])?.map(
      (doctor: { label: string; value: number }) => doctor.value
    );

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("password", data.password);
    if (data.profilePhoto) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }
    doctorIds.forEach((doctorId, index) =>
      formData.append(`doctorIds[${index}]`, doctorId.toString())
    );

    const result = await updateProfile(formData);

    if ("data" in result) {
      return navigate("/receptionist/profile");
    }

    console.log(result);
  };

  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">Update Profile</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="" isList={false} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6"
        >
          <div className="border p-3 border-l-blue-500 border-l-4">
            <h1 className="text-lg">Basic Information</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter First Name"
                    className="input input-bordered w-full input-md"
                  />
                )}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Last Name"
                    className="input input-bordered w-full input-md"
                  />
                )}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter Email"
                    className="input input-bordered w-full input-md"
                  />
                )}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Contact Number"
                    className="input input-bordered w-full input-md"
                  />
                )}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Doctor</span>
              </label>
              <Controller
                name="doctors"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={doctorOptions}
                    isLoading={doctorDataIsFetching}
                  />
                )}
              />
            </div>
            <div className="form-control w-full row-span-3">
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>
              <div className="flex grow justify-center items-center">
                <ImageUploadComponent
                  control={control}
                  name="profilePhoto"
                  defaultValue={`${API_URL}/api/media/receptionist/${data?.profilePhoto}`}
                />
              </div>
            </div>
          </div>
          <div>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </LayoutComponent>
  );
};

export default ReceptionistUpdateProfileComponent;
