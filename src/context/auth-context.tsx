import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
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
  resetPassword: (email: string) => Promise<void>;
  changeEmail: (newEmail: string) => Promise<void> | undefined;
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
      return signInWithEmailAndPassword(auth, email, password);
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

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(newEmail: string) {
    if (user) {
      return updateEmail(user, newEmail);
    }
  }

  const value = {
    user,
    userLoaded,
    signIn,
    createUser,
    signOut,
    resetPassword,
    changeEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};




