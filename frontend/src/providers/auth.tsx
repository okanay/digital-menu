"use client";

import { LogoutRequest } from "@/utils/logout-request";
import { createContext, PropsWithChildren, useState } from "react";

export type SessionType = "loading" | "authorize" | "unauthorize";

export const AuthContext = createContext<{
  user: User | null;
  session: SessionType;
  setUser: (user: User | null) => void;
  setSession: (session: SessionType) => void;
  signIn: (user: User) => void;
  signOut: () => void;
} | null>(null);


export function AuthProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<SessionType>("loading");

  const signIn = (user: User) => {
    setUser(user);
    setSession("authorize");
  };

  const signOut = () => {
    setUser(null);
    setSession("unauthorize");
    LogoutRequest().then(() => console.log("[AUTH] Credentials deleted"));
  };

  const value = {
    user,
    session,
    setUser,
    setSession,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
