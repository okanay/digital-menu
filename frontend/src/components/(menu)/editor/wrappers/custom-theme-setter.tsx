import { generateSimplifiedTailwindPalette } from "@/utils/generate-tailwind-palette";
import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useMenuEditor } from "../use-menu-editor";

type ThemePalette = Record<string, string>;

interface Props {
  children: React.ReactNode;
  target: string;
}

export const CustomThemeWrapper = ({ children, target }: Props) => {
  const { theme } = useTheme();
  const editorRef = useRef<HTMLElement | null>(null);

  const { menu } = useMenuEditor();
  const { isActive, colors } = menu.color;

  const lightPalette = useMemo(
    () => generateSimplifiedTailwindPalette(colors.light),
    [colors.light],
  );

  const darkPalette = useMemo(
    () => generateSimplifiedTailwindPalette(colors.dark),
    [colors.dark],
  );

  const isActivated = isActive;

  const paletteKeys = useMemo(() => {
    const lightKeys = Object.keys(lightPalette);
    const darkKeys = Object.keys(darkPalette);
    const uniqueKeys = new Set([...lightKeys, ...darkKeys]);
    return Array.from(uniqueKeys);
  }, [lightPalette, darkPalette]);

  const setThemeStyles = useCallback(
    (editor: HTMLElement, palette: ThemePalette) => {
      requestAnimationFrame(() => {
        Object.entries(palette).forEach(([shade, color]) => {
          editor.style.setProperty(`--primary-${shade}`, color);
        });
      });
    },
    [],
  );

  const removeThemeStyles = useCallback(
    (editor: HTMLElement) => {
      requestAnimationFrame(() => {
        paletteKeys.forEach((shade) => {
          editor.style.removeProperty(`--primary-${shade}`);
        });
      });
    },
    [paletteKeys],
  );

  useEffect(() => {
    // DOM'u bir kere bulup reference'ını saklayalım
    if (!editorRef.current) {
      editorRef.current = document.getElementById(target);
    }

    const editor = editorRef.current;
    if (!editor) return;

    // Cleanup function için current değerleri saklayalım
    const currentEditor = editor;
    const isDark = theme === "dark";

    if (isActivated) {
      setThemeStyles(editor, isDark ? darkPalette : lightPalette);
    } else {
      removeThemeStyles(editor);
    }

    // Cleanup function
    return () => {
      removeThemeStyles(currentEditor);
    };
  }, [
    target,
    theme,
    isActivated,
    lightPalette,
    darkPalette,
    setThemeStyles,
    removeThemeStyles,
  ]);

  return <>{children}</>;
};

export const MemoizedCustomThemeSetter = memo(CustomThemeWrapper);
