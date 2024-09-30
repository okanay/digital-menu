import FeaturesList from "./features-list";
import { IconImage } from "@/components/ui/icon-image";
import { twMerge } from "tailwind-merge";

export const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-y-8 text-center md:grid-cols-2 lg:grid-cols-3">
      {FeaturesList.map((f, i) => (
        <div
          key={f.icon}
          className="flex flex-col items-center justify-center md:[&:nth-child(1)]:order-2 lg:[&:nth-child(1)]:order-1 md:[&:nth-child(2)]:order-3 md:[&:nth-child(2)]:col-span-2 lg:[&:nth-child(2)]:order-2 lg:[&:nth-child(2)]:col-span-1 md:[&:nth-child(3)]:order-1 lg:[&:nth-child(3)]:order-3"
        >
          <div className="mb-5 flex size-16 flex-col justify-center">
            <IconImage
              src={f.icon}
              alt={f.name}
              className="relative z-20 size-10 dark:invert"
            />
            <div
              className={twMerge(
                `absolute mb-5 size-24 translate-x-[-25%] opacity-[15%]`,
                i === 0 && "lg:rotate-[45deg]",
                i === 1 && "lg:rotate-[25deg]",
                i === 2 && "translate-x-[-35%] lg:rotate-[-45deg]",
              )}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="fill-primary-400 dark:fill-primary-400"
                  d="M57.7,-32.8C72.1,-28.1,79,-4.2,74.2,16.8C69.3,37.9,52.5,56.1,31.4,66.8C10.4,77.5,-15,80.7,-35,71.6C-55,62.4,-69.6,40.8,-71,20.3C-72.4,-0.2,-60.6,-19.5,-46.5,-24.2C-32.5,-28.9,-16.3,-18.9,2.7,-21.1C21.7,-23.3,43.4,-37.6,57.7,-32.8Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            {f.promote && (
              <div className="absolute left-0 translate-x-[45%] translate-y-[-90%] rotate-[-1.5deg] rounded-lg border border-yellow-300/30 bg-yellow-400 px-1.5 py-1 text-center text-[0.65rem] font-semibold text-zinc-600 shadow shadow-yellow-300/30 dark:bg-yellow-500 dark:text-zinc-800">
                <span>{f.promoteMessage}</span>
              </div>
            )}
            <h3 className="mb-2 text-balance text-center font-custom-serif text-3xl font-semibold text-font">
              {f.name}
            </h3>
          </div>

          <p className="max-w-[360px] text-balance text-center text-sm tracking-wide text-font-secondary sm:text-base">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  );
};
