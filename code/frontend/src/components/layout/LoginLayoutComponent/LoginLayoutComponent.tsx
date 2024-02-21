const LoginLayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col justify-center items-center grow bg-gray-200 min-h-full max-h-full h-full">
      <div className="w-[30rem] py-12 px-8 flex flex-col items-center bg-white gap-4">
        <h1 className="font-bold text-lg">Sign In</h1>
        {children}
      </div>
    </section>
  );
};

export default LoginLayoutComponent;
