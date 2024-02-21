import { useState } from "react";
import { usePatientSignUpForPatientMutation } from "../../redux/api/patient/patient-auth/patient-auth";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { toast } from "react-toastify";
import LoginLayoutComponent from "../layout/LoginLayoutComponent/LoginLayoutComponent";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setPatientAuthData } from "../../redux/features/patient_auth_slice/patient_auth_slice";

const ParientSignupComponent = () => {
  const [loading, setLoading] = useState(false);

  const [signUp] = usePatientSignUpForPatientMutation({});

  const { control, handleSubmit } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const fetchData = await signUp({ ...data });

    console.log(fetchData);

    if ("data" in fetchData) {
      setLoading(true);
      dispatch(setPatientAuthData(fetchData.data as any));

      navigate(`/${Role.Patient}/`, {
        replace: true,
      });
    }

    if ("error" in fetchData) {
      setLoading(false);

      toast.error("Invalid credentials");
    }
  };

  return (
    <LoginLayoutComponent>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter First Name"
                  className="input input-bordered w-full"
                />
              )}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter Last Name"
                  className="input input-bordered w-full"
                />
              )}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Contact</span>
            </label>
            <Controller
              name="contact"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter Contact"
                  className="input input-bordered w-full"
                />
              )}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
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
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
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
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Enter Confirm Password"
                  className="input input-bordered w-full"
                />
              )}
            />
          </div>
        </div>
        {!loading && (
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        )}
        {loading && (
          <button className="btn w-full" disabled>
            <span className="loading loading-spinner "></span>
            loading
          </button>
        )}
        <div className="flex justify-center gap-1">
          Already have an account
          <span>
            <Link to={`/${Role.Patient}/login`} className="underline">
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </LoginLayoutComponent>
  );
};

export default ParientSignupComponent;
