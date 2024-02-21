import { Controller, useForm } from "react-hook-form";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPatientListForDoctorQuery } from "../../redux/api/doctor/doctor-patients/doctor-patients";
import {
  useBookAppointmentForDoctorMutation,
  useGetAppointmentAvailableSlotForDoctorQuery,
  useGetAppointmentAvailableTimeForDoctorQuery,
} from "../../redux/api/doctor/doctor-appintment/doctor-appintment";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import Select from "react-select";
import { AvailableTimeInterface } from "../PatientCreateAppointmentComponent/PatientCreateAppointmentComponent";
import { doctorAppointmentValidationSchema } from "../../validations/validations";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const DoctorCreateCalendarAppointmentComponent = () => {
  const [patientOptions, setPatientOptions] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(doctorAppointmentValidationSchema),
  });

  const navigate = useNavigate();

  const appointmentDate = watch("appointmentDate");
  const availableTime = watch("availableTime");
  const availableSlot = watch("availableSlot");

  const { data: patientData, isFetching: patientDataIsFetching } =
    useGetPatientListForDoctorQuery({});

  const { data: availableTimes, isFetching: availableTimeIsFetching } =
    useGetAppointmentAvailableTimeForDoctorQuery({
      appointmentDate,
    });

  const { data: availableSlots, isFetching: availableSlotIsFetching } =
    useGetAppointmentAvailableSlotForDoctorQuery({
      availableTimeId: availableTime,
      appointmentDate,
    });

  const [bookAppointment] = useBookAppointmentForDoctorMutation();

  useEffect(() => {
    if (!patientDataIsFetching) {
      const options = patientData?.map((patient: any) => ({
        label: `${patient.firstName} ${patient.lastName}`,
        value: patient.id,
      }));

      setPatientOptions(options);
    }
  }, [patientDataIsFetching, patientData]);

  const onSubmit = async (data: any) => {
    if (!data) {
      return;
    }

    const { value: patientId } = data.patient;

    const availableSlot = data.availableSlot?.split(" to ") as any[];

    const appointmentStartTime = availableSlot[0];
    const appointmentEndTime = availableSlot[1];

    const formData = {
      patient: patientId,
      appointmentDate: data.appointmentDate,
      appointmentStartTime,
      appointmentEndTime,
    };

    const result = await bookAppointment(formData);

    if ("data" in result) {
      return navigate(-1);
    }

    console.log(result);
  };

  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">BOOK APPOINTMENT</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="APPOINTMENT" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6"
        >
          <div className="border p-3 border-l-blue-500 border-l-4">
            <h1 className="text-lg">Book Appointment</h1>
          </div>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Patient</span>
              </label>
              <Controller
                name="patient"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={patientOptions}
                    isLoading={patientDataIsFetching}
                  />
                )}
              />
              {errors.patient && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.patient.label?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <Controller
                name="appointmentDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      resetField("availableTime");
                      resetField("availableSlot");
                    }}
                    className={`input input-bordered w-full input-md ${
                      errors.appointmentDate && `input-error`
                    }`}
                  />
                )}
              />
              {errors.appointmentDate && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.appointmentDate.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Available Time</span>
              </label>
              {availableTimeIsFetching && (
                <div className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
              {!availableTimeIsFetching &&
                appointmentDate &&
                availableTimes && (
                  <div className="flex flex-wrap gap-4">
                    {availableTimes?.map(
                      ({ id, timeFrom, timeTo }: AvailableTimeInterface) => (
                        <label
                          className={`flex p-2 border-2 rounded-md gap-1  cursor-pointer ${
                            availableTime === id.toString()
                              ? "bg-gray-400 text-white"
                              : "hover:bg-gray-400 hover:text-white"
                          }`}
                          key={id}
                        >
                          <Controller
                            name="availableTime"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="radio"
                                className="hidden"
                                {...field}
                                value={id}
                              />
                            )}
                          />
                          <span>
                            {timeFrom} to {timeTo}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                )}
              {availableTimes?.length <= 0 && (
                <p className="text-gray-400">Not Available Time</p>
              )}
              {errors.availableTime && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.availableTime.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Available Slot</span>
              </label>
              {availableSlotIsFetching && (
                <div className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
              {!availableSlotIsFetching &&
                availableTimes?.length > 0 &&
                appointmentDate &&
                availableTime &&
                availableTimes &&
                availableSlots && (
                  <div className="flex flex-wrap gap-4">
                    {availableSlots?.map(
                      ({ timeFrom, timeTo, isUsed }: any, i: number) => (
                        <label
                          className={`flex p-2 border-2 rounded-md gap-1  ${
                            isUsed
                              ? "cursor-not-allowed bg-[#EBEBE4] text-gray-500 hover:bg-[#EBEBE4] hover:text-gray-500"
                              : "cursor-pointer "
                          }
                            ${
                              availableSlot === `${timeFrom} to ${timeTo}`
                                ? "bg-gray-400 text-white "
                                : isUsed
                                ? ""
                                : "hover:bg-gray-400 hover:text-white"
                            }`}
                          key={i}
                        >
                          <Controller
                            name="availableSlot"
                            control={control}
                            disabled={isUsed}
                            defaultValue=""
                            render={({ field }) => (
                              <>
                                <input
                                  type="radio"
                                  className="hidden"
                                  {...field}
                                  value={`${timeFrom} to ${timeTo}`}
                                />
                                <span>
                                  {timeFrom} to {timeTo}
                                </span>
                              </>
                            )}
                          />
                        </label>
                      )
                    )}
                  </div>
                )}
              {errors.availableSlot && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.availableSlot.message}
                  </span>
                </label>
              )}
              {availableTimes?.length <= 0 && (
                <p className="text-gray-400">Not Available Slot</p>
              )}
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

export default DoctorCreateCalendarAppointmentComponent;
