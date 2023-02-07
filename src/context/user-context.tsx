import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "./auth-context";
import { db } from "../firebase/firebase.config";
import { deleteCoupons } from "../firebase/firebase.functions";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IUserContext {
  userData: DocumentData | undefined;
  userDataLoading: boolean;
  updateUserData: (data: DocumentData) => Promise<void>;
  linkUser: (code: string) => Promise<void>;
  updateLinkedUserData: ({
    linkedId,
    newUserData,
  }: {
    linkedId: string;
    newUserData: DocumentData;
  }) => Promise<void>;
  unlinkUser: () => Promise<void>;
  userDocRef: DocumentReference<DocumentData>;
}

const UserContext = createContext({} as IUserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);
  const [userDataLoading, setUserDataLoading] = useState<boolean>(true);

  // const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // define userDocref and tell typescript it cannot be null.
  let userDocRef!: DocumentReference<DocumentData>;
  if (user) userDocRef = doc(db, "users", user.uid);

  // get current user data and set the userData state with the respons
  async function getUserData() {
    const userSnap = await getDoc(userDocRef);
    setUserData(userSnap.data());
    setUserDataLoading(false);
  }

  // update the firestore user document with data passed through
  // then locally update the user state
  async function updateUserData(data: DocumentData) {
    return await updateDoc(userDocRef, data)
      .then(() => {
        setUserData((prevState) => ({
          ...prevState,
          ...data,
        }));
      })
      .catch((error) => {
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      });
  }

  // Link the currentUser to another user
  async function linkUser(code: string) {
    if (!userData || !user) return;

    try {
      // check users links himself
      if (code === userData.code) {
        throw new Error("Fill in the code of another user!");
      }

      // add email to emailUser.linked
      const linkedUserQuery = query(
        collection(db, "users"),
        where("code", "==", code),
        where("linked", "==", null)
      );

      const linkedUserSnap = await getDocs(linkedUserQuery);

      if (linkedUserSnap.size !== 1) {
        throw new Error("User does not exist");
      }

      // Get the id and reference
      const linkedUserId = linkedUserSnap.docs[0].id;
      const linkedUserName = linkedUserSnap.docs[0].data().name;
      const linkedUserDocRef = doc(db, "users", linkedUserId);

      // Update the document of the current user
      await updateUserData({ linked: linkedUserId, linkedUserName: linkedUserName });

      // Update the document of the linked user
      await updateDoc(linkedUserDocRef, {
        linked: user.uid,
        linkedUserName: userData.name,
      });
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  // update the data of a the linked user. (e.g. when the current user changes their name, it should also be updated in the linkedUser document)
  async function updateLinkedUserData({
    linkedId,
    newUserData,
  }: {
    linkedId: string;
    newUserData: DocumentData;
  }) {
    try {
      const linkedUserDocRef = doc(db, "users", linkedId);
      await updateDoc(linkedUserDocRef, newUserData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  // unlink two users.
  async function unlinkUser() {
    if (!user || !userData) return;
    try {
      // update the document of the current user
      await updateUserData({ linked: null, linkedUserName: null });

      // update the document of the linked user
      await updateLinkedUserData({
        linkedId: userData.linked,
        newUserData: { linked: null, linkedUserName: null },
      });

      // delete all coupons that were given and received by these users
      deleteCoupons({ userId: user.uid });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  useEffect(() => {
    if (user === undefined) setUserDataLoading(true); // user is still loading
    if (user === null) setUserDataLoading(false); // user is signed out

    // only get user data once the user is loaded
    if (!user) return;
    getUserData();
  }, [user]);

  const value = {
    userData,
    userDataLoading,
    updateUserData,
    linkUser,
    updateLinkedUserData,
    unlinkUser,
    userDocRef,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};






