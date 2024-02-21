import { Controller } from "react-hook-form";
import { DoctorFormComponentInterface } from "./interface";
import ImageUploadComponent from "../../ImageUploadComponent/ImageUploadComponent";
import { API_URL } from "../../../redux/api/api-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const DoctorUpdateFormComponent = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  availableDaysIsFetching,
  availableDays,
  slotsTimeIsFetching,
  slotsTime,
  availableTimes,
  onClickAddTimeBtn,
  onClickRemoveTimeBtn,
  doctorData,
}: DoctorFormComponentInterface) => {
  return (
    <form
      method="POST"
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
                  errors.firstName ? "input-error" : ""
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
                  errors.firstName ? "input-error" : ""
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
                  errors.firstName ? "input-error" : ""
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
                  errors.firstName ? "input-error" : ""
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
            <span className="label-text">Specialization</span>
          </label>
          <Controller
            name="specialization"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your specialization"
                className={`input input-bordered w-full input-md ${
                  errors.firstName ? "input-error" : ""
                }`}
              />
            )}
          />
          {errors.specialization && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.specialization.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Degree</span>
          </label>
          <Controller
            name="degree"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter a degree"
                className={`input input-bordered w-full input-md ${
                  errors.firstName ? "input-error" : ""
                }`}
              />
            )}
          />
          {errors.degree && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.degree.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Experience</span>
          </label>
          <Controller
            name="experience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Experience"
                className={`input input-bordered w-full input-md ${
                  errors.firstName ? "input-error" : ""
                }`}
              />
            )}
          />
          {errors.experience && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.experience.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Fees</span>
          </label>
          <Controller
            name="fees"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Your Fees"
                className={`input input-bordered w-full input-md ${
                  errors.firstName ? "input-error" : ""
                }`}
              />
            )}
          />
          {errors.fees && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors.fees.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Doctor available days</span>
          </label>
          {availableDaysIsFetching && (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {!availableDaysIsFetching && (
            <div className="flex gap-3">
              {availableDays?.map((availableDay: any, i) => (
                <div className="form-control" key={i}>
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">{availableDay?.label}</span>
                    <Controller
                      name={`availableDays.${i}.id`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          value={field.value}
                          className="hidden"
                        />
                      )}
                    />
                    <Controller
                      name={`availableDays.${i}.value`}
                      control={control}
                      defaultValue={availableDay.value}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          checked={field.value}
                          value={availableDay.label}
                          className="checkbox checkbox-sm"
                        />
                      )}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
          {errors.availableDays && (
            <label className="label">
              <span className="label-text-alt text-red-600">
                {errors?.availableDays?.root?.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control w-full row-span-3">
          <label className="label">
            <span className="label-text">Profile Photo</span>
          </label>
          <div className="flex justify-center items-center flex-col">
            <ImageUploadComponent
              control={control}
              name="profilePhoto"
              defaultValue={`${API_URL}/api/media/doctor/${doctorData?.profilePhoto}`}
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Slots Time (In Minute)</span>
          </label>
          {slotsTimeIsFetching && (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {!slotsTimeIsFetching && (
            <div className="flex gap-3">
              <Controller
                name="slotTime"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={slotsTime} />
                )}
              />
              {errors.slotTime && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.slotTime.message}
                  </span>
                </label>
              )}
            </div>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span>Available Time</span>
          </label>
          <div className="pb-4 flex flex-col gap-4">
            {availableTimes?.map((_, index) => (
              <div className="flex gap-6 items-center" key={_.id}>
                <div className="hidden">
                  <Controller
                    name={`availableTimes.${index}.id`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value.toString()}
                        className="hidden"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 w-[14rem]">
                  <div className="label">From:</div>
                  <Controller
                    name={`availableTimes.${index}.timeFrom`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="time"
                        className="input input-bordered w-full input-md"
                      />
                    )}
                  />
                  {errors.availableTimes && errors.availableTimes[index] && (
                    <label className="label">
                      <span className="label-text-alt text-red-600">
                        {errors.availableTimes[index]?.timeFrom?.message || ""}
                      </span>
                    </label>
                  )}
                </div>
                <div className="flex flex-col gap-3 w-[14rem]">
                  <div className="label">To:</div>
                  <Controller
                    name={`availableTimes.${index}.timeTo`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="time"
                        className="input input-bordered w-full input-md"
                      />
                    )}
                  />
                  {errors.availableTimes && errors.availableTimes[index] && (
                    <label className="label">
                      <span className="label-text-alt text-red-600">
                        {errors.availableTimes[index]?.timeTo?.message || ""}
                      </span>
                    </label>
                  )}
                </div>
                {index !== 0 && (
                  <button
                    className="btn btn-sm btn-circle btn-outline"
                    type="button"
                    onClick={() => onClickRemoveTimeBtn(index)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              className="btn bg-blue-500 hover:bg-blue-700 text-white"
              type="button"
              onClick={onClickAddTimeBtn}
            >
              Add Time
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-700 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default DoctorUpdateFormComponent;
