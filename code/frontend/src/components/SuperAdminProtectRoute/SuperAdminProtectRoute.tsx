import { Navigate } from "react-router-dom";
import { Storage } from "../../enums/storage.enums";
import { GuardInterface } from "../../GuardInterface/GuardInterface";
import useIsHashToken from "../../hooks/useIsHashToken";

const SuperAdminProtectRoute = ({ component }: GuardInterface) => {
  const superAdminToken = useIsHashToken(Storage.SuperAdminToken);

  if (!superAdminToken) {
    return (
      <>
        <Navigate to={"/super-admin/login"} />
      </>
    );
  }

  return component;
};

export default SuperAdminProtectRoute;
