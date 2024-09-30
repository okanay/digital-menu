import Image from "next/image";
import min1 from "../../../../../public/images/1-min.png";
import min2 from "../../../../../public/images/2-min.png";
import min3 from "../../../../../public/images/3-min.png";
import min4 from "../../../../../public/images/4-min.png";
import min5 from "../../../../../public/images/5-min.png";
import min6 from "../../../../../public/images/6-min.png";
import min7 from "../../../../../public/images/7-min.png";

export const CustomerImages: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute top-4 mx-auto flex w-full max-w-7xl flex-col items-center justify-center"
      style={{
        paddingRight: "clamp(1rem, 0.8043rem + 0.8696vw, 1.5rem)",
        gap: "clamp(2rem, 2.3913rem + -1.7391vw, 1rem)",
        height: "clamp(53.125rem, 44.5652rem + 38.0435vw, 75rem)",
        top: "clamp(-2rem, -3rem + 5vw, 1rem)",
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
          className="relative flex-shrink-0 rounded-full bg-primary-100 dark:bg-primary-950"
        >
          <Image
            src={min7}
            alt="Customers Image"
            placeholder={"blur"}
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
          className="relative flex-shrink-0 overflow-hidden rounded-full bg-primary-100 dark:bg-primary-950"
        >
          <Image
            src={min2}
            alt="Customer Image"
            placeholder={"blur"}
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
          className="relative overflow-hidden rounded-full bg-primary-100 dark:bg-primary-950"
        >
          <Image
            src={min1}
            alt="Customer Image"
            placeholder={"blur"}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
        <div
          style={{
            width: "clamp(3.5rem, 0.2609rem + 12.1739vw, 6rem)",
            height: "clamp(3.5rem, 0.2609rem + 12.1739vw, 6rem)",
          }}
          className="relative overflow-hidden rounded-full bg-primary-100 dark:bg-primary-950"
        >
          <Image
            src={min3}
            alt="Customer Image"
            placeholder={"blur"}
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
          className="relative overflow-hidden rounded-full bg-primary-100 dark:bg-primary-950"
        >
          <Image
            src={min4}
            alt="Customer Image"
            placeholder={"blur"}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
        <div
          style={{
            width: "clamp(3rem, 1.5609rem + 12.1739vw, 10rem)",
            height: "clamp(3rem, 1.5609rem + 12.1739vw, 10rem)",
            top: "clamp(-0.5rem, -0.5217rem + -4.3478vw, -4rem)",
          }}
          className="relative rounded-full bg-primary-100 dark:bg-primary-950"
        >
          <Image
            src={min5}
            alt="Customer Image"
            placeholder={"blur"}
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
