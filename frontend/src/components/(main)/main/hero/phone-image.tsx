import { ImageTW } from "@/components/ui/image-tw";

export const PhoneImage: React.FC = () => {
  return (
    <ImageTW
      src="/iphone.png"
      alt="iPhone Image"
      style={{
        width: "clamp(12rem, 9.6522rem + 10.4348vw, 18rem)",
      }}
      className="relative z-20"
    />
  );
};
