import admin from "../../assets/logos/admin.png";
import doctor from "../../assets/logos/doctor.png";
import patient from "../../assets/logos/patient.png";
import receptionist from "../../assets/logos/receptionist.png";
import CredentialCardLayout from "../CredentialCardLayout/CredentialCardLayout";

const CredentialCardComponent = () => {
  return (
    <section
      id="check-demo"
      className="bg-[url('/assets/images/section-bg1.png')] bg-auto bg-no-repeat bg-center bg-fixed bg-[#f1fafb] flex justify-center items-center"
    >
      <div className="w-3/4 flex justify-evenly py-20">
        <CredentialCardLayout
          src={admin}
          link={`${
            import.meta.env.VITE_REACT_ENDPOINT
          }/super-admin/login?email=${
            import.meta.env.VITE_SUPER_ADMIN_EMAIL
          }&password=${import.meta.env.VITE_SUPER_ADMIN_PASSWORD}`}
          title="Super Admin"
        />
        <CredentialCardLayout
          src={doctor}
          link={`${import.meta.env.VITE_REACT_ENDPOINT}/doctor/login?email=${
            import.meta.env.VITE_DOCTOR_EMAIL
          }&password=${import.meta.env.VITE_DOCTOR_PASSWORD}`}
          title="Doctor"
        />
        <CredentialCardLayout
          src={patient}
          link={`${import.meta.env.VITE_REACT_ENDPOINT}/patient/login?email=${
            import.meta.env.VITE_PATIENT_EMAIL
          }&password=${import.meta.env.VITE_PATIENT_PASSWORD}`}
          title="Patient"
        />
        <CredentialCardLayout
          src={receptionist}
          link={`${
            import.meta.env.VITE_REACT_ENDPOINT
          }/receptionist/login?email=${
            import.meta.env.VITE_RECEPTIONIST_EMAIL
          }&password=${import.meta.env.VITE_RECEPTIONIST_PASSWORD}`}
          title="Receptionist"
        />
      </div>
    </section>
  );
};

export default CredentialCardComponent;
