import { useForm } from "react-hook-form";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";

import { yupResolver } from "@hookform/resolvers/yup";
import { receptionistValidationSchema } from "../../validations/validations";
import { useEffect, useState } from "react";
import { useGetDoctorListForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-doctor/super-admin-doctor";
import { useAddReceptionistForSuperAdminMutation } from "../../redux/api/super-admin/super-admin-reception/super-admin-reception";
import { useNavigate } from "react-router-dom";
import { ResultError } from "../../types/result-error";
import { toast } from "react-toastify";
import ReceptionistCreateFormComponent from "../formComponent/ReceptionistFormComponent/ReceptionistCreateFormComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminCreateReceptionistsComponent = () => {
  const [doctorOptions, setDoctorOptions] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(receptionistValidationSchema),
  });

  const { data: doctorData, isFetching: doctorDataIsFetching } =
    useGetDoctorListForSuperAdminQuery({});

  const [addReceptionist] = useAddReceptionistForSuperAdminMutation();

  useEffect(() => {
    if (!doctorDataIsFetching) {
      const options = doctorData?.map((doctor: any) => ({
        label: `${doctor.doctor_firstName} ${doctor.doctor_lastName}`,
        value: doctor.doctor_id,
      }));

      setDoctorOptions(options);
    }
  }, [doctorDataIsFetching, doctorData]);

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const doctorIds = (data.doctors as [])?.map(
      (doctor: { label: string; value: number }) => doctor.value
    );

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("password", data.password);
    formData.append("profilePhoto", data.profilePhoto[0]);
    doctorIds.forEach((doctorId, index) =>
      formData.append(`doctorIds[${index}]`, doctorId.toString())
    );

    const result = await addReceptionist(formData);

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
        <ReceptionistCreateFormComponent
          control={control}
          doctorDataIsFetching={doctorDataIsFetching}
          doctorOptions={doctorOptions}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminCreateReceptionistsComponent;
