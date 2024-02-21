import { useState } from "react";
import { useLoginForDoctorMutation } from "../../redux/api/doctor/doctor-auth/doctor-auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { toast } from "react-toastify";
import LoginLayoutComponent from "../layout/LoginLayoutComponent/LoginLayoutComponent";
import LoginFormComponent from "../formComponent/LoginFormComponent/LoginFormComponent";
import { useDispatch } from "react-redux";
import { setDoctorAuthData } from "../../redux/features/doctor_auth_slice/doctor_auth_slice";

const DoctorLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const [login] = useLoginForDoctorMutation({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const onSubmit = async (data: any) => {
    const fetchData = await login({ ...data });

    if ("data" in fetchData) {
      setLoading(true);

      dispatch(setDoctorAuthData(fetchData.data as any));
      navigate(`/${Role.Doctor}/`, {
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
        email={searchParams.get("email")}
        password={searchParams.get("password")}
      />
    </LoginLayoutComponent>
  );
};

export default DoctorLoginComponent;
