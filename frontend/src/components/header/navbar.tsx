"use client";
import LoginRequest from "@/utils/login-request";
import { useAuth } from "@/hooks/use-auth";

const Navbar: React.FC = () => {
  const auth = useAuth();

  const handleSignIn = async () => {
    await LoginRequest(auth, {
      email: "okanay@hotmail.com",
      password: "admin1234",
    });
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {auth.session === "loading" && <div>Loading...</div>}

        {auth.session === "authorize" && (
          <button onClick={auth.signOut}>Sign Out</button>
        )}

        {auth.session === "unauthorize" && (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
