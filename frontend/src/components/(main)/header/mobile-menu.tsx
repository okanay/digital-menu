import { ImageTW } from "@/components/ui/image-tw";

export const MobileMenu: React.FC = () => {
  return (
    <div className="flex-shrink-0 lg:hidden">
      <ImageTW
        src="/svgs/hamburger.svg"
        alt="Hamburger Menu Svg"
        className="w-8 dark:invert"
      />
    </div>
  );
};
