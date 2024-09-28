import { ButtonSecondary } from "@/components/ui/buttons";
import { ImageTW } from "@/components/ui/image-tw";
import { Link } from "@/providers/i18n/routing";

const FeaturesList = [
  {
    icon: "/svgs/monitor-up.svg",
    name: "Instant Updates",
    description:
      "Update your menu in real-time without the need for reprinting",
  },
  {
    icon: "/svgs/languages.svg",
    name: "Multilingual Support",
    description:
      "We offer support in multiple languages to help you reach a broader audience",
  },
  {
    icon: "/svgs/palette.svg",
    name: "Customizable Style",
    description:
      "Personalize the style of your QR menu to align with your brand identity",
  },
  {
    icon: "/svgs/package-plus.svg",
    name: "Additional Features",
    description:
      "Get in touch with us for more features or customization options for your QR menu",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-t from-primary-50 from-[48%] to-primary-300 px-4 py-12 font-sans dark:from-black dark:to-primary-900/70 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center justify-between gap-5 text-center md:flex-row md:items-start md:text-start">
          <div className="relative text-balance md:max-w-[520px]">
            <h2 className="text-4xl font-semibold tracking-wider text-font-primary dark:text-font xl:text-5xl">
              Create Your QR Menu Quickly and Easily
            </h2>
          </div>
          <div className="relative flex w-full max-w-[600px] flex-col">
            <p className="mb-5 font-custom-serif text-lg font-normal text-font-secondary">
              If you want more features or customization for your menu, you can
              share your ideas with us and we will help you.
            </p>
            <Link href="/">
              <ButtonSecondary>Contact Us</ButtonSecondary>
            </Link>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FeaturesList.map((f, i) => (
            <div
              key={f.name + i}
              className="group relative h-full w-full rounded-2xl border border-corner-secondary/10 bg-primary-100 px-4 py-8 transition-all duration-500 hover:bg-primary-200 dark:bg-primary-900 dark:hover:bg-primary-600"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-950">
                <ImageTW
                  src={f.icon}
                  alt={f.name}
                  className="w-6 dark:invert"
                />
              </div>
              <h4 className="mb-3 text-lg font-semibold capitalize text-font-primary transition-all duration-500">
                {f.name}
              </h4>
              <p className="text-sm tracking-wide text-font-secondary transition-all duration-500 dark:group-hover:text-white">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
