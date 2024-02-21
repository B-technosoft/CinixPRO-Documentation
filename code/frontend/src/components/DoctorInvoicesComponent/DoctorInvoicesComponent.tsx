import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import DoctorInvoicesTableComponent from "../DoctorInvoicesTableComponent/DoctorInvoicesTableComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const DoctorInvoicesComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">INVOICE LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <DoctorInvoicesTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default DoctorInvoicesComponent;
