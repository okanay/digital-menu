import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons";
import { twMerge } from "tailwind-merge";

import featureExtra from "../../../../../public/images/feature-extra-min.png";
import Image from "next/image";

type Props = {
  className?: string;
};
export const FeatureExtra: React.FC<Props> = (props) => {
  return (
    <div
      className={twMerge(
        "relative mt-12 grid h-[280px] w-full grid-rows-2 overflow-hidden rounded-lg border border-corner/40 bg-white shadow shadow-corner sm:h-[240px] lg:grid-cols-2 lg:grid-rows-1",
        props.className,
      )}
    >
      <div className="relative z-20 flex w-full items-center justify-between gap-2 bg-white px-4 dark:bg-black lg:flex-col lg:justify-center">
        <p className="text-balance text-center font-light tracking-wide text-font-secondary sm:text-start sm:text-base lg:max-w-[390px] lg:text-lg">
          Seeking a{" "}
          <span className="rounded px-1 py-0.5 font-normal text-primary-600 dark:text-primary-400">
            unique design
          </span>{" "}
          or{" "}
          <span className="rounded px-1 py-0.5 font-normal text-primary-500 dark:text-primary-300">
            have a concept in mind?
          </span>{" "}
          Reach out to us and we can assist in crafting your dream menu.
        </p>
        <div className="hidden w-full justify-end sm:flex lg:max-w-[390px] lg:justify-start">
          <ButtonPrimary className="font-semibold">Contact Us</ButtonPrimary>
        </div>
      </div>
      <Image
        src={featureExtra}
        alt="Feature Extra"
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-full bg-white object-cover dark:bg-black"
        loading="lazy"
        placeholder="blur"
        fetchPriority="low"
      />
    </div>
  );
};
