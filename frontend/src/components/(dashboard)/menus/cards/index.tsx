"use client";
import { useEffect, useMemo } from "react";
import { useMenus } from "../use-menus";
import { MenuCard } from "./card";
import { MenusNotFound } from "./not-found";
import { MenusError } from "./error";
import { MenusLoading } from "./loading";
import { useSearchParams } from "next/navigation";

type Props = {
  locale: string;
};

export default function MenusCards({}: Props) {
  const { fetchMenus, menus, status } = useMenus();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const filteredMenus = useMemo(() => {
    if (!id) return menus;
    return menus.filter((menu) => menu.shopUniqueId === id);
  }, [menus, id]);

  const renderContent = () => {
    if (status === "loading") {
      return <MenusLoading />;
    }
    if (status === "error") {
      return <MenusError />;
    }
    if (menus.length === 0) {
      return <MenusNotFound />;
    }
    if (filteredMenus.length === 0 && id) {
      return <MenusNotFound />;
    }
    return (
      <>
        {filteredMenus.map((menu) => (
          <MenuCard key={menu.uniqueId} menu={menu} />
        ))}
      </>
    );
  };

  return <div className="mt-8 space-y-4">{renderContent()}</div>;
}
