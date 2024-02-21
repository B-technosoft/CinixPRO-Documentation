import LoadingSpinnerComponent from '../LoadingSpinnerComponent/LoadingSpinnerComponent';
import { TableInterfaceComponent } from './TableInterfaceComponent';

const TableComponent = ({ theads, tbodys, isLoading }: TableInterfaceComponent) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {theads}
        {tbodys}
      </table>
      {isLoading && (
        <div className="flex items-center justify-center my-6">
          <LoadingSpinnerComponent />
        </div>
      )}
    </div>
  );
};

export default TableComponent;
