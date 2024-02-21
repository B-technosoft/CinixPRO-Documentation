import { Controller } from "react-hook-form";
import Select from "react-select";
import { ReceptionistFormComponentInterface } from "./interface";
import ImageUploadComponent from "../../ImageUploadComponent/ImageUploadComponent";
import { API_URL } from "../../../redux/api/api-slice";

const ReceptionistUpdateFormComponent = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  doctorDataIsFetching,
  doctorOptions,
  profilePhoto,
}: ReceptionistFormComponentInterface) => {
  return (
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
                className={`input input-bordered w-full input-md ${
                  errors.firstName && `input-error`
                }`}
              />
            )}
          />
          {errors.firstName && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.firstName.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.lastName && `input-error`
                }`}
              />
            )}
          />
          {errors.lastName && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.lastName.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.email && `input-error`
                }`}
              />
            )}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.email.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.contact && `input-error`
                }`}
              />
            )}
          />
          {errors.contact && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.contact.message}
              </span>
            </label>
          )}
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
          {errors.doctors && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.doctors.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full row-span-3">
          <label className="label">
            <span className="label-text">Profile Photo</span>
          </label>
          <div className="flex grow flex-col justify-center items-center">
            <ImageUploadComponent
              control={control}
              name="profilePhoto"
              defaultValue={`${API_URL}/api/media/receptionist/${profilePhoto}`}
            />
            {errors.profilePhoto && (
              <label className="label">
                <span className="label-text-alt text-red-600">
                  {errors.profilePhoto.message}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>
      <div>
        <button className="btn bg-blue-500 hover.bg-blue-700 text-white">
          Save
        </button>
      </div>
    </form>
  );
};

export default ReceptionistUpdateFormComponent;
