import { Controller, useForm } from "react-hook-form";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useGetProfileForPatientQuery,
  useUpdateProfileForPatientMutation,
} from "../../redux/api/patient/patient-profile/patient-profile";
import { API_URL } from "../../redux/api/api-slice";
import ImageUploadComponent from "../ImageUploadComponent/ImageUploadComponent";

const ParientUpdateProfileComponent = () => {
  const { control, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const { data, isFetching, isSuccess } = useGetProfileForPatientQuery("");

  const [updatePatient] = useUpdateProfileForPatientMutation();

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      reset(data);
    }
  }, [data, isFetching, isSuccess, reset]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("Password", data.Password);
    if (data.profilePhoto) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }
    formData.append("currentAddress", data.currentAddress);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("bloodPressure", data.bloodPressure);
    formData.append("pulse", data.pulse);
    formData.append("respiration", data.respiration);
    formData.append("allergy", data.allergy);
    formData.append("diet", data.diet);
    formData.append("password", data.Password);

    const result = await updatePatient(formData);

    if ("data" in result) {
      return navigate("patient/rofile");
    }

    console.log(result);
  };

  return (
    <>
      <LayoutComponent>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h1 className="font-bold">Update Profile</h1>
            <BreadcrumbComponent />
          </div>
          <div>
            <BackButtonComponent title="Back" isList={false} />
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
                  <span className="label-text">Gender</span>
                </label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select className="select input-bordered w-full" {...field}>
                      <option selected>Select a gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <Controller
                  name="age"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Age"
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
                  <span className="label-text">Current Address</span>
                </label>
                <Controller
                  name="currentAddress"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Current Address"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full row-span-3">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <div className="flex justify-center items-center">
                  <ImageUploadComponent
                    control={control}
                    name="profilePhoto"
                    defaultValue={`${API_URL}/${data?.profilePhoto}`}
                  />
                </div>
              </div>
            </div>
            <div className="border p-3 border-l-blue-500 border-l-4">
              <h1 className="text-lg">Medical Information</h1>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Height</span>
                </label>
                <Controller
                  name="height"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Height"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Weight</span>
                </label>
                <Controller
                  name="weight"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Weight"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Blood Group"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Blood Pressure</span>
                </label>
                <Controller
                  name="bloodPressure"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Blood Pressure"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Pulse</span>
                </label>
                <Controller
                  name="pulse"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Pulse"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Respiration</span>
                </label>
                <Controller
                  name="respiration"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Respiration"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Allergy</span>
                </label>
                <Controller
                  name="allergy"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Allergy"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Diet</span>
                </label>
                <Controller
                  name="diet"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Diet"
                      className="input input-bordered w-full input-md"
                    />
                  )}
                />
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
    </>
  );
};

export default ParientUpdateProfileComponent;
