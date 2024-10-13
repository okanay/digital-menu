import { memo } from "react";
import { useMenuEditor } from "../use-menu-editor";
import { getSerifVariable } from "@/assets/fonts/serif";
import { getSansVariable } from "@/assets/fonts/sans";
import { getMonoVariable } from "@/assets/fonts/mono";

interface Props {
  children: React.ReactNode;
}

export const CustomFontWrapper = ({ children }: Props) => {
  const { menu } = useMenuEditor();
  const { fonts, isActive } = menu.font;
  const { sans, serif, mono } = fonts;

  if (!isActive) return <>{children}</>;

  // prettier-ignore
  const serifClassName = getSerifVariable(serif.custom);
  // prettier-ignore
  const sansClassName = getSansVariable(sans.custom);
  // prettier-ignore
  const monoClassName = getMonoVariable(mono.custom);

  return (
    <div className={` ${serifClassName} ${sansClassName} ${monoClassName} `}>
      {children}
    </div>
  );
};

export const MemoizedCustomThemeSetter = memo(CustomFontWrapper);
