import { LayoutComponentInterface } from './LayoutComponentInterface';

const LayoutComponent = ({ children }: LayoutComponentInterface) => {
  return <section className="flex flex-col gap-7 mt-28 mx-auto grow w-[98rem] p-8">{children}</section>;
};

export default LayoutComponent;
