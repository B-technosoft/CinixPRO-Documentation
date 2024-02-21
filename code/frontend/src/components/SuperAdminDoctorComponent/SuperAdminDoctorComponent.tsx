import LayoutComponent from "../LayoutComponent/LayoutComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";
import SuperAdminDoctorTableComponent from "../SuperAdminDoctorTableComponent/SuperAdminDoctorTableComponent";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const SuperAdminDoctorComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">DOCTOR LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <SuperAdminDoctorTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminDoctorComponent;
