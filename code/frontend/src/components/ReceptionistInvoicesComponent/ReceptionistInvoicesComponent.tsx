import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import ReceptionistInvoicesTableComponent from "../ReceptionistInvoicesTableComponent/ReceptionistInvoicesTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const ReceptionistInvoicesComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">INVOICE LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <ReceptionistInvoicesTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default ReceptionistInvoicesComponent;
