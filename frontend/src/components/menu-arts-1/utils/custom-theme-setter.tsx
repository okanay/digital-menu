import { generateSimplifiedTailwindPalette } from "@/utils/generate-tailwind-palette";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type ThemePalette = Record<string, string>;

interface Props {
  children: React.ReactNode;
  target: string;
  menu: Menu;
}

export const CustomThemeSetter = ({ children, target, menu }: Props) => {
  const { theme } = useTheme();
  const editorRef = useRef<HTMLElement | null>(null);

  const { isActive, colors } = menu.color;

  const lightPalette = generateSimplifiedTailwindPalette(
    colors.light || "#ffffff",
  );

  const darkPalette = generateSimplifiedTailwindPalette(
    colors.dark || "#000000",
  );

  const isActivated = isActive;

  const paletteKeys = (): string[] => {
    const lightKeys = Object.keys(lightPalette);
    const darkKeys = Object.keys(darkPalette);
    const uniqueKeys = new Set([...lightKeys, ...darkKeys]);
    return Array.from(uniqueKeys);
  };

  const setThemeStyles = (editor: HTMLElement, palette: ThemePalette) => {
    requestAnimationFrame(() => {
      Object.entries(palette).forEach(([shade, color]) => {
        editor.style.setProperty(`--primary-${shade}`, color);
      });
    });
  };

  const removeThemeStyles = (editor: HTMLElement) => {
    requestAnimationFrame(() => {
      paletteKeys().forEach((shade) => {
        editor.style.removeProperty(`--primary-${shade}`);
      });
    });
  };

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
