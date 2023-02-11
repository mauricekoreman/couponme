import { useState } from "react";
import icon from "../../../assets/adaptive-icon.png";
import { useAuth } from "../../../context/auth-context";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const Login = () => {
  const { signInWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);
    signInWithGoogle().finally(() => setLoading(false));
  }

  return (
    <div className='flex flex-col gap-20 items-center px-4 py-5 mt-[20vh]'>
      <img src={icon} className='w-52 h-auto' />
      <PrimaryButton
        disabled={loading}
        title={loading ? "Loading..." : "Sign in with Google"}
        onClick={handleSignIn}
      />
    </div>
  );
};
