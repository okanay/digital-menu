import InitialMenuDesignData from "@/constants/dummy-data";
import { useEffect } from "react";
import { useMenuEditor } from "../use-menu-editor";

export const LoadDataWrapper = ({ locale }: { locale: string }) => {
  const { setStatus, setMenu } = useMenuEditor();

  useEffect(() => {
    let data: Menu = {} as Menu;
    const store = localStorage.getItem("menu");
    if (store) {
      data = JSON.parse(store);
    } else {
      data = InitialMenuDesignData;
    }

    const isLocaleExist = data.language.active.includes(locale as Languages);
    const language = isLocaleExist ? locale : data.language.active[0];

    setMenu({
      ...data,
      language: {
        ...data.language,
        current: language as Languages,
      },
    });
    setStatus("success");
  }, []);

  return <></>;
};
