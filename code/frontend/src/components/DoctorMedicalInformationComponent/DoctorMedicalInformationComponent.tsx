import { useParams } from "react-router-dom";
import { useGetPatientDetailsForDoctorQuery } from "../../redux/api/doctor/doctor-patients/doctor-patients";

const DoctorMedicalInformationComponent = () => {
  const { id } = useParams();
  const { data, isFetching, isSuccess } =
    useGetPatientDetailsForDoctorQuery(id);

  return (
    <div className="px-4 divide-y">
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Height</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.height}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Weight</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.weight}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Blood Group</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.bloodGroup}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Blood Pressure</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.bloodPressure}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Pulse</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.pulse}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Respiration</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.respiration}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Allergy</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.allergy}</p>}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex w-full">
          <p className="flex-1">Diet</p>
          {isFetching && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {data && isSuccess && <p className="flex-1">{data.diet}</p>}
        </div>
      </div>
    </div>
  );
};

export default DoctorMedicalInformationComponent;
