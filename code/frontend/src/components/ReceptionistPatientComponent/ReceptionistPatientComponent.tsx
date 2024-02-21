import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import ReceptionistPatientTableComponent from "../ReceptionistPatientTableComponent/ReceptionistPatientTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const ReceptionistPatientComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">PATIENT LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <ReceptionistPatientTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default ReceptionistPatientComponent;
