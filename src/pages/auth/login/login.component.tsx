import { useState } from "react";
import icon from "../../../assets/adaptive-icon.png";
import { useAuth } from "../../../context/auth-context";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";

export const Login = () => {
  const { signInWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);
    signInWithGoogle().finally(() => setLoading(false));
  }

  return (
    <div className='flex flex-col gap-20 items-center px-4 py-6 mt-[20vh]'>
      <AuthHeading title='CouponMe' subtitle='Login to' />
      <PrimaryButton
        disabled={loading}
        title={loading ? "Loading..." : "Sign in with Google"}
        onClick={handleSignIn}
      />
    </div>
  );
};

