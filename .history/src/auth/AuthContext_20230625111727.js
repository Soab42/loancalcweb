import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../Firebase";
import { app, auth } from "../Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password);
  }
  //login with google
  const provider = new GoogleAuthProvider();

  function googlelogin() {
    signInWithPopup(auth, provider)
      .then(() => {
        const user = auth.currentUser;
        setCurrentUser({
          ...user,
        });
      })
      .catch((error) => console.log(error));
  }
  // logout function
  function logout() {
    const auth = getAuth(app);
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    googlelogin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
