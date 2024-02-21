import { useEffect, useState } from "react";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { useFieldArray, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { doctorValidationSchema } from "../../validations/validations";
import { useAddDoctorForSuperAdminMutation } from "../../redux/api/super-admin/super-admin-doctor/super-admin-doctor";
import {
  useGetAvailableDayQuery,
  useGetTimeSlotQuery,
} from "../../redux/api/public/public";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResultError } from "../../types/result-error";
import DoctorCreateFormComponent from "../formComponent/DoctorFormComponent/DoctorCreateFormComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminCreateDoctorComponent = () => {
  const [availableDays, setAvailableDays] = useState([
    {
      label: "",
      value: false,
    },
  ]);

  const [slotsTime, setSlotsTime] = useState([]);

  const navigate = useNavigate();

  const [addDoctor] = useAddDoctorForSuperAdminMutation();

  const { data: availableDay, isFetching: availableDaysIsFetching } =
    useGetAvailableDayQuery("");

  const { data: slotsTimes, isFetching: slotsTimeIsFetching } =
    useGetTimeSlotQuery("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(doctorValidationSchema),
    defaultValues: {
      availableTimes: [{ timeFrom: "", timeTo: "" }],
    },
  });

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
    if (!availableDaysIsFetching) {
      const availableDays = availableDay.result?.map((availableDay: any) => ({
        label: availableDay,
        value: false,
      }));

      setAvailableDays(availableDays);
    }
  }, [availableDaysIsFetching, availableDay]);

  const onSubmit = async (data: any) => {
    const dataAvailableDays = data.availableDays
      .filter((availableDay: any) => availableDay.value)
      .map((_: any, index: number) => availableDays[index].label);

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("specialization", data.specialization);
    formData.append("degree", data.degree);
    formData.append("experience", data.experience);
    formData.append("fees", data.fees);
    formData.append("password", data.password);
    formData.append("slotTime", data.slotTime.value);
    formData.append("profilePhoto", data.profilePhoto[0]);
    dataAvailableDays.forEach((day: any, index: number) => {
      formData.append(`availableDays[${index}][day]`, day);
    });
    (data.availableTimes as []).forEach(
      (availableTime: { timeFrom: string; timeTo: string }, index) => {
        formData.append(
          `availableTimes[${index}][timeFrom]`,
          availableTime.timeFrom
        );
        formData.append(
          `availableTimes[${index}][timeTo]`,
          availableTime.timeTo
        );
      }
    );

    const result = await addDoctor(formData);

    if ("data" in result) {
      return navigate(-1);
    }

    if ("error" in result) {
      const error = result.error as ResultError;

      if (error.status === 409) {
        return toast.error(error.data.message);
      }

      toast.error("Something went wrong");
      return;
    }
  };

  const {
    fields: availableTimes,
    append: availableTimesFieldsAppend,
    remove: availableTimesFieldsRemove,
  } = useFieldArray({
    control,
    name: "availableTimes",
  });

  const onClickAddTimeBtn = () => {
    availableTimesFieldsAppend({ timeFrom: "", timeTo: "" });
  };

  const onClickRemoveTimeBtn = (index: number) => {
    availableTimesFieldsRemove(index);
  };

  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">ADD NEW DOCTOR</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Doctor" />
        </div>
        <DoctorCreateFormComponent
          availableDays={availableDays}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          availableTimes={availableTimes}
          onClickAddTimeBtn={onClickAddTimeBtn}
          onClickRemoveTimeBtn={onClickRemoveTimeBtn}
          slotsTime={slotsTime}
          availableDaysIsFetching={availableDaysIsFetching}
          slotsTimeIsFetching={slotsTimeIsFetching}
        />
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminCreateDoctorComponent;
