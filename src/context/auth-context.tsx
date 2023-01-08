import React, { createContext, useContext, useState } from "react";
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

interface ISignIn {
  email: string;
  password: string;
}

interface IRegister extends ISignIn {
  name: string;
}

interface IAuthContext {
  user: User | null;
  signIn: ({ email, password }: ISignIn) => Promise<void | UserCredential>;
  createUser: ({ email, password }: IRegister) => Promise<void | UserCredential>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // user is signed in
      setUser(user);
    } else {
      // user is signed out
      setUser(null);
    }
  });

  const signIn = async ({ email, password }: ISignIn) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode, errorMessage);
    });
  };

  const createUser = async ({ email, password, name }: IRegister) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await setDoc(doc(db, "users", user.user.uid), {
          email,
          name,
          linked: null,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
      });
  };

  const signOut = () => {
    return auth.signOut();
  };

  const resetPassword = ({ email }: { email: string }) => {
    return sendPasswordResetEmail(auth, email);
  };

  const changeEmail = ({ newEmail }: { newEmail: string }) => {
    if (user) {
      return updateEmail(user, newEmail);
    }
  };

  const value = {
    user,
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
