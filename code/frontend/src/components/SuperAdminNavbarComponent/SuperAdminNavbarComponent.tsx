import { Role } from "../../enums/role.enums";
import { useGetProfileForSuperAdminQuery } from "../../redux/api/super-admin/super-admin-profile/super-admin-profile";
import NavbarComponent from "../NavbarComponent/NavbarComponent";

import { useAppDispatch } from "../../redux/redux-hook";
import {
  cleanSuperAuthData,
  cleanSuperLocalStorage,
} from "../../redux/features/super_auth_slice/super_auth_slice";
import { useEffect } from "react";
import {
  cleanDoctorAuthData,
  cleanDoctorLocalStorage,
} from "../../redux/features/doctor_auth_slice/doctor_auth_slice";
import {
  cleanPatientAuthData,
  cleanPatientLocalStorage,
} from "../../redux/features/patient_auth_slice/patient_auth_slice";
import {
  cleanReceptionistAuthData,
  cleanReceptionistLocalStorage,
} from "../../redux/features/receptionist_auth_slice/receptionist_auth_slice";

const SuperAdminNavbarComponent = () => {
  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForSuperAdminQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanDoctorAuthData());
    dispatch(cleanDoctorLocalStorage());

    dispatch(cleanPatientAuthData());
    dispatch(cleanPatientLocalStorage());

    dispatch(cleanReceptionistAuthData());
    dispatch(cleanReceptionistLocalStorage());
  });

  const logout = () => {
    dispatch(cleanSuperAuthData());
    dispatch(cleanSuperLocalStorage());
  };

  return (
    <NavbarComponent
      role={Role.SuperAdmin}
      profileIsFetching={profileIsFetching}
      name={`${profile?.name}`}
      profilePhoto={profile?.profilePhoto}
      logout={logout}
    />
  );
};

export default SuperAdminNavbarComponent;
