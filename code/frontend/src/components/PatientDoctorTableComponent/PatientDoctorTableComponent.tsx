import { useState } from "react";
import CardTitleComponent from "../CardTitleComponent/CardTitleComponent";
import TableComponent from "../TableComponent/TableComponent";
import { useGetDoctorListForPatientQuery } from "../../redux/api/patient/patient-doctor/patient-doctor";

const PatientDoctorTableComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isFetching } = useGetDoctorListForPatientQuery({
    params: {
      search,
    },
  });

  return (
    <>
      <CardTitleComponent search={search} setSearch={setSearch} />
      <TableComponent
        isLoading={isFetching}
        theads={
          <thead className="bg-base-200">
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Contact No</th>
              <th>Email</th>
            </tr>
          </thead>
        }
        tbodys={
          <tbody>
            {!isFetching &&
              (data as [])?.map((doctor: any, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{`${doctor.firstName} ${doctor.lastName}`}</td>
                  <td>{`${doctor.specialization}`}</td>
                  <td>{`${doctor.email}`}</td>
                  <td>{`${doctor.contact}`}</td>
                </tr>
              ))}
          </tbody>
        }
      />
    </>
  );
};

export default PatientDoctorTableComponent;
