import { useState } from "react";
import { useSuperAdminLoginMutation } from "../../redux/api/super-admin/super-admin-auth/super-admin-auth";
import LoginFormComponent from "../formComponent/LoginFormComponent/LoginFormComponent";
import LoginLayoutComponent from "../layout/LoginLayoutComponent/LoginLayoutComponent";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { useDispatch } from "react-redux";
import { setSuperAuthData } from "../../redux/features/super_auth_slice/super_auth_slice";

const SuperLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const [superAdminLogin] = useSuperAdminLoginMutation({});

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const fetchData = await superAdminLogin({ ...data });

    if ("data" in fetchData) {
      setLoading(true);

      dispatch(setSuperAuthData(fetchData.data as any));
      navigate(`/${Role.SuperAdmin}/`, {
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

export default SuperLoginComponent;
