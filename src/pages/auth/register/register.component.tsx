import { toast } from "react-toastify";
import { FormEvent, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import { Input } from "../../../components/input/input.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

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
      return toast.error("Passwords are not the same!");
    }

    await createUser({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
    }).catch((err) => {
      const message = err.message.replace("Firebase: ", "");
      toast.error(message);
    });
  };

  return (
    <div className='flex flex-col items-center px-4 py-5'>
      <FiArrowLeft onClick={() => navigate("/login")} size={"2rem"} className='self-start mb-10' />
      <AuthHeading title='CouponMe' subtitle='Register to' />
      <form className='w-full flex flex-col items-center mt-20' onSubmit={handleSubmit}>
        <Input ref={nameRef} name='name' type='text' placeholder='Name' required />
        <Input ref={emailRef} name='email' type='email' placeholder='Email' required />
        <Input ref={passwordRef} name='password' type='password' placeholder='Password' required />
        <Input
          ref={confirmPasswordRef}
          name='confirm-password'
          type='password'
          placeholder='Confirm password'
          required
        />
        <PrimaryButton type='submit' title='Register' />
      </form>
    </div>
  );
};
