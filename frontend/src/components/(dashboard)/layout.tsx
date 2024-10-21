"use client";

import {
  House,
  Store,
  ChefHat,
  HelpCircle,
  LogOut,
  ChartPie,
  User,
  Menu,
  X,
} from "lucide-react";
import { usePathname, Link } from "@/i18n/routing";
import { useState } from "react";
import { BrandLogo } from "../ui/brand-logo";
import { useAuth } from "@/hooks/use-auth";

// Types
type NavRoute = {
  href: string;
  label: string;
  icon: React.ElementType;
};

type SidebarLinkProps = {
  route: NavRoute;
  isActive: boolean;
};

type Props = {
  children: React.ReactNode;
};

// Constants
const routes: NavRoute[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: House,
  },
  {
    href: "/shops",
    label: "Shops",
    icon: Store,
  },
  {
    href: "/menus",
    label: "Menus",
    icon: ChefHat,
  },
  {
    href: "/statistics",
    label: "Statistics",
    icon: ChartPie,
  },
  {
    href: "/account",
    label: "Account",
    icon: User,
  },
  {
    href: "/help",
    label: "Help",
    icon: HelpCircle,
  },
];

// Components
const SidebarLink = ({ route, isActive }: SidebarLinkProps) => {
  const Icon = route.icon;

  return (
    <Link
      href={route.href}
      className={`group flex h-[44px] w-full items-center rounded-xl px-4 font-custom-sans text-sm font-semibold text-font transition-all duration-200 active:scale-95 ${
        isActive
          ? "bg-primary-500/90 text-primary-50"
          : "text-font-secondary hover:bg-primary-100 dark:hover:bg-primary-950 dark:hover:text-primary-50"
      }`}
    >
      <Icon className={`mr-3 size-5 ${isActive ? "" : ""}`} />
      <span className="duration-0">{route.label}</span>
    </Link>
  );
};

const UserSection = () => {
  const auth = useAuth();
  return (
    <div className="w-full border-t border-corner/10 px-4 py-4">
      <div className="flex items-center justify-between rounded-xl bg-primary-100 px-4 py-2 dark:bg-primary-950">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary-500/80 dark:bg-primary-800/80">
            <User className="size-4 text-primary-50 dark:text-primary-50" />
          </div>
          <span className="max-w-[108px] truncate text-xs text-gray-700 dark:text-primary-50">
            {auth.user?.email}
          </span>
        </div>
        <button
          onClick={() => auth.signOut()}
          className="group/button rounded-lg p-2 hover:bg-primary-50 dark:hover:bg-primary-800/80"
        >
          <LogOut className="size-5 text-primary-500/80 dark:text-primary-50" />
          <span className="sr-only">Sign out of your account</span>
        </button>
      </div>
    </div>
  );
};

const MobileMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="fixed right-4 top-4 z-50 rounded-xl bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 lg:hidden"
  >
    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
  </button>
);

// Main Layout Component
export const ProfileLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white bg-gradient-to-t from-fill dark:to-black">
      <div className="flex items-end justify-between p-4 lg:p-0">
        <BrandLogo className="lg:hidden" />
        <MobileMenuButton
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 transform overflow-y-auto border-r border-corner/10 bg-white bg-gradient-to-t from-fill transition-transform duration-300 ease-in-out dark:to-black ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col pt-0 lg:pt-5">
          <div className="hidden items-center justify-center lg:flex">
            <BrandLogo />
          </div>

          <nav className="flex-1 space-y-2 border-t border-corner/10 pl-4 pr-8 pt-2.5 lg:mt-2.5">
            {routes.map((route) => (
              <SidebarLink
                key={route.href}
                route={route}
                isActive={pathname.includes(route.href)}
              />
            ))}
          </nav>

          <UserSection />
        </div>
      </aside>

      <div className="lg:ml-72">
        <main className="mx-auto min-h-screen max-w-[calc(1280px-288px)] px-4 transition-all duration-300 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
};
