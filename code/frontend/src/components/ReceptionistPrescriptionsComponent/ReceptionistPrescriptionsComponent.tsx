import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import ReceptionistPrescriptionsTableComponent from "../ReceptionistPrescriptionsTableComponent/ReceptionistPrescriptionsTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const ReceptionistPrescriptionsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">PRESCRIPTION LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <ReceptionistPrescriptionsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default ReceptionistPrescriptionsComponent;
