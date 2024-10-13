"use client";

import { useEffect } from "react";
import { useMenu } from "./use-menu";
import { MenuLoading } from "./loading";
import { MenuError } from "./error";
import { MenuEditor } from "./editor";
import { MenuNotFound } from "./not-found";
import { useMenuEditor } from "@/components/(menu)/editor/use-menu-editor";

type Props = {
  id: string;
  locale: string;
};

export default function MenuPage({ id, locale }: Props) {
  const { fetchMenu, menu, status } = useMenu();
  const { setStatus } = useMenuEditor();

  useEffect(() => {
    fetchMenu(id);
    setStatus("loading");
  }, [id]);

  const renderContent = () => {
    if (status === "loading") {
      return <MenuLoading />;
    }
    if (status === "error") {
      return <MenuError />;
    }
    if (status === "not-found" || !menu) {
      return <MenuNotFound id={id} />;
    }
    if (status === "success" && menu) {
      return <MenuEditor menu={menu} locale={locale} />;
    }
  };

  return renderContent();
}
