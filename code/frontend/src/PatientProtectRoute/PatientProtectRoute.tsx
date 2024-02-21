import { Navigate } from "react-router-dom";
import { GuardInterface } from "../GuardInterface/GuardInterface";
import { Storage } from "../enums/storage.enums";
import useIsHashToken from "../hooks/useIsHashToken";

const PatientProtectRoute = ({ component }: GuardInterface) => {
  const patientToken = useIsHashToken(Storage.PatientToken);

  if (!patientToken) {
    return (
      <>
        <Navigate to={"/patient/login"} />
      </>
    );
  }

  return component;
};

export default PatientProtectRoute;
