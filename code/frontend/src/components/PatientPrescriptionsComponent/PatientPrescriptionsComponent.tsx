import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import PatientPrescriptionsTableComponent from "../PatientPrescriptionsTableComponent/PatientPrescriptionsTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const PatientPrescriptionsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">PRESCRIPTION LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <PatientPrescriptionsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default PatientPrescriptionsComponent;
