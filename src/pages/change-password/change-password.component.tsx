import { toast } from "react-toastify";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { Input } from "../../components/input/input.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";

export const ChangePassword = () => {
  const { reauthenticate, updatePasswordFn } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  async function changePassword(e: FormEvent) {
    e.preventDefault();

    if (
      !emailRef.current?.value ||
      !currentPasswordRef.current?.value ||
      !newPasswordRef.current?.value
    ) {
      toast.error("Fill in all fields");
      return;
    }

    setLoading(true);

    reauthenticate({
      email: emailRef.current.value,
      password: currentPasswordRef.current.value,
    })
      .then(async (userCredential) => {
        if (userCredential) {
          await updatePasswordFn({ newPassword: newPasswordRef.current!.value }).then(() => {
            toast.success("Your password has been updated!");
          });
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className='min-h-screen max-w-screen-xl mx-auto'>
      <Navbar navbarTitle='Change password' withBackButton />
      <form onSubmit={changePassword} className='grid place-items-center px-4'>
        <Input ref={emailRef} label='Email' name='email' placeholder='Email' type='email' />
        <Input
          ref={currentPasswordRef}
          label='Current password'
          name='current_password'
          placeholder='Current password'
          type='password'
        />
        <Input
          ref={newPasswordRef}
          label='New password'
          name='new_password'
          placeholder='New password'
          type='password'
        />

        <PrimaryButton
          className='absolute bottom-4 w-[calc(100%_-_2rem)]'
          title={loading ? "Loading..." : "Change password"}
          disabled={loading}
          type='submit'
        />
      </form>
    </div>
  );
};






