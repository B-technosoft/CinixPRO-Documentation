import { useForm } from "react-hook-form";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientValidationSchema } from "../../validations/validations";
import { useAddPatientForSuperAdminMutation } from "../../redux/api/super-admin/super-admin-patient/super-admin-patient";
import { toast } from "react-toastify";
import { ResultError } from "../../types/result-error";
import { useNavigate } from "react-router-dom";
import PatientCreateFormComponent from "../formComponent/PatientFormComponent/PatientCreateFormComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminCreatePatientsComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientValidationSchema),
  });

  const navigate = useNavigate();

  const [addPatient] = useAddPatientForSuperAdminMutation();

  const onSubmit = async (data: any) => {
    if (!data.gender && data.gender === "Select a gender") {
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profilePhoto", data.profilePhoto[0]);
    formData.append("currentAddress", data.currentAddress);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("bloodPressure", data.bloodPressure);
    formData.append("pulse", data.pulse);
    formData.append("respiration", data.respiration);
    formData.append("allergy", data.allergy);
    formData.append("diet", data.diet);

    const result = await addPatient(formData);

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
          <h1 className="font-bold">ADD NEW Patient</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Patient" />
        </div>
        <PatientCreateFormComponent
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminCreatePatientsComponent;
