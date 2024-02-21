import { useSearchParams } from 'react-router-dom';

import ResetPasswordFormComponent from '../ResetPasswordFormComponent/ResetPasswordFormComponent';
import PasswordChangeSuccessFullyComponent from '../PasswordChangeSuccessFullyComponent/PasswordChangeSuccessFullyComponent';
import { useCallback } from 'react';

const ResetPasswordComponent = () => {
  const [searchParams] = useSearchParams();

  const redirectURL = searchParams.get('redirectURL');
  const redirect = searchParams.get('redirect');

  const onClickLoginButton = useCallback(() => {
    window.open(redirectURL ?? '/', '_blank');
  }, [redirectURL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {!redirectURL && !redirect && <ResetPasswordFormComponent />}
        {redirectURL && redirect && <PasswordChangeSuccessFullyComponent onClickLoginButton={onClickLoginButton} />}
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
