import { hexToRgbString } from "@/utils/generate-tailwind-palette";
import { twMerge } from "tailwind-merge";
import { CustomClassGenerator } from "./custom-class-setter";
import { CustomFontClassNameWrapper } from "./custom-font-single-setter";
import { EmptyStyle } from "@/constants/menu-arts-1";

type Props = {
  children: React.ReactNode;
  style?: Style;
  className?: string;
};

export const CustomStyleWrapper = ({
  children,
  className,
  style = EmptyStyle,
}: Props) => {
  return (
    <CustomFontClassNameWrapper style={style}>
      <div
        className={twMerge(CustomClassGenerator(style), "", className)}
        style={
          style.textColor.isActive
            ? ({
                "--font-custom-light": hexToRgbString(style.textColor.light),
                "--font-custom-dark": hexToRgbString(style.textColor.dark),
              } as React.CSSProperties)
            : {}
        }
      >
        {children}
      </div>
    </CustomFontClassNameWrapper>
  );
};
