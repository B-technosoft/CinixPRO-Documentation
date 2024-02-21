import { Controller, useForm } from "react-hook-form";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import Select from "react-select";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import { useEffect, useState } from "react";
import {
  useBookAppointmentForReceptionisMutation,
  useGetAppointmentAvailableSlotForReceptionisQuery,
  useGetAppointmentAvailableTimeForReceptionisQuery,
} from "../../redux/api/receptionist/receptionist-appointment/receptionist-appointment";
import { useGetDoctorListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-doctor/receptionist-doctor";
import { useGetPatientListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-patient/receptionist-patient";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { receptiosistAppointmentValidationSchema } from "../../validations/validations";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

export interface AvailableTimeInterface {
  id: number;
  timeFrom: string;
  timeTo: string;
}

export interface AvailableSlotsInterface {
  id: number;
  timeFrom: string;
  timeTo: string;
  isUsed: boolean;
}

const ReceptionistCreateAppointmentComponent = () => {
  const [patientOptions, setPatientOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(receptiosistAppointmentValidationSchema),
  });

  const navigate = useNavigate();

  const appointmentDate = watch("appointmentDate");
  const availableTime = watch("availableTime");
  const availableSlot = watch("availableSlot");
  const doctor = watch("doctor");

  const { data: patientData, isFetching: patientDataIsFetching } =
    useGetPatientListForReceptionisQuery({});

  const { data: doctorData, isFetching: doctorDataIsFetching } =
    useGetDoctorListForReceptionisQuery({});

  const { data: availableTimes, isFetching: availableTimeIsFetching } =
    useGetAppointmentAvailableTimeForReceptionisQuery({
      doctorId: doctor?.value,
      appointmentDate,
    });

  const { data: availableSlots, isFetching: availableSlotIsFetching } =
    useGetAppointmentAvailableSlotForReceptionisQuery({
      doctorId: doctor?.value,
      availableTimeId: availableTime,
      appointmentDate,
    });

  const [bookAppointment] = useBookAppointmentForReceptionisMutation();

  useEffect(() => {
    if (!patientDataIsFetching) {
      const options = patientData?.map((patient: any) => ({
        label: `${patient.firstName} ${patient.lastName}`,
        value: patient.id,
      }));

      setPatientOptions(options);
    }
  }, [patientDataIsFetching, patientData]);

  useEffect(() => {
    if (!doctorDataIsFetching) {
      const options = doctorData?.map((doctor: any) => ({
        label: `${doctor.doctor_firstName} ${doctor.doctor_lastName}`,
        value: doctor.doctor_id,
      }));

      setDoctorOptions(options);
    }
  }, [doctorDataIsFetching, doctorData]);

  const onSubmit = async (data: any) => {
    const { doctor, patient, availableSlot: availableSlots } = data;

    if (!doctor && !patient && !availableSlots && !data) {
      return;
    }

    const availableSlot = (availableSlots as string).split(" to ");

    const appointmentStartTime = availableSlot[0];
    const appointmentEndTime = availableSlot[1];

    const result = await bookAppointment({
      ...data,
      patient: patient.value,
      doctor: doctor.value,
      appointmentStartTime,
      appointmentEndTime,
    });

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
                <span className="label-text">Doctor</span>
              </label>
              <Controller
                name="doctor"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={doctorOptions}
                    isLoading={doctorDataIsFetching}
                  />
                )}
              />
              {errors.doctor && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.doctor.label?.message}
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
                    {errors.appointmentDate?.message}
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
                            defaultValue=""
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
                      (
                        { timeFrom, timeTo, isUsed }: AvailableSlotsInterface,
                        i: number
                      ) => (
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
                            defaultValue=""
                            disabled={isUsed}
                            render={({ field }) => (
                              <input
                                type="radio"
                                className="hidden"
                                disabled={isUsed}
                                {...field}
                                value={`${timeFrom} to ${timeTo}`}
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

export default ReceptionistCreateAppointmentComponent;
