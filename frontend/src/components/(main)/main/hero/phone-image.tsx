import Image from "next/image";
import phone from "../../../../../public/images/iphone-min.png";

export const PhoneImage: React.FC = () => {
  return (
    <div
      className="pointer-events-none relative z-[200]"
      style={{
        width: "clamp(12rem, 9.6522rem + 10.4348vw, 18rem)",
        height: "clamp(22.5rem, 19.1667rem + 16.6667vw, 32.5rem)",
      }}
    >
      <Image
        src={phone}
        alt="iPhone Empty Screen"
        className="h-full w-full object-contain"
        priority
        loading="eager"
      />
    </div>
  );
};
