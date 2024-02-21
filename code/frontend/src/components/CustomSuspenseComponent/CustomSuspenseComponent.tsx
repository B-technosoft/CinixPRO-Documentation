import { Suspense } from "react";
import LazyLoadingSpinnerComponent from "../../LazyLoadingSpinnerComponent/LazyLoadingSpinnerComponent";

const CustomSuspenseComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<LazyLoadingSpinnerComponent />}>{children}</Suspense>
  );
};

export default CustomSuspenseComponent;
