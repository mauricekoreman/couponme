import { FormEvent, useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/user-context";
import { Input } from "../../../components/input/input.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../../context/auth-context";
import { onSnapshot } from "firebase/firestore";
import { Navbar } from "../../../components/navbars/navbar.component";

export const LinkUser = () => {
  const { userData, linkUser, userDocRef, updateUserData } = useUser();
  const { signOut } = useAuth();
  const codeRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!codeRef.current) return;
    await linkUser(codeRef.current.value).finally(() => setLoading(false));
  }

  // create a subscription that listens to userData.linked firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.data()?.linked) {
        updateUserData(doc.data()!);
      }
    });

    return unsubscribe;
  }, []);

  return (
    // <div className='flex flex-col items-center align-middle pt-10 mx-4 relative h-screen'>
    <div className='min-h-screen relative flex flex-col max-w-screen-xl mx-auto'>
      <Navbar backButtonFunction={signOut} withBackButton withTitle={false} />
      <AuthHeading title='Link with a user' titleClass='text-4xl text-center' />
      <main className='mx-4'>
        <p className='font-regularMedium text-center mt-3 mb-7'>
          Fill in the code of your partner to link! Only one person has to submit a code
        </p>

        <p className='font-displayRegular text-2xl text-center mb-10'>
          Code: {userData && userData.code}
        </p>
        <form
          onSubmit={handleSubmit}
          className='w-full h-full flex flex-col items-center justify-between'
        >
          <Input ref={codeRef} name='code' type='number' placeholder='Code' />
          <PrimaryButton
            disabled={loading}
            title={loading ? "Loading..." : "Submit code"}
            type='submit'
          />
        </form>
      </main>
    </div>
  );
};
