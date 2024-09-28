import React from "react";
import { Account } from "./account";
import { MobileMenu } from "./mobile-menu";
import Navbar from "./navbar";

export const Header: React.FC = () => {
  return (
    <div className="absolute top-0 z-[99] w-full px-2 pb-4 pt-6">
      <header className="mx-auto flex max-w-7xl items-center justify-between font-custom-sans">
        <Navbar />
        <Account />
        <MobileMenu />
      </header>
    </div>
  );
};
