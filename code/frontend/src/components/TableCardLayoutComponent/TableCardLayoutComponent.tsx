import { TableCardLayoutComponentInterface } from './TableCardLayoutComponentInterface';

const TableCardLayoutComponent = ({ children }: TableCardLayoutComponentInterface) => {
  return <div className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6">{children}</div>;
};

export default TableCardLayoutComponent;
