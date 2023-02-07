import { toast } from "react-toastify";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../context/user-context";
import { Input } from "../../components/input/input.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";

export const DeleteUser = () => {
  const { reauthenticate, deleteAccount } = useAuth();
  const { userData } = useUser();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      toast.error("Fill in all fields");
      return;
    }

    setLoading(true);

    reauthenticate({ email: emailRef.current.value, password: passwordRef.current.value })
      .then(async (userCredential) => {
        if (userCredential) {
          await deleteAccount({
            linkedUserId: userData!.linked,
          });
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className='min-h-screen max-w-screen-xl mx-auto'>
      <Navbar navbarTitle='Delete account' withBackButton />
      <form onSubmit={submit} className='px-4 grid place-items-center'>
        <Input ref={emailRef} label='Email' name='email' placeholder='Email' type='email' />
        <Input
          ref={passwordRef}
          label='Current password'
          name='current_password'
          placeholder='Current password'
          type='password'
        />

        <PrimaryButton
          className='absolute bottom-4 w-[calc(100%_-_2rem)]'
          title={loading ? "Loading..." : "Delete account"}
          disabled={loading}
          type='submit'
        />
      </form>
    </div>
  );
};





