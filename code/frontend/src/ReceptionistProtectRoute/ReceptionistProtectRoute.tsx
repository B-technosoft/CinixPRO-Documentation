import { Navigate } from "react-router-dom";
import { GuardInterface } from "../GuardInterface/GuardInterface";
import { Storage } from "../enums/storage.enums";
import useIsHashToken from "../hooks/useIsHashToken";

const ReceptionistProtectRoute = ({ component }: GuardInterface) => {
  const receptionistToken = useIsHashToken(Storage.ReceptionistToken);

  if (!receptionistToken) {
    return (
      <>
        <Navigate to={"/receptionist/login"} />
      </>
    );
  }

  return component;
};

export default ReceptionistProtectRoute;
