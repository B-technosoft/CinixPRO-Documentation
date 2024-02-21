import { Navigate } from "react-router-dom";
import { GuardInterface } from "../GuardInterface/GuardInterface";
import { Storage } from "../enums/storage.enums";
import useIsHashToken from "../hooks/useIsHashToken";

const DoctorProtectRoute = ({ component }: GuardInterface) => {
  const doctorToken = useIsHashToken(Storage.DoctorToken);

  if (!doctorToken) {
    return (
      <>
        <Navigate to={"/doctor/login"} />
      </>
    );
  }

  return component;
};

export default DoctorProtectRoute;
