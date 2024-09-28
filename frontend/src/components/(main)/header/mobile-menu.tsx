import { ImageTW } from "@/components/ui/image-tw";

export const MobileMenu: React.FC = () => {
  return (
    <div className="2xl:hidden">
      <ImageTW
        src="/svgs/hamburger.svg"
        alt="Hamburger Menu Svg"
        className="w-8 dark:invert"
      />
    </div>
  );
};
