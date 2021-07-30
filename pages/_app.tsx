import React, { useState, useEffect, useMemo } from "react";
import '../styles/globals.css';
import AuthContext from "../context/AuthContext";
import type { AppProps } from 'next/app';
import jwtDecode from "jwt-decode";
import { setToken, getToken, deleteToken } from "../api/token";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {

  const [auth, setAuth] = useState<any>(undefined);
  const [reloadUser, setReloadUser] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode<any>(token).uid
      })
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [])

  const login = (token: any) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode<any>(token).uid
    });
  };

  const logout = () => {
    if (auth) {
      deleteToken();
      setAuth(null);
      router.push("/");
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }), [auth]
  );

  if (auth === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )

}
export default MyApp
