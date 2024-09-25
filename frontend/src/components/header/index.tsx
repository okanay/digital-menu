import React from "react";
import Navbar from "./navbar";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-primary-50 px-8 py-4">
      <Link href="/">
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="Menu Arts Logo"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "12rem", height: "auto" }}
          priority
        />
      </Link>
      <Navbar />
    </header>
  );
};
