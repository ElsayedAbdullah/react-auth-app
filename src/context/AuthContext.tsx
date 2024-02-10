import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import auth from "../firebase";

interface IAuthContext {
  currentUser: User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
  logout: () => Promise<void> | undefined;
  resetPassword: (email: string) => Promise<void> | undefined;
  setCurrentUser: (user: User) => void;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // signup function
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login function
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout function
  const logout = () => {
    return signOut(auth);
  };

  // reset password
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // to track user when changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        setCurrentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
