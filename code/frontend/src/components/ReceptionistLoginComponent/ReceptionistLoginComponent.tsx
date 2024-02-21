import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { toast } from "react-toastify";
import LoginLayoutComponent from "../layout/LoginLayoutComponent/LoginLayoutComponent";
import LoginFormComponent from "../formComponent/LoginFormComponent/LoginFormComponent";
import { useLoginForReceptionistMutation } from "../../redux/api/receptionist/receptionist-auth/receptionist-auth";
import { useAppDispatch } from "../../redux/redux-hook";
import { setReceptionistAuthData } from "../../redux/features/receptionist_auth_slice/receptionist_auth_slice";

const ReceptionistLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const [login] = useLoginForReceptionistMutation({});

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const onSubmit = async (data: any) => {
    const fetchData = await login({ ...data });

    if ("data" in fetchData) {
      setLoading(true);

      dispatch(setReceptionistAuthData(fetchData.data as any));
      navigate(`/${Role.Receptionist}/`, {
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

export default ReceptionistLoginComponent;
