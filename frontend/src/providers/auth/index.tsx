"use client";

import { LogoutRequest } from "@/utils/logout-request";
import { createContext, PropsWithChildren, useState } from "react";

export type SessionType = "authorize" | "unauthorize";

export const AuthContext = createContext<{
  user: User | null;
  session: SessionType;
  signIn: (user: User) => void;
  signOut: () => void;
} | null>(null);

interface Props extends PropsWithChildren {
  user: User | null;
  session: SessionType;
}

export function AuthProvider(props: Props) {
  const [user, setUser] = useState<User | null>(props.user);
  const [session, setSession] = useState<SessionType>(props.session);

  const signIn = (user: User) => {
    setUser(user);
    setSession("authorize");
  };

  const signOut = () => {
    setUser(null);
    setSession("unauthorize");
    LogoutRequest();
  };

  const value = {
    user,
    session,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
