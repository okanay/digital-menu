"use client";

import { useEffect } from "react";
import { MenuEditor } from "./editor";
import { MenuError } from "./error";
import { MenuLoading } from "./loading";
import { MenuNotFound } from "./not-found";
import { useMenu } from "./use-menu";

type Props = {
  id: string;
  locale: string;
};

export default function MenuPage({ id, locale }: Props) {
  const { fetchMenu, menu, status } = useMenu();

  useEffect(() => {
    fetchMenu(id);
  }, [id]);

  const renderContent = () => {
    if (status.fetch === "loading") {
      return <MenuLoading />;
    }
    if (status.fetch === "error") {
      return <MenuError />;
    }
    if (status.fetch === "not-found" || !menu) {
      return <MenuNotFound id={id} />;
    }

    return (
      <MenuEditor menu={menu} locale={locale} updateStatus={status.update} />
    );
  };

  return renderContent();
}
