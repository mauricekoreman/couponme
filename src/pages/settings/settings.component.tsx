import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../context/user-context";
import { Input } from "../../components/input/input.component";
import { FiKey, FiLink, FiLogOut, FiTrash2 } from "react-icons/fi";
import { Navbar } from "../../components/navbars/navbar.component";
import { IPopup, Popup } from "../../components/popup/popup.component";
import { TextButton } from "../../components/buttons/text-button/text-button.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";
import { toast } from "react-toastify";

interface ITogglePopup {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Settings = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { userData, unlinkUser, updateUserData, updateLinkedUserData } = useUser();
  const nameRef = useRef<HTMLInputElement>(null);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupDetails, setPopupDetails] = useState<IPopup>({} as IPopup);
  const [loading, setLoading] = useState(false);

  function saveChanges() {
    if (!nameRef.current || !userData) return;

    if (nameRef.current.value !== userData.name) {
      setLoading(true);
      updateUserData({ name: nameRef.current.value })
        .then(() => {
          updateLinkedUserData({
            linkedId: userData.linked,
            newUserData: { linkedUserName: nameRef.current!.value },
          });
        })
        .then(() => {
          toast.success("Changes are saved!");
        })
        .finally(() => setLoading(false));
    }
  }

  function togglePopup({ title, onClick }: ITogglePopup) {
    setPopupOpen(true);
    setPopupDetails({ title, onClick, close: () => setPopupOpen(false) });
  }

  return (
    <>
      <div className='min-h-screen relative flex flex-col max-w-screen-xl mx-auto'>
        <Navbar navbarTitle='Settings' withBackButton />
        <div className='flex flex-col items-center px-4 pb-32'>
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
            onClick={() => togglePopup({ title: "Do you wish to logout?", onClick: signOut })}
          />
          <TextButton
            title={`Unlink with ${userData?.linkedUserName}`}
            icon={<FiLink size={"1.5rem"} />}
            subtext='After unlinking you will lose your coupons and need to link with someone else to use the app again'
            onClick={() =>
              togglePopup({
                title: "Are you sure you want to unlink?",
                onClick: unlinkUser,
              })
            }
          />
          <TextButton
            title='Delete account'
            icon={<FiTrash2 size={"1.5rem"} />}
            className='text-red'
            onClick={() => navigate("delete-user")}
          />
          <PrimaryButton
            className='absolute bottom-4 w-[calc(100%_-_2rem)]'
            title='Save changes'
            type='button'
            onClick={saveChanges}
          />
        </div>
      </div>
      {popupOpen ? (
        <Popup
          title={popupDetails.title}
          onClick={popupDetails.onClick}
          key={popupDetails.title}
          close={popupDetails.close}
        />
      ) : null}
    </>
  );
};























