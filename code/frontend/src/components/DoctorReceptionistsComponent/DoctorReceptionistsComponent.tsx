import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import DoctorReceptionistsTableComponent from "../DoctorReceptionistsTableComponent/DoctorReceptionistsTableComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const DoctorReceptionistsComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">RECEPTIONIST LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <DoctorReceptionistsTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default DoctorReceptionistsComponent;
