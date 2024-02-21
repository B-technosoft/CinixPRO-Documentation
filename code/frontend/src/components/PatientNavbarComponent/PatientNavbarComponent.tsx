import { Role } from "../../enums/role.enums";
import { useGetProfileForPatientQuery } from "../../redux/api/patient/patient-profile/patient-profile";
import {
  cleanPatientAuthData,
  cleanPatientLocalStorage,
} from "../../redux/features/patient_auth_slice/patient_auth_slice";
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
  cleanReceptionistAuthData,
  cleanReceptionistLocalStorage,
} from "../../redux/features/receptionist_auth_slice/receptionist_auth_slice";

const PatientNavbarComponent = () => {
  const { data: profile, isFetching: profileIsFetching } =
    useGetProfileForPatientQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanDoctorAuthData());
    dispatch(cleanDoctorLocalStorage());

    dispatch(cleanSuperAuthData());
    dispatch(cleanSuperLocalStorage());

    dispatch(cleanReceptionistAuthData());
    dispatch(cleanReceptionistLocalStorage());
  });

  const logout = () => {
    dispatch(cleanPatientAuthData());
    dispatch(cleanPatientLocalStorage());
  };

  return (
    <NavbarComponent
      role={Role.Patient}
      profileIsFetching={profileIsFetching}
      name={`${profile?.firstName} ${profile?.lastName}`}
      profilePhoto={profile?.profilePhoto}
      logout={logout}
    />
  );
};

export default PatientNavbarComponent;
