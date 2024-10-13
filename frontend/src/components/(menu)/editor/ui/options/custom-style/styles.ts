export interface SelectOption {
  value: string;
  label: string;
}

export const STYLE_DEFAULTS = {
  FONT_SIZES: [
    { value: "", label: "Default" },
    { value: "text-xs", label: "12px" },
    { value: "text-sm", label: "14px" },
    { value: "text-base", label: "16px" },
    { value: "text-lg", label: "18px" },
    { value: "text-xl", label: "20px" },
    { value: "text-2xl", label: "24px" },
    { value: "text-3xl", label: "30px" },
    { value: "text-4xl", label: "36px" },
    { value: "text-5xl", label: "48px" },
    { value: "text-6xl", label: "60px" },
    { value: "text-7xl", label: "72px" },
    { value: "text-8xl", label: "96px" },
    { value: "text-9xl", label: "128px" },
  ] as SelectOption[],

  FONT_WEIGHTS: [
    { value: "", label: "Default" },
    { value: "font-thin", label: "Thin" },
    { value: "font-extralight", label: "ExtraLight" },
    { value: "font-light", label: "Light" },
    { value: "font-normal", label: "Normal" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "SemiBold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-extrabold", label: "ExtraBold" },
    { value: "font-black", label: "Black" },
  ] as SelectOption[],

  LINE_HEIGHTS: [
    { value: "", label: "Default" },
    { value: "leading-none", label: "Default" },
    { value: "leading-tight", label: "Tight" },
    { value: "leading-snug", label: "Snug" },
    { value: "leading-normal", label: "Normal" },
    { value: "leading-relaxed", label: "Relaxed" },
    { value: "leading-loose", label: "Loose" },
  ] as SelectOption[],

  LETTER_SPACINGS: [
    { value: "", label: "Default" },
    { value: "tracking-tighter", label: "Tighter" },
    { value: "tracking-tight", label: "Tight" },
    { value: "tracking-normal", label: "Normal" },
    { value: "tracking-wide", label: "Wide" },
    { value: "tracking-wider", label: "Wider" },
    { value: "tracking-widest", label: "Widest" },
  ] as SelectOption[],

  OPACITY_VALUES: [
    { value: "", label: "Default" },
    { value: "opacity-0", label: "0%" },
    { value: "opacity-10", label: "10%" },
    { value: "opacity-20", label: "20%" },
    { value: "opacity-30", label: "30%" },
    { value: "opacity-40", label: "40%" },
    { value: "opacity-50", label: "50%" },
    { value: "opacity-60", label: "60%" },
    { value: "opacity-70", label: "70%" },
    { value: "opacity-80", label: "80%" },
    { value: "opacity-90", label: "90%" },
    { value: "opacity-100", label: "100%" },
  ] as SelectOption[],

  HIDDEN_VALUES: [
    { value: "", label: "Show" },
    { value: "hidden", label: "Hidden" },
  ] as SelectOption[],

  DEFAULT_STYLE: {
    isActive: false,
    font: "Default",
    textColor: {
      light: "#000000",
      dark: "#FFFFFF",
    },
    attr: {
      fontSize: "Default",
      fontWeight: "Default",
      lineHeight: "Default",
      letterSpacing: "Default",
      opacity: "Default",
      fontFamily: "Default",
      hidden: "Default",
    },
  },
} as const;
