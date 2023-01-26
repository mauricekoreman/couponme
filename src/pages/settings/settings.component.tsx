import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../context/user-context";
import { Input } from "../../components/input/input.component";
import { FiKey, FiLink, FiLogOut, FiTrash2 } from "react-icons/fi";
import { Navbar } from "../../components/navbars/navbar.component";
import { IPopup, Popup } from "../../components/popup/popup.component";
import { TextButton } from "../../components/buttons/text-button/text-button.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";

export const Settings = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const { signOut, user, resetPassword } = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const [popupDetails, setPopupDetails] = useState<IPopup>({} as IPopup);

  function saveChanges() {}

  return (
    <div className='px-4 pb-32 min-h-screen relative flex flex-col items-center'>
      <Navbar navbarTitle='Settings' withBackButton />
      <Input
        ref={nameRef}
        label='Name'
        name='name'
        placeholder='Name'
        defaultValue={userData?.name}
        type='text'
      />
      <Input
        label='Email'
        name='email'
        placeholder='Email'
        defaultValue={user?.email!}
        disabled
        type='email'
      />
      <TextButton
        title='Change password'
        icon={<FiKey size={"1.5rem"} />}
        className={"mb-4 mt-10"}
        onClick={() => navigate("change-password")}
      />
      <TextButton
        title='Logout'
        icon={<FiLogOut size={"1.5rem"} />}
        className={"mb-4"}
        withNavigateButton={false}
        onClick={() =>
          setPopupDetails({ title: "Do you wish to logout?", onClick: signOut, open: true })
        }
      />
      <TextButton
        title={`Unlink with ${userData?.linkedUserName}`}
        icon={<FiLink size={"1.5rem"} />}
        subtext='After unlinking you will lose your coupons and need to link with someone else to use the app again'
        onClick={() =>
          setPopupDetails({
            title: "Are you sure you want to unlink?",
            onClick: signOut,
            open: true,
          })
        }
      />
      <TextButton title='Delete account' icon={<FiTrash2 size={"1.5rem"} />} className='text-red' />
      <PrimaryButton
        className='absolute bottom-4 w-[calc(100%_-_2rem)]'
        title='Save changes'
        type='button'
        onClick={saveChanges}
      />
      <Popup title={popupDetails.title} onClick={popupDetails.onClick} open={popupDetails.open} />
    </div>
  );
};
