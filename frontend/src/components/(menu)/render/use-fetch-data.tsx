import { useMenu } from "@/components/(dashboard)/menus/[id]/use-menu";
import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect, useCallback } from "react";
import { useMenuDisplay } from "./use-menu-display";

export const useFetchData = (id: string, locale: string) => {
  // prettier-ignore
  const { setInitialMenu, menu: displayMenu, status: displayStatus} = useMenuDisplay();
  const { fetchMenu, menu, status: menuStatus } = useMenu();
  const [status, setStatus] = useState<StatusTypes>("loading");
  const setLanguages = useLanguage();

  const fetchData = useCallback(() => {
    fetchMenu(id);
  }, [id, fetchMenu]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (menu) {
      setInitialMenu(menu.json);
    }
  }, [menu, setInitialMenu]);

  useEffect(() => {
    if (
      displayMenu &&
      !displayMenu.language.active.includes(locale as Languages) &&
      displayStatus.initial === "success"
    ) {
      setLanguages(displayMenu.language.active[0]);
    }
  }, [displayMenu, locale, displayStatus.initial, setLanguages]);

  useEffect(() => {
    if (menuStatus.fetch === "loading" || displayStatus.initial === "loading") {
      setStatus("loading");
    } else if (menuStatus.fetch === "error") {
      setStatus("error");
    } else if (menuStatus.fetch === "not-found" || !menu) {
      setStatus("not-found");
    } else {
      setStatus("success");
    }
  }, [menuStatus.fetch, displayStatus.initial, menu]);

  return { status, menu: displayMenu };
};
