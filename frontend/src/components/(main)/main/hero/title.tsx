export const HeroTitle: React.FC = () => {
  return (
    <h1
      style={{
        fontSize: "clamp(3rem, 1.8261rem + 5.2174vw, 6rem)",
        lineHeight: 1,
      }}
      className="flex flex-col -space-y-3.5 font-custom-serif tracking-tight text-black dark:text-white"
    >
      <span>Unlock Your</span>
      <span className="bg-gradient-to-br from-primary-500 to-primary-400 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-200">
        Menu Potential
      </span>
    </h1>
  );
};
