import { BackgroundLoading } from "@/components/(menu)/sections/background/loading";
import React, { lazy, Suspense } from "react";
import { useMenuEditor } from "../../use-menu-editor";

type Props = {
  selected: BackgroundDesigns;
};

declare global {
  type BackgroundDesigns = 0 | 1 | 2 | 3;
}

export const bgDesigns: BackgroundDesigns[] = [0, 1, 2, 3];

const Designs: Record<
  BackgroundDesigns,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  0: lazy(() => import("./designs/0")),
  1: lazy(() => import("./designs/1")),
  2: lazy(() => import("./designs/2")),
  3: lazy(() => import("./designs/3")),
};

export const Background: React.FC<Props> = ({ selected }) => {
  const SelectedDesign = Designs[selected];
  const editor = useMenuEditor();

  if (!SelectedDesign) {
    return null;
  }

  return (
    <Suspense fallback={<BackgroundLoading />}>
      <SelectedDesign locale={editor.menu.language.current} />
    </Suspense>
  );
};
