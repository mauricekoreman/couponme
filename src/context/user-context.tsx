import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { useAuth } from "./auth-context";

interface IUserContext {
  userData: DocumentData | undefined;
  userDataLoading: boolean;
  updateUserData: (data: DocumentData) => Promise<void>;
  updateLinkedUserData: (data: DocumentData) => Promise<void>;
  linkUser: (code: string) => Promise<void>;
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
    await updateDoc(userDocRef, data)
      .then(() => {
        setUserData((prevState) => ({
          ...prevState,
          ...data,
        }));
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Link the currentUser to another user
  async function linkUser(code: string) {
    if (!userData || !user) return;

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
  }

  // update the data of a the linked user. (e.g. when the current user changes their name, it should also be updated in the linkedUser document)
  async function updateLinkedUserData(data: DocumentData) {
    if (!userData) return;

    const linkedUserDocRef = doc(db, "users", userData.linked);

    // update the document of the linked user
    await updateDoc(linkedUserDocRef, data);
  }

  // unlink two users.
  async function unlinkUser() {
    // update the document of the current user
    await updateUserData({ linked: null, linkedUserName: null });

    // update the document of the linked user
    await updateLinkedUserData({ linked: null, linkedUserName: null });

    // TODO NOTE
    // delete all coupons that were given and received by these users
    // await deleteUserCoupons();
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
    updateLinkedUserData,
    linkUser,
    unlinkUser,
    userDocRef,
    // couponsReceived: query(
    //   collection(db, "coupons"),
    //   where("to", "==", user.uid),
    //   orderBy("createdAt", "desc")
    // ),
    // couponsGivenRef: query(
    //   collection(db, "coupons"),
    //   where("from", "==", user.uid),
    //   orderBy("createdAt", "desc")
    // ),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
