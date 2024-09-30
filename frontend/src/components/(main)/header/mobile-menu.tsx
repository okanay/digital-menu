import { IconImage } from "@/components/ui/icon-image";

export const MobileMenu: React.FC = () => {
  return (
    <div className="flex-shrink-0 lg:hidden">
      <IconImage
        src="/svgs/hamburger.svg"
        alt="Hamburger Menu Svg"
        className="w-8 dark:invert"
      />
    </div>
  );
};
