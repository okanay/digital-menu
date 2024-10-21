import { AuthContext } from "@/providers/auth";
import { useContext } from "react";

declare global {
  type Auth = ReturnType<typeof useAuth>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("[ERROR] useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAuth = () => {
  const auth = useAuthContext();
  if (auth === null) {
    throw new Error(
      "[ERROR] Auth context is null. Make sure you're using AuthProvider correctly.",
    );
  }
  return auth;
};
