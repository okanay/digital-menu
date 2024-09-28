import { ImageTW } from "@/components/ui/image-tw";

export const PhoneImage: React.FC = () => {
  return (
    <div
      className="relative z-[200]"
      style={{
        width: "clamp(12rem, 9.6522rem + 10.4348vw, 18rem)",
        height: "clamp(22.5rem, 19.1667rem + 16.6667vw, 32.5rem)",
      }}
    >
      <ImageTW
        src="/images/iphone-min.png"
        alt="iPhone Image"
        className="h-full w-full object-contain"
        loading="eager"
      />
    </div>
  );
};
