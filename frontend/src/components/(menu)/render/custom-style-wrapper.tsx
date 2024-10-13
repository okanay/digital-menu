import { hexToRgbString } from "@/utils/generate-tailwind-palette";
import { twMerge } from "tailwind-merge";
import { CustomClassGenerator } from "../helper/custom-class-generator";
import { CustomFontClassNameWrapper } from "../helper/custom-font-className-wrapper.tsx";

type Props = {
  children: React.ReactNode;
  style: Style;
};

export const CustomStyleWrapper = ({ children, style }: Props) => {
  return (
    <CustomFontClassNameWrapper style={style}>
      <div
        className={twMerge(CustomClassGenerator(style), "")}
        style={
          style.isActive
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
