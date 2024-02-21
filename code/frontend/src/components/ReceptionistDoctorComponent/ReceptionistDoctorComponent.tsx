import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import ReceptionistDoctorTableComponent from "../ReceptionistDoctorTableComponent/ReceptionistDoctorTableComponent";
import TableCardLayoutComponent from "../TableCardLayoutComponent/TableCardLayoutComponent";

const ReceptionistDoctorComponent = () => {
  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">DOCTOR LIST</h1>
          <BreadcrumbComponent />
        </div>
        <TableCardLayoutComponent>
          <ReceptionistDoctorTableComponent />
        </TableCardLayoutComponent>
      </div>
    </LayoutComponent>
  );
};

export default ReceptionistDoctorComponent;
