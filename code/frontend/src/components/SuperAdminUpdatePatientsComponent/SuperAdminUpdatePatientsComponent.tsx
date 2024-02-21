import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { patientUpdateValidationSchema } from "../../validations/validations";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ResultError } from "../../types/result-error";
import { toast } from "react-toastify";
import {
  useGetPatientDetailsForSuperAdminQuery,
  useUpdatePatientForSuperAdminMutation,
} from "../../redux/api/super-admin/super-admin-patient/super-admin-patient";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import PaientUpdateFormComponent from "../formComponent/PatientFormComponent/PaientUpdateFormComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminUpdatePatientsComponent = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientUpdateValidationSchema),
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isFetching, isSuccess } =
    useGetPatientDetailsForSuperAdminQuery(id);

  const [updatePatient] = useUpdatePatientForSuperAdminMutation();

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      reset(data);
    }
  }, [data, isFetching, isSuccess, reset]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData?.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("Password", data.Password);
    if (data?.profilePhoto) {
      formData.append("profilePhoto", data?.profilePhoto[0]);
    }
    formData.append("currentAddress", data.currentAddress);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("bloodPressure", data.bloodPressure);
    formData.append("pulse", data.pulse);
    formData.append("respiration", data.respiration);
    formData.append("allergy", data.allergy);
    formData.append("diet", data.diet);
    formData.append("password", data.Password);

    const result = await updatePatient(formData);

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
          <h1 className="font-bold">Update Patient</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Patient" />
        </div>
        <PaientUpdateFormComponent
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          profilePhoto={data?.profilePhoto}
        />
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminUpdatePatientsComponent;
