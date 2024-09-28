import React from "react";
import { CustomerImages } from "./hero/customer-images";
import { PhoneImage } from "./hero/phone-image";
import { HeroTitle } from "./hero/title";
import { GetStarted } from "./hero/get-started";

type Props = {
  locale: string;
};

export const Main: React.FC<Props> = () => {
  return (
    <main>
      <div className="h-[120px] w-full" />
      <section className="relative h-fit min-h-[calc(100vh-120px)] items-center bg-gradient-to-b from-primary-50 from-[48%] to-primary-300 pb-4 text-center dark:from-black dark:to-primary-900/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col place-items-center justify-between overflow-hidden">
          <div className="flex flex-col items-center justify-start gap-8">
            <HeroTitle />
            <CustomerImages />
            <PhoneImage />
            <GetStarted />
          </div>
        </div>
      </section>
    </main>
  );
};

// https://twitter.com/unrootdesign/status/1837433356021067927/photo/4
