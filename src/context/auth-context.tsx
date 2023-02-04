import React, { createContext, useContext, useEffect, useState } from "react";
import {
  EmailAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { generateRandom } from "../utils/generate-random";
import { toast } from "react-toastify";

interface ISignIn {
  email: string;
  password: string;
}

interface IRegister extends ISignIn {
  name: string;
}

type TUser = User | null | undefined;

interface IAuthContext {
  user: TUser;
  userLoaded: boolean;
  signIn: ({ email, password }: ISignIn) => Promise<void | UserCredential>;
  createUser: ({ email, password }: IRegister) => Promise<void | UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: ({ email }: { email: string }) => Promise<void>;
  updatePasswordFn: ({ newPassword }: { newPassword: string }) => Promise<void>;
  reauthenticate: ({
    email,
    password,
  }: {
    [key: string]: string;
  }) => Promise<UserCredential | undefined>;
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

  async function signIn({ email, password }: ISignIn) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message.replace("Firebase: ", "");
        toast.error(message);
      }
    }
  }

  async function createUser({ email, password, name }: IRegister) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return await setDoc(doc(db, "users", user.user.uid), {
        email,
        name,
        linked: null,
        code: generateRandom(6),
      });
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

  async function resetPassword({ email }: { email: string }) {
    await sendPasswordResetEmail(auth, email)
      .then(() => toast.success(`A password reset email has been sent to ${email}!`))
      .catch((error) => {
        toast.error(error.message);
      });
  }

  async function updatePasswordFn({ newPassword }: { newPassword: string }) {
    try {
      if (!auth.currentUser) {
        throw new Error("There is no user data...");
      }

      const message = await updatePassword(auth.currentUser, newPassword);
      return message;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  }

  async function reauthenticate({ email, password }: { [key: string]: string }) {
    try {
      if (!auth.currentUser) {
        throw new Error("There is no user data...");
      }

      const credential = EmailAuthProvider.credential(email, password);
      const authenticated = await reauthenticateWithCredential(auth.currentUser, credential);

      return authenticated;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  }

  const value = {
    user,
    userLoaded,
    signIn,
    createUser,
    signOut,
    resetPassword,
    updatePasswordFn,
    reauthenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};




