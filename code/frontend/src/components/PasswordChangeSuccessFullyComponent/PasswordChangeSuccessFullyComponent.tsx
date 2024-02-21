import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const PasswordChangeSuccessFullyComponent = ({ onClickLoginButton }: any) => {
  return (
    <>
      <div className="flex justify-center">
        <FontAwesomeIcon
          icon={faCheck}
          className="mx-auto w-16 h-16 text-green-500 mb-4"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Password Changed</h2>
      <p className="text-gray-600 mb-6">
        Your password has been successfully changed. Would you like to log in?
      </p>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={onClickLoginButton}
      >
        Log In
      </button>
    </>
  );
};

export default memo(PasswordChangeSuccessFullyComponent);
