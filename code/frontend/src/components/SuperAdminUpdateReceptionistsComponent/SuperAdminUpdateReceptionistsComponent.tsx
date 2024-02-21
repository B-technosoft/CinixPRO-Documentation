import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { receptionistUpdateValidationSchema } from "../../validations/validations";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import ReceptionistUpdateFormComponent from "../formComponent/ReceptionistFormComponent/ReceptionistUpdateFormComponent";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetReceptionistByIdForSuperAdminQuery,
  useUpdateReceptionistForSuperAdminMutation,
} from "../../redux/api/super-admin/super-admin-reception/super-admin-reception";
import { useGetDoctorListForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-doctor/super-admin-doctor";
import { ResultError } from "../../types/result-error";
import { toast } from "react-toastify";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminUpdateReceptionistsComponent = () => {
  const [doctorOptions, setDoctorOptions] = useState([]);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(receptionistUpdateValidationSchema),
  });

  const { id } = useParams();

  const { data, isFetching, isSuccess } =
    useGetReceptionistByIdForSuperAdminQuery(id);

  const { data: doctorData, isFetching: doctorDataIsFetching } =
    useGetDoctorListForSuperAdminQuery({});

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
            (doctorData: any) => doctorData.doctor_id === doctor.id
          );
        })
        .map((doctor: any) => ({
          label: `${doctor.firstName} ${doctor.lastName}`,
          value: doctor.id,
        }));

      reset({ ...data, doctors: filteredDoctors });
    }
  }, [isFetching, isSuccess, data, doctorDataIsFetching, doctorData, reset]);

  const [updateReceptionist] = useUpdateReceptionistForSuperAdminMutation();

  useEffect(() => {
    if (!doctorDataIsFetching) {
      const options = doctorData.map((doctor: any) => ({
        label: `${doctor.doctor_firstName} ${doctor.doctor_lastName}`,
        value: doctor.doctor_id,
      }));

      setDoctorOptions(options);
    }
  }, [doctorDataIsFetching, doctorData]);

  const onSubmit = async (data: any) => {
    const doctorIds = (data.doctors as []).map(
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

    const result = await updateReceptionist(formData);

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
          <h1 className="font-bold">ADD NEW Receptionists</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Receptionist" />
        </div>
        <ReceptionistUpdateFormComponent
          control={control}
          doctorDataIsFetching={doctorDataIsFetching}
          doctorOptions={doctorOptions}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          profilePhoto={data?.profilePhoto}
        />
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminUpdateReceptionistsComponent;
