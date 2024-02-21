import { toast } from "react-toastify";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { ResultError } from "../../types/result-error";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetAvailableDayQuery,
  useGetTimeSlotQuery,
} from "../../redux/api/public/public";
import {
  useGetDoctorByIdForSuperAdminQuery,
  useUpdateDoctorForSuperAdminMutation,
} from "../../redux/api/super-admin/super-admin-doctor/super-admin-doctor";
import { useNavigate, useParams } from "react-router-dom";
import { doctorUpdateValidationSchema } from "../../validations/validations";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";

import momentJs from "moment";
import DoctorUpdateFormComponent from "../formComponent/DoctorFormComponent/DoctorUpdateFormComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminUpdateDoctorComponent = () => {
  const [availableDays, setAvailableDays] = useState([
    {
      id: 0,
      label: "",
      value: false,
    },
  ]);

  const [slotsTime, setSlotsTime] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data: doctorData, isFetching: doctorDataIsFetching } =
    useGetDoctorByIdForSuperAdminQuery(id);

  const { data: availableDay, isFetching: availableDaysIsFetching } =
    useGetAvailableDayQuery("");

  const { data: slotsTimes, isFetching: slotsTimeIsFetching } =
    useGetTimeSlotQuery("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(doctorUpdateValidationSchema),
    defaultValues: {
      availableTimes: [{ timeFrom: "", timeTo: "" }],
    },
  });

  const {
    fields: availableTimes,
    append: availableTimesFieldsAppend,
    remove: availableTimesFieldsRemove,
    prepend: availableTimesFieldsPrepend,
  } = useFieldArray({
    control,
    name: "availableTimes",
  });

  const [updateDoctor] = useUpdateDoctorForSuperAdminMutation();

  const onClickAddTimeBtn = () => {
    availableTimesFieldsAppend({ id: 0, timeFrom: "", timeTo: "" });
  };

  const onClickRemoveTimeBtn = (index: number) => {
    availableTimesFieldsRemove(index);
  };

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
    if (!availableDaysIsFetching && doctorData) {
      const availableDays = availableDay.result?.map((availableDay: any) => ({
        id: 0,
        label: availableDay,
        value: false,
      }));

      const resetAvailableDay = availableDays?.map((availableDay: any) => {
        let id: number = 0;

        const isChecked = doctorData?.availableDays.some(
          (dataAvailableDay: any) => {
            const com = dataAvailableDay.day === availableDay.label;
            if (com) {
              id = dataAvailableDay.id;
              return true;
            }
            return false;
          }
        );

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
      });

      setAvailableDays(resetAvailableDay);

      setValue("availableDays", resetAvailableDay);
    }
  }, [availableDaysIsFetching, availableDay, doctorData]);

  useEffect(() => {
    if (
      !doctorDataIsFetching &&
      !availableDaysIsFetching &&
      !slotsTimeIsFetching &&
      doctorData
    ) {
      const availableTimes = (doctorData?.availableTime as [])?.map(
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

      const data = {
        ...doctorData,
        slotTime: {
          label: doctorData?.slotTime,
          value: doctorData?.slotTime,
        },
      };

      if (availableTimes.length > 0) {
        availableTimesFieldsPrepend([...availableTimes]);
        data.availableTimes = [...availableTimes];
      }

      reset(data);
    }
  }, [
    doctorDataIsFetching,
    doctorData,
    availableDaysIsFetching,
    slotsTimeIsFetching,
    availableDays,
    reset,
    getValues,
  ]);

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
      .map((availableTime: any) => {
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
      .map((availableDay: any, index: number) => {
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

    const result = await updateDoctor(formData);

    if ("data" in result) {
      return navigate(-1);
    }

    if ("error" in result) {
      const error = result.error as ResultError;

      if (error.status === 409) {
        return toast.error(error.data.message);
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">ADD Update DOCTOR</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Doctor" />
        </div>
        <DoctorUpdateFormComponent
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
          doctorData={doctorData}
        />
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminUpdateDoctorComponent;
