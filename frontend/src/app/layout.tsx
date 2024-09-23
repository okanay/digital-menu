import type { Metadata } from "next";
import "../assets/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Menu Arts - Free Menu Design",
    template: "%s | Menu Arts",
  },
  description: "Free menu design for your restaurant, cafe, or bar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
