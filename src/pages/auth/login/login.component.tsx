import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FormEvent, useRef } from "react";
import { useAuth } from "../../../context/auth-context";
import { Input } from "../../../components/input/input.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const Login = () => {
  const { signIn } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (emailRef.current?.value !== undefined && passwordRef.current?.value !== undefined) {
      await signIn({ email: emailRef.current.value, password: passwordRef.current.value });
    }
  };

  return (
    <div className='flex flex-col items-center px-4 py-5 mt-16'>
      <AuthHeading title='CouponMe' subtitle='Login to' />
      <form className='w-full flex flex-col items-center mt-20' onSubmit={handleSubmit}>
        <Input ref={emailRef} name='email' type='email' placeholder='Email' required />
        <Input ref={passwordRef} name='password' type='password' placeholder='Password' required />
        <PrimaryButton type='submit' title='Login' />
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

