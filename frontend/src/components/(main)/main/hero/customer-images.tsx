import { ImageTW } from "@/components/ui/image-tw";

export const CustomerImages: React.FC = () => {
  return (
    <div
      className="absolute mx-auto flex w-full max-w-7xl flex-col items-center justify-center"
      style={{
        paddingRight: "clamp(1rem, 0.8043rem + 0.8696vw, 1.5rem)",
        gap: "clamp(2rem, 2.3913rem + -1.7391vw, 1rem)",
        height: "clamp(53.125rem, 44.5652rem + 38.0435vw, 75rem)",
        top: "clamp(-7rem, -9.1739rem + 5.2174vw, -3rem)",
      }}
    >
      <div
        style={{
          paddingLeft: "clamp(0.25rem, -3.5652rem + 16.9565vw, 11rem)",
          paddingRight: "clamp(1.25rem, -2.1739rem + 15.2174vw, 10rem)",
        }}
        className="flex w-full items-center justify-between pr-40"
      >
        <div
          style={{
            width: "clamp(3rem, 1.2609rem + 12.1739vw, 10rem)",
            height: "clamp(3rem, 1.2609rem + 12.1739vw, 10rem)",
          }}
          className="relative flex-shrink-0 rounded-full bg-primary-100"
        >
          <ImageTW
            src="/images/7.png"
            alt="Customer Image"
            className="absolute left-0 top-0 h-full w-full rounded-full object-cover"
          />
          <span
            style={{
              fontSize: "clamp(0.5rem, 0.3533rem + 0.6522vw, 0.875rem)",
              lineHeight: 1,
            }}
            className="absolute -top-1.5 left-0 z-[110] rounded bg-fill px-2.5 py-1.5 font-custom-mono text-xs tracking-wider text-violet-600 shadow shadow-corner/25 dark:text-primary-100 md:translate-x-[-25%]"
          >
            QR Menu
          </span>
        </div>
        <div
          style={{
            width: "clamp(3rem, 0.2609rem + 12.1739vw, 5rem)",
            height: "clamp(3rem, 0.2609rem + 12.1739vw, 5rem)",
          }}
          className="relative flex-shrink-0 overflow-hidden rounded-full bg-primary-100"
        >
          <ImageTW
            src="/images/2.png"
            alt="Customer Image"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        style={{}}
        className="flex w-full items-center justify-between pl-8 pr-0"
      >
        <div
          style={{
            width: "clamp(3rem, 0.2609rem + 12.1739vw, 5rem)",
            height: "clamp(3rem, 0.2609rem + 12.1739vw, 5rem)",
          }}
          className="relative overflow-hidden rounded-full bg-primary-100"
        >
          <ImageTW
            src="/images/1.png"
            alt="Customer Image"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
        <div
          style={{
            width: "clamp(3.5rem, 0.2609rem + 12.1739vw, 6rem)",
            height: "clamp(3.5rem, 0.2609rem + 12.1739vw, 6rem)",
          }}
          className="relative overflow-hidden rounded-full bg-primary-100"
        >
          <ImageTW
            src="/images/3.png"
            alt="Customer Image"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        style={{
          paddingLeft: "clamp(1rem, -5.6522rem + 29.5652vw, 18rem)",
          paddingRight: "clamp(0.5rem, -5.7826rem + 23.4783vw, 14rem)",
        }}
        className="flex w-full items-center justify-between"
      >
        <div
          style={{
            width: "clamp(3.5rem, 0.2609rem + 12.1739vw, 6rem)",
            height: "clamp(3.5rem, 0.2609rem + 12.1739vw, 6rem)",
          }}
          className="relative overflow-hidden rounded-full bg-primary-100"
        >
          <ImageTW
            src="/images/4.png"
            alt="Customer Image"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
        <div
          style={{
            width: "clamp(3rem, 1.5609rem + 12.1739vw, 10rem)",
            height: "clamp(3rem, 1.5609rem + 12.1739vw, 10rem)",
            top: "clamp(-0.5rem, -0.5217rem + -4.3478vw, -4rem)",
          }}
          className="relative rounded-full bg-primary-100"
        >
          <ImageTW
            src="/images/5.png"
            alt="Customer Image"
            className="absolute left-0 top-0 h-full w-full rounded-full object-cover"
          />
          <span
            style={{
              fontSize: "clamp(0.5rem, 0.3533rem + 0.6522vw, 0.875rem)",
              lineHeight: 1,
            }}
            className="absolute -bottom-1.5 right-0 z-[110] translate-x-[15%] rounded bg-fill px-2.5 py-1.5 font-custom-mono text-xs tracking-wider text-amber-600 shadow shadow-corner/25 dark:text-primary-100 lg:translate-x-[25%]"
          >
            Statistics
          </span>
        </div>
      </div>
    </div>
  );
};
