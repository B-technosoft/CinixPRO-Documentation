import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import PatientInvoicesTableComponent from "../PatientInvoicesTableComponent/PatientInvoicesTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const PatientInvoicesComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">INVOICE LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <PatientInvoicesTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default PatientInvoicesComponent;
