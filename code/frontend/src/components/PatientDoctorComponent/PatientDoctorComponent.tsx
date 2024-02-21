import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import PatientDoctorTableComponent from "../PatientDoctorTableComponent/PatientDoctorTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const PatientDoctorComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">DOCTOR LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <PatientDoctorTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default PatientDoctorComponent;
