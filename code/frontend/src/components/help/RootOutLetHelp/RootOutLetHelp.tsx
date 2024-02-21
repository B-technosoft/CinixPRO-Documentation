import { Outlet, useLocation } from "react-router-dom";
import { RootOutLetHelpInterface } from "./RootOutLetHelpInterface";
import CustomSuspenseComponent from "../../CustomSuspenseComponent/CustomSuspenseComponent";

const RootOutLetHelp = ({ component }: RootOutLetHelpInterface) => {
  const location = useLocation();
  const isLoginRoute =
    location.pathname.includes("login") ||
    location.pathname.includes("sign-up");

  return (
    <>
      {!isLoginRoute && component}
      <CustomSuspenseComponent>
        <Outlet />
      </CustomSuspenseComponent>
    </>
  );
};

export default RootOutLetHelp;
