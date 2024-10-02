import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.png";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const BrandLogo: React.FC<Props> = (props) => {
  return (
    <Link
      href="/"
      style={{
        width: "clamp(7.5rem, 5.8333rem + 8.3333vw, 12.5rem)",
        ...props.style,
      }}
      className={twMerge("h-fit focus:outline-none", props.className)}
    >
      <Image
        src={logo}
        alt="Menu Arts Logo"
        className="w-full contrast-[60%] dark:contrast-[75] dark:invert"
        priority
      />
    </Link>
  );
};
