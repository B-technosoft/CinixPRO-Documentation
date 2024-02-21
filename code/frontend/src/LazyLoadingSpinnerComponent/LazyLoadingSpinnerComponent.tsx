const LazyLoadingSpinnerComponent = () => {
  return (
    <div className="flex flex-col gap-7 mx-auto grow w-[98rem] p-8 h-full justify-center items-center">
      <span className="loading loading-ring w-[3.5rem]"></span>
    </div>
  );
};

export default LazyLoadingSpinnerComponent;
