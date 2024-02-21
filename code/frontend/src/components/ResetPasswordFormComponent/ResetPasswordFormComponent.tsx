import { Controller, useForm } from "react-hook-form";
import { FormData, ResetPasswordFormComponentProps } from "./interface";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { resetSchema } from "../../validations/validations";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/reset-password/reset-password";

const ResetPasswordFormComponent = ({}: ResetPasswordFormComponentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(resetSchema),
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const key = searchParams.get("key");

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data: FormData) => {
    try {
      if (!key) {
        return;
      }

      const fetchData = await resetPassword({ ...data, key });

      if ("data" in fetchData) {
        toast.success(fetchData.data.message);

        const param = {
          redirect: fetchData.data.role,
          redirectURL: `${import.meta.env.VITE_REACT_ENDPOINT}/${
            fetchData.data.role
          }/login`,
        };

        setSearchParams(param);

        reset();
      }
    } catch (error: any) {
      if (error?.response?.data?.statusCode === 401) {
        toast.error(error?.response?.data?.message);

        return;
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      {key && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="Enter New Password"
                    className="input input-bordered w-full max-w-xs"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="Enter Confirm Password"
                    className="input input-bordered w-full max-w-xs"
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`
                  w-full py-2 px-4 bg-blue-500 text-white rounded-md hover-bg-blue-600 focus:outline-none focus-ring focus-bg-blue-600
                  ${
                    password !== confirmPassword
                      ? "bg-gray-300 btn-disabled"
                      : ""
                  }
                  `}
          >
            Reset Password
          </button>
        </form>
      )}
    </>
  );
};

export default ResetPasswordFormComponent;
