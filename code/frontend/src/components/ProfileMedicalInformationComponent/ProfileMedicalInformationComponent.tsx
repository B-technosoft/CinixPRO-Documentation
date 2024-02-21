import { useGetProfileForPatientQuery } from "../../redux/api/patient/patient-profile/patient-profile";

const ProfileMedicalInformationComponent = () => {
  const {
    data: profile,
    isFetching: profileIsFetching,
    isSuccess,
  } = useGetProfileForPatientQuery("");

  return (
    <div className="px-4 divide-y">
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Height</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && <p className="flex-1">{profile.height}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Weight</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && <p className="flex-1">{profile.weight}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Blood Group</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && (
            <p className="flex-1">{profile.bloodGroup}</p>
          )}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Blood Pressure</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && (
            <p className="flex-1">{profile.bloodPressure}</p>
          )}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Pulse</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && <p className="flex-1">{profile.pulse}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Respiration</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && (
            <p className="flex-1">{profile.respiration}</p>
          )}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Allergy</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && <p className="flex-1">{profile.allergy}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Diet</p>
          {profileIsFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {profile && isSuccess && <p className="flex-1">{profile.diet}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileMedicalInformationComponent;
