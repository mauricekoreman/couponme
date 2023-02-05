import { useEffect, useRef } from "react";
import { useUser } from "../../../context/user-context";
import { Input } from "../../../components/input/input.component";
import { AuthHeading } from "../../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../../context/auth-context";
import { onSnapshot } from "firebase/firestore";

export const LinkUser = () => {
  const { userData, linkUser, userDocRef, updateUserData } = useUser();
  const { signOut } = useAuth();
  const codeRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!codeRef.current) return;
    await linkUser(codeRef.current.value);
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
    <div className='flex flex-col align-middle pt-10 mx-4 relative h-screen'>
      <FiArrowLeft onClick={signOut} size={"2rem"} className='self-start mb-10' />
      <AuthHeading title='Link with a user' titleClass='text-4xl text-center' />
      <p className='font-regularMedium text-center mt-3 mb-7'>
        Fill in the code of your partner to link! Only one person has to submit a code
      </p>

      <p className='font-displayRegular text-2xl text-center mb-10'>
        Code: {userData && userData.code}
      </p>
      <Input ref={codeRef} name='code' type='number' placeholder='Code' />
      <PrimaryButton
        title='Submit code'
        className='absolute bottom-5 left-0'
        onClick={handleSubmit}
      />
    </div>
  );
};
