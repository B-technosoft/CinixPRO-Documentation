import { Role } from "../../enums/role.enums";
import { useGetProfileForReceptionistQuery } from "../../redux/api/receptionist/receptionist-profile/receptionist-profile";
import {
  cleanReceptionistAuthData,
  cleanReceptionistLocalStorage,
} from "../../redux/features/receptionist_auth_slice/receptionist_auth_slice";
import { useAppDispatch } from "../../redux/redux-hook";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { useEffect } from "react";
import {
  cleanDoctorAuthData,
  cleanDoctorLocalStorage,
} from "../../redux/features/doctor_auth_slice/doctor_auth_slice";
import {
  cleanSuperAuthData,
  cleanSuperLocalStorage,
} from "../../redux/features/super_auth_slice/super_auth_slice";
import {
  cleanPatientAuthData,
  cleanPatientLocalStorage,
} from "../../redux/features/patient_auth_slice/patient_auth_slice";

const ReceptionistNavbarComponent = () => {
  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForReceptionistQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanDoctorAuthData());
    dispatch(cleanDoctorLocalStorage());

    dispatch(cleanSuperAuthData());
    dispatch(cleanSuperLocalStorage());

    dispatch(cleanPatientAuthData());
    dispatch(cleanPatientLocalStorage());
  });

  const logout = () => {
    dispatch(cleanReceptionistAuthData());
    dispatch(cleanReceptionistLocalStorage());
  };

  return (
    <NavbarComponent
      role={Role.Receptionist}
      profileIsFetching={profileIsFetching}
      name={`${profile?.firstName} ${profile?.lastName}`}
      profilePhoto={`api/media/receptionist/${profile?.profilePhoto}`}
      logout={logout}
    />
  );
};

export default ReceptionistNavbarComponent;
