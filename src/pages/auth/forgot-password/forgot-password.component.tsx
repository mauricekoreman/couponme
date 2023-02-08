import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { Input } from "../../../components/input/input.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";
import { Navbar } from "../../../components/navbars/navbar.component";

export const ForgotPassword = () => {
  const { passwordResetEmail } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function sendResetEmail(e: FormEvent) {
    e.preventDefault();

    if (emailRef.current?.value) {
      setLoading(true);
      await passwordResetEmail({ userEmail: emailRef.current.value }).finally(() =>
        setLoading(false)
      );
    }
  }

  return (
    <div className='flex flex-col px-4 max-w-screen-lg mx-auto'>
      <Navbar withBackButton withTitle={false} />
      <form onSubmit={sendResetEmail} className='flex flex-col items-center'>
        <Input ref={emailRef} type='email' name='email' placeholder='Email' required />
        <PrimaryButton
          type='submit'
          title={loading ? "Loading..." : "Send reset email"}
          disabled={loading}
        />
      </form>
    </div>
  );
};
