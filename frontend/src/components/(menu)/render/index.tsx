"use client";

import { twMerge } from "tailwind-merge";
import { CategoryDisplay } from "./designs/category";
import { CurrencyDictionary } from "../editor/ui/currency-dictionary";
import InitialMenuDesignData from "@/constants/dummy-data";
import { useState, useEffect } from "react";

type Props = {
  locale: string;
};

export const MenuArts1Display = ({ locale }: Props) => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<Menu>(InitialMenuDesignData);

  useEffect(() => {
    let data = localStorage.getItem("menu");
    if (data) {
      setMenu(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="mx-auto max-w-xl">Loading...</div>;
  }

  if (!menu) {
    return <div className="mx-auto max-w-xl">No data found</div>;
  }

  if (!menu.language.active.includes(locale as any)) {
    return <div className="mx-auto max-w-xl">Language not supported</div>;
  }

  return (
    <article className="mx-auto max-h-fit max-w-xl bg-fill">
      {menu.categories.map((category, index) => (
        <CategoryDisplay
          key={category.id + "display"}
          category={category}
          locale={locale}
        />
      ))}
      <div className="flex flex-col gap-4 bg-primary-50/10 dark:bg-primary-950/5">
        {menu.categories[0].items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-1.5 rounded-lg px-5 py-4"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-custom-serif text-xl font-semibold text-primary-500">
                {item.name}
              </h2>
              <p className="flex gap-0.5 font-custom-mono text-xl text-primary-950/70 dark:text-primary-50/60">
                <CurrencyDictionary
                  currency={menu.currency.current}
                  className={twMerge("text-sm")}
                />
                <span
                  className={twMerge(
                    "font-custom-serif text-primary-950 dark:text-primary-50",
                  )}
                >
                  {item.price}
                </span>
              </p>
            </div>
            <p className="text-sm text-primary-950/70 dark:text-primary-50/60">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};
