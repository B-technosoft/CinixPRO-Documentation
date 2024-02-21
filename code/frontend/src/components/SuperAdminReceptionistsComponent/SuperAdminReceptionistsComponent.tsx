import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import SuperAdminReceptionistsTableComponent from "../SuperAdminReceptionistsTableComponent/SuperAdminReceptionistsTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const SuperAdminReceptionistsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">Receptionists LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <SuperAdminReceptionistsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default SuperAdminReceptionistsComponent;
