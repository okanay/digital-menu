import { useMenuEditor } from "../use-menu-editor";

type Props = {
  children: React.ReactNode;
};

export const CustomDirectionWrapper: React.FC<Props> = ({ children }) => {
  const { menu } = useMenuEditor();
  const { current } = menu.language;

  return (
    <div
      style={{
        direction: current === "sa" ? "rtl" : "ltr",
      }}
    >
      {children}
    </div>
  );
};
