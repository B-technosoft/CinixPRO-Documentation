import { Controller, useForm } from "react-hook-form";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  useGetAvailableDayQuery,
  useGetTimeSlotQuery,
} from "../../redux/api/public/public";
import { yupResolver } from "@hookform/resolvers/yup";
import { doctorProfileUpdateValidationSchema } from "../../validations/validations";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileForDoctorQuery,
  useUpdateProfileForDoctorMutation,
} from "../../redux/api/doctor/doctor-profile/doctor-profile";
import momentJs from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../redux/api/api-slice";
import ImageUploadComponent from "../ImageUploadComponent/ImageUploadComponent";

const DoctorUpdateProfileComponent = () => {
  const [availableTimes, setAvailableTimes] = useState([
    { id: 0, timeFrom: "", timeTo: "" },
  ]);

  const [availableDays, setAvailableDays] = useState([
    {
      id: 0,
      label: "",
      value: false,
    },
  ]);
  const [slotsTime, setSlotsTime] = useState([]);

  const [resetDone, setResetDone] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(doctorProfileUpdateValidationSchema),
  });

  const { data: availableDay, isFetching: availableDaysIsFetching } =
    useGetAvailableDayQuery("");
  const { data: slotsTimes, isFetching: slotsTimeIsFetching } =
    useGetTimeSlotQuery("");

  const navigate = useNavigate();

  const { data, isFetching, isSuccess } = useGetProfileForDoctorQuery("");

  const [updateProfile] = useUpdateProfileForDoctorMutation();

  useEffect(() => {
    if (!slotsTimeIsFetching) {
      const slotsTime = slotsTimes.result?.map((slotsTime: any) => ({
        label: slotsTime,
        value: slotsTime,
      }));

      setSlotsTime(slotsTime);
    }
  }, [slotsTimeIsFetching, slotsTimes]);

  useEffect(() => {
    if (
      !isFetching &&
      isSuccess &&
      data &&
      !availableDaysIsFetching &&
      !slotsTimeIsFetching &&
      !resetDone
    ) {
      const availableTimes = (data?.availableTime as [])?.map(
        (availableTime: any) => {
          return {
            id: availableTime.id,
            timeFrom: momentJs(availableTime.timeFrom, "h:mm A").format(
              "HH:mm"
            ),
            timeTo: momentJs(availableTime.timeTo, "h:mm A").format("HH:mm"),
          };
        }
      );

      reset({
        ...data,
        slotTime: {
          label: data?.slotTime,
          value: data?.slotTime,
        },
        availableTimes: [...availableTimes],
      });

      setResetDone(true);
    }
  }, [
    data,
    isFetching,
    isSuccess,
    availableDaysIsFetching,
    slotsTimeIsFetching,
    availableDays,
    reset,
  ]);

  useEffect(() => {
    if (!availableDaysIsFetching) {
      const availableDays = availableDay.result?.map((availableDay: any) => ({
        id: 0,
        label: availableDay,
        value: false,
      }));

      const resetAvailableDay = availableDays?.map((availableDay: any) => {
        let id: number = 0;

        const isChecked = data?.availableDays.some((dataAvailableDay: any) => {
          const com = dataAvailableDay.day === availableDay.label;
          if (com) {
            id = dataAvailableDay.id;
            return true;
          }
          return false;
        });

        if (isChecked) {
          return {
            id: id,
            label: availableDay.label,
            value: true,
          };
        }

        return {
          id: 0,
          label: availableDay.label,
          value: false,
        };
      }) as any;

      setAvailableDays(resetAvailableDay);

      setValue("availableDays", resetAvailableDay);
    }
  }, [availableDaysIsFetching, data]);

  const onClickAddTimeBtn = () => {
    setAvailableTimes([...availableTimes, { id: 0, timeFrom: "", timeTo: "" }]);
  };

  const onClickRemoveTimeBtn = (index: number) => {
    const updatedAvailableTimes = [...availableTimes];

    updatedAvailableTimes.splice(index, 1);
    setAvailableTimes([...updatedAvailableTimes]);
  };

  const onSubmit = async (data: any) => {
    const availableTimes = data?.availableTimes
      ?.map((availableTime: any) => {
        return {
          id: availableTime.id,
          timeFrom: momentJs(availableTime.timeFrom, "HH:mm").format("h:mm:A"),
          timeTo: momentJs(availableTime.timeTo, "HH:mm").format("h:mm:A"),
        };
      })
      .filter((availableTime: any) => {
        if (
          availableTime.timeFrom !== "Invalid date" ||
          availableTime.timeTo !== "Invalid date"
        ) {
          return availableTime;
        }
      })
      ?.map((availableTime: any) => {
        if (availableTime.id !== "") {
          return {
            id: availableTime.id,
            timeFrom: availableTime.timeFrom,
            timeTo: availableTime.timeTo,
          };
        }

        return {
          timeFrom: availableTime.timeFrom,
          timeTo: availableTime.timeTo,
        };
      });

    const dataAvailableDays = data.availableDays
      ?.map((availableDay: any, index: number) => {
        if (availableDay.value) {
          if (`${availableDay.id}` !== "0") {
            return {
              id: availableDays[index].id,
              day: availableDays[index].label,
            };
          }

          return {
            day: availableDays[index].label,
          };
        }
      })
      .filter((availableDay: any) => availableDay);

    const slotTime = data?.slotTime.value;

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("specialization", data.specialization);
    formData.append("degree", data.degree);
    formData.append("experience", data.experience);
    formData.append("fees", data.fees);

    if (data.profilePhoto) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }
    formData.append("slotTime", slotTime);

    //? FormData for Available Time
    availableTimes.forEach((availableTime: any, index: number) => {
      if (availableTime.id) {
        formData.append(`availableTimes[${index}][id]`, availableTime.id);
        formData.append(
          `availableTimes[${index}][timeFrom]`,
          availableTime.timeFrom
        );
        formData.append(
          `availableTimes[${index}][timeTo]`,
          availableTime.timeTo
        );
        return;
      }

      formData.append(
        `availableTimes[${index}][timeFrom]`,
        availableTime.timeFrom
      );
      formData.append(`availableTimes[${index}][timeTo]`, availableTime.timeTo);
    });

    //? FormData for Available Day
    dataAvailableDays.forEach((availableDay: any, index: number) => {
      if (availableDay.id) {
        formData.append(`availableDays[${index}][id]`, availableDay.id);
        formData.append(`availableDays[${index}][day]`, availableDay.day);
        return;
      }

      formData.append(`availableDays[${index}][day]`, availableDay.day);
    });

    const result = await updateProfile(formData);

    if ("data" in result) {
      return navigate("/doctor/profile");
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
          <BackButtonComponent title="back" isList={false} />
        </div>
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
                        <span className="label-text">
                          {availableDay?.label}
                        </span>
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
              <div className="flex justify-center items-center">
                <ImageUploadComponent
                  control={control}
                  name="profilePhoto"
                  defaultValue={`${API_URL}/${data?.profilePhoto}`}
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
                  <div className="flex gap-6 items-center" key={index}>
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
                      {errors.availableTimes &&
                        errors.availableTimes[index] && (
                          <label className="label">
                            <span className="label-text-alt text-red-600">
                              {errors.availableTimes[index]?.timeFrom
                                ?.message || ""}
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
                      {errors.availableTimes &&
                        errors.availableTimes[index] && (
                          <label className="label">
                            <span className="label-text-alt text-red-600">
                              {errors.availableTimes[index]?.timeTo?.message ||
                                ""}
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
      </div>
    </LayoutComponent>
  );
};

export default DoctorUpdateProfileComponent;
