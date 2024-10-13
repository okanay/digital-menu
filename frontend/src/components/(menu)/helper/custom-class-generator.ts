export const CustomClassGenerator = (style: Style): string => {
  let className = "";
  if (style.isActive) {
    Object.values(style.attr).forEach((key) => {
      if (key === "Default") {
        return;
      }

      className += key + " ";
    });

    className += "dark:text-font-custom-dark text-font-custom-light" + " ";
  }
  return className;
};
