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

    reauthenticate({
      email: emailRef.current.value,
      password: currentPasswordRef.current.value,
    }).then(() => console.log("still here!"));

    // .then(() =>
    //   updatePasswordFn({ newPassword: newPasswordRef.current!.value }).then(() => {
    //     toast.success("Your password has been updated!");
    //     setLoading(false);
    //   })
    // )
  }

  return (
    <div className='min-h-screen px-4'>
      <Navbar navbarTitle='Credentials' withBackButton />
      <form onSubmit={changePassword}>
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
          title={loading ? "Loading..." : "Confirm"}
          disabled={loading}
          type='submit'
        />
      </form>
    </div>
  );
};
