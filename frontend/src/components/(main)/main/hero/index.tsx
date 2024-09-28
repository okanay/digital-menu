import { CustomerImages } from "./customer-images";
import { GetStarted } from "./get-started";
import { PhoneImage } from "./phone-image";
import { HeroTitle } from "./title";

export const HeroSection: React.FC = () => {
  return (
    <>
      <section className="relative h-fit min-h-[calc(100vh-0px)] items-center bg-gradient-to-b from-primary-50 from-[48%] to-primary-300 pb-4 text-center dark:from-black dark:to-primary-900/70">
        <div className="h-[96px] w-full sm:h-[120px]" />
        <div className="mx-auto flex w-full max-w-7xl flex-col place-items-center justify-between overflow-hidden">
          <div className="flex flex-col items-center justify-start gap-8">
            <HeroTitle />
            <CustomerImages />
            <PhoneImage />
            <GetStarted />
          </div>
        </div>
      </section>
    </>
  );
};

// https://twitter.com/unrootdesign/status/1837433356021067927/photo/4
