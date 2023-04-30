import {
  User,
  deleteUser,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getAdditionalUserInfo,
  reauthenticateWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase.config";
import { generateRandom } from "../utils/generate-random";
import { deleteCoupons, saveMessagingTokenToDB } from "../firebase/firebase.functions";
import { deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

type TUser = User | null | undefined;

interface IAuthContext {
  user: TUser;
  userLoaded: boolean;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  reauthenticate: () => Promise<UserCredential | undefined>;
  deleteAccount: ({ linkedUserId }: { linkedUserId: string }) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser>(undefined);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    try {
      let provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const user = await signInWithPopup(auth, provider);
      if (getAdditionalUserInfo(user)?.isNewUser) {
        const token = localStorage.getItem("GCM-token");
        return await setDoc(doc(db, "users", user.user.uid), {
          email: user.user.email,
          name: user.user.displayName,
          linked: null,
          code: generateRandom(6),
          cloudMessaging: { token: token, timestamp: new Date() },
        });
      } else {
        return await saveMessagingTokenToDB(user.user.uid);
      }
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  function signOut() {
    return auth.signOut();
  }

  async function reauthenticate() {
    try {
      if (!auth.currentUser) {
        throw new Error("There is no user data...");
      }

      // const credential = GoogleAuthProvider.credential(email, password);
      const authenticated = await reauthenticateWithPopup(
        auth.currentUser,
        new GoogleAuthProvider()
      );

      return authenticated;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  async function deleteAccount({ linkedUserId }: { linkedUserId: string }) {
    try {
      if (!auth.currentUser || !user) {
        throw new Error("There is no user data...");
      }

      // delete the coupons the current user gave and received
      deleteCoupons({ userId: user.uid });

      // unlink user
      if (linkedUserId) {
        const linkedUserDocRef = doc(db, "users", linkedUserId);
        await updateDoc(linkedUserDocRef, { linked: null, linkedUserName: null });
      }

      // deleteDoc of user entry
      deleteDoc(doc(db, "users", user.uid));

      // delete user
      deleteUser(user);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  const value = {
    user,
    userLoaded,
    signInWithGoogle,
    signOut,
    reauthenticate,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
