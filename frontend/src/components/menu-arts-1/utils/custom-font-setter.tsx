import { memo, useMemo } from "react";
import { getSerifVariable } from "@/assets/fonts/serif";
import { getSansVariable } from "@/assets/fonts/sans";
import { getMonoVariable } from "@/assets/fonts/mono";

interface Props {
  children: React.ReactNode;
  menu: Menu;
}

export const CustomFontSetter: React.FC<Props> = ({ children, menu }) => {
  const { fonts, isActive } = menu.font;
  const { sans, serif, mono } = fonts;

  const fontClasses = useMemo(() => {
    if (!isActive) return "";

    const serifClassName = getSerifVariable(serif.custom);
    const sansClassName = getSansVariable(sans.custom);
    const monoClassName = getMonoVariable(mono.custom);

    return `${serifClassName} ${sansClassName} ${monoClassName}`.trim();
  }, [isActive, serif.custom, sans.custom, mono.custom]);

  return <div className={fontClasses}>{children}</div>;
};

export const MemoizedCustomThemeSetter = memo(CustomFontSetter);
