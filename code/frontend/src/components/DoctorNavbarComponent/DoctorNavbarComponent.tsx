import { Role } from "../../enums/role.enums";
import { useGetProfileForDoctorQuery } from "../../redux/api/doctor/doctor-profile/doctor-profile";
import {
  cleanDoctorAuthData,
  cleanDoctorLocalStorage,
} from "../../redux/features/doctor_auth_slice/doctor_auth_slice";
import { useAppDispatch } from "../../redux/redux-hook";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { useEffect } from "react";
import {
  cleanSuperAuthData,
  cleanSuperLocalStorage,
} from "../../redux/features/super_auth_slice/super_auth_slice";
import {
  cleanPatientAuthData,
  cleanPatientLocalStorage,
} from "../../redux/features/patient_auth_slice/patient_auth_slice";
import {
  cleanReceptionistAuthData,
  cleanReceptionistLocalStorage,
} from "../../redux/features/receptionist_auth_slice/receptionist_auth_slice";

const DoctorNavbarComponent = () => {
  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForDoctorQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanSuperAuthData());
    dispatch(cleanSuperLocalStorage());

    dispatch(cleanPatientAuthData());
    dispatch(cleanPatientLocalStorage());

    dispatch(cleanReceptionistAuthData());
    dispatch(cleanReceptionistLocalStorage());
  });

  const logout = () => {
    dispatch(cleanDoctorAuthData());
    dispatch(cleanDoctorLocalStorage());
  };

  return (
    <NavbarComponent
      role={Role.Doctor}
      profileIsFetching={profileIsFetching}
      name={`${profile?.firstName} ${profile?.lastName}`}
      profilePhoto={profile?.profilePhoto}
      logout={logout}
    />
  );
};

export default DoctorNavbarComponent;
