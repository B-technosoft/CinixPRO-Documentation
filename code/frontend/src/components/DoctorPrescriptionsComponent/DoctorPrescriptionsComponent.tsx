import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import DoctorPrescriptionsTableComponent from "../DoctorPrescriptionsTableComponent/DoctorPrescriptionsTableComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const DoctorPrescriptionsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">PRESCRIPTION LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <DoctorPrescriptionsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default DoctorPrescriptionsComponent;
