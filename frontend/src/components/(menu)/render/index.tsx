"use client";

import { RenderDisplayContent } from "./render";
import { useFetchData } from "./use-fetch-data";

type Props = {
  locale: string;
  id: string;
};

export const MenuArts1Display: React.FC<Props> = ({ id, locale }) => {
  const { status, menu } = useFetchData(id, locale);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error occurred while fetching data.</div>;
  }

  if (status === "not-found" || !menu) {
    return <div>Menu not found.</div>;
  }

  return <RenderDisplayContent locale={locale} menu={menu} />;
};
