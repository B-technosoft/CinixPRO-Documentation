import { useState } from "react";
import { usePatientLoginForPatientMutation } from "../../redux/api/patient/patient-auth/patient-auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import LoginLayoutComponent from "../layout/LoginLayoutComponent/LoginLayoutComponent";
import LoginFormComponent from "../formComponent/LoginFormComponent/LoginFormComponent";
import { toast } from "react-toastify";
import { setPatientAuthData } from "../../redux/features/patient_auth_slice/patient_auth_slice";
import { useDispatch } from "react-redux";

const PatientLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const [login] = usePatientLoginForPatientMutation({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const onSubmit = async (data: any) => {
    const fetchData = await login({ ...data });

    if ("data" in fetchData) {
      setLoading(true);

      dispatch(setPatientAuthData(fetchData.data as any));
      navigate(`/${Role.Patient}/`, {
        replace: true,
      });
    }

    if ("error" in fetchData) {
      setLoading(false);

      toast.error("Invalid credentials");
    }
  };

  return (
    <LoginLayoutComponent>
      <LoginFormComponent
        onSubmit={onSubmit}
        loading={loading}
        role={Role.Patient}
        signUp
        email={searchParams.get("email")}
        password={searchParams.get("password")}
      />
    </LoginLayoutComponent>
  );
};

export default PatientLoginComponent;
