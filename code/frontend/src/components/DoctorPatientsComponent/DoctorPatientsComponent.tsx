import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import DoctorPatientsTableComponent from "../DoctorPatientsTableComponent/DoctorPatientsTableComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const DoctorPatientsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">PATIENT LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <DoctorPatientsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default DoctorPatientsComponent;
