import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { Input } from "../../../components/input/input.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const Login = () => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (emailRef.current?.value !== undefined && passwordRef.current?.value !== undefined) {
      setLoading(true);
      await signIn({ email: emailRef.current.value, password: passwordRef.current.value });
    }
  };

  return (
    <div className='flex flex-col items-center px-4 py-5 mt-16'>
      <AuthHeading title='CouponMe' subtitle='Login to' />
      <form
        className='w-full max-w-[400px] flex flex-col items-center mt-20'
        onSubmit={handleSubmit}
      >
        <Input ref={emailRef} name='email' type='email' placeholder='Email' required />
        <Input ref={passwordRef} name='password' type='password' placeholder='Password' required />
        <Link to='/forgot-password' className='font-displayRegular self-end mb-5'>
          Forgot password?
        </Link>
        <PrimaryButton type='submit' title={loading ? "Loading..." : "Login"} disabled={loading} />
      </form>
      <p className='mt-8 font-displayRegular text-base'>
        No account?{" "}
        <Link className='font-displayBold' to='/register'>
          Register here!
        </Link>
      </p>
    </div>
  );
};

