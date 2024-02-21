import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginFormInterface } from "./interface";
import LoadingSpinnerComponent from "../../LoadingSpinnerComponent/LoadingSpinnerComponent";

const LoginFormComponent = ({
  onSubmit,
  loading,
  role,
  signUp = false,
  email,
  password,
}: LoginFormInterface) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email ?? "",
      password: password ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="form-control w-full">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
            />
          )}
        />
        {errors.email && (
          <span className="label-text-alt text-red-500">Required</span>
        )}
      </div>
      <div className="form-control w-full">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
            />
          )}
        />
        {errors.password && (
          <span className="label-text-alt text-red-500">Required</span>
        )}
      </div>
      {!loading && (
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      )}
      {loading && (
        <button className="btn w-full" disabled>
          <LoadingSpinnerComponent />
          loading
        </button>
      )}
      {signUp && (
        <div className="flex justify-center gap-1">
          Don&apos;t have an account?
          <span>
            <Link to={`/${role}/sign-up`} className="underline">
              Sign Up
            </Link>
          </span>
        </div>
      )}
    </form>
  );
};

export default LoginFormComponent;
