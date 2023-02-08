import { toast } from "react-toastify";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { Input } from "../../../components/input/input.component";
import { Navbar } from "../../../components/navbars/navbar.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const Register = () => {
  const { createUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !confirmPasswordRef.current?.value
    )
      return;

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setLoading(true);
      return toast.error("Passwords are not the same!");
    }

    await createUser({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
    });
  };

  return (
    <div className='flex flex-col px-4 py-5 max-w-screen-lg mx-auto'>
      <Navbar withBackButton withTitle={false} marginBottom={0} />

      <div className='flex flex-col items-center'>
        <AuthHeading title='CouponMe' subtitle='Register to' />
        <form className='w-full flex flex-col items-center mt-20' onSubmit={handleSubmit}>
          <Input ref={nameRef} name='name' type='text' placeholder='Name' required />
          <Input ref={emailRef} name='email' type='email' placeholder='Email' required />
          <Input
            ref={passwordRef}
            name='password'
            type='password'
            placeholder='Password'
            required
          />
          <Input
            ref={confirmPasswordRef}
            name='confirm-password'
            type='password'
            placeholder='Confirm password'
            required
          />
          <PrimaryButton
            type='submit'
            title={loading ? "Loading..." : "Register"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};



















