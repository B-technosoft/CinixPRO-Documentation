import { Controller } from "react-hook-form";
import { PatientFormComponentInterface } from "./interface";
import ImageUploadComponent from "../../ImageUploadComponent/ImageUploadComponent";

const PatientCreateFormComponent = ({
  handleSubmit,
  onSubmit,
  errors,
  control,
}: PatientFormComponentInterface) => {
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
            <span className="label-text">Gender</span>
          </label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select
                className={`select input-bordered w-full ${
                  errors.gender && "input-error"
                }`}
                {...field}
              >
                <option>Select a gender</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            )}
          />
          {errors.gender && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.gender.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.age && `input-error`
                }`}
              />
            )}
          />
          {errors.age && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.age.message}
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
                className={`input input-bordered w-full input-md ${
                  errors.currentAddress && `input-error`
                }`}
              />
            )}
          />
          {errors.currentAddress && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.currentAddress.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full row-span-3">
          <label className="label">
            <span className="label-text">Profile Photo</span>
          </label>
          <div className="flex justify-center items-center flex-col gap-4">
            <ImageUploadComponent control={control} name="profilePhoto" />
            {errors.profilePhoto && (
              <label className="label">
                <span className="label-text-alt text-red-600">
                  {errors.profilePhoto.message}
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Enter Password"
                className={`input input-bordered w-full input-md ${
                  errors.password && `input-error`
                }`}
              />
            )}
          />
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="Password"
                placeholder="Enter Confirm Password"
                className={`input input-bordered w-full input-md ${
                  errors.confirmPassword && `input-error`
                }`}
              />
            )}
          />
          {errors.confirmPassword && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.confirmPassword.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.height && `input-error`
                }`}
              />
            )}
          />
          {errors.height && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.height.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.weight && `input-error`
                }`}
              />
            )}
          />
          {errors.weight && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.weight.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <select
                className={`select input-bordered w-full ${
                  errors.bloodGroup && "input-error"
                }`}
                {...field}
              >
                <option>Select a Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]?.map(
                  (group, i) => {
                    return (
                      <option key={i} value={group}>
                        {group}
                      </option>
                    );
                  }
                )}
              </select>
            )}
          />
          {errors.bloodGroup && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.bloodGroup.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.bloodPressure && `input-error`
                }`}
              />
            )}
          />
          {errors.bloodPressure && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.bloodPressure.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.pulse && `input-error`
                }`}
              />
            )}
          />
          {errors.pulse && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.pulse.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.respiration && `input-error`
                }`}
              />
            )}
          />
          {errors.respiration && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.respiration.message}
              </span>
            </label>
          )}
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
                className={`input input-bordered w-full input-md ${
                  errors.allergy && `input-error`
                }`}
              />
            )}
          />
          {errors.allergy && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.allergy.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Diet</span>
          </label>
          <Controller
            name="diet"
            control={control}
            render={({ field }) => (
              <select
                className={`select input-bordered w-full ${
                  errors.diet && "input-error"
                }`}
                {...field}
              >
                <option>Select a diet</option>
                {["Vegetarian", "Non-vegetarian", "Vegan"]?.map(
                  (diet, index) => (
                    <option key={index} value={diet}>
                      {diet}
                    </option>
                  )
                )}
              </select>
            )}
          />
          {errors.diet && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.diet.message}
              </span>
            </label>
          )}
        </div>
      </div>
      <div>
        <button className="btn bg-blue-500 hover:bg-blue-700 text-white">
          Save
        </button>
      </div>
    </form>
  );
};

export default PatientCreateFormComponent;
