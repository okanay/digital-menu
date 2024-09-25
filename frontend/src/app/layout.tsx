import { Providers } from "@/providers";
import { CheckUserIsLoggedIn } from "@/components/check-user-is-logged-in";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Menu Arts - Free Menu Design",
    template: "%s | Menu Arts",
  },
  description: "Free menu design for your restaurant, cafe, or bar.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {props.children}
          <CheckUserIsLoggedIn />
        </Providers>
      </body>
    </html>
  );
}
