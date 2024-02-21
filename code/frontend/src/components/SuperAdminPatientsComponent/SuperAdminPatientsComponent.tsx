import SuperAdminPatientsTableComponent from "../SuperAdminPatientsTableComponent/SuperAdminPatientsTableComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminPatientsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">Patients LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <SuperAdminPatientsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminPatientsComponent;
