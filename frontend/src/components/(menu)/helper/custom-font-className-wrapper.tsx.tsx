import { getMonoClassName } from "@/assets/fonts/mono";
import { getSansClassName } from "@/assets/fonts/sans";
import { getSerifClassName } from "@/assets/fonts/serif";
import React from "react";

type Props = {
  children: React.ReactNode;
  style: Style;
};

const getFontClassName = (style: Style) => {
  if (!style.isActive || !style.font) return "";

  const fontFunctions = [getSansClassName, getSerifClassName, getMonoClassName];

  for (const getClassName of fontFunctions) {
    const className = getClassName(style.font);
    if (className) {
      return className;
    }
  }

  return "";
};

export const CustomFontClassNameWrapper = ({ children, style }: Props) => {
  const className = getFontClassName(style);

  return <div className={className || undefined}>{children}</div>;
};
