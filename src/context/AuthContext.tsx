import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import auth from "../firebase";

interface IAuthContext {
  currentUser: User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
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
    <AuthContext.Provider value={{ currentUser, signup, setCurrentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
