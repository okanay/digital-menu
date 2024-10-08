// utils/translation.ts
export const createTranslatedField = (
  languages: string[],
  defaultText: string,
  prefix: string = "",
) => {
  return languages.reduce(
    (acc, lang) => ({
      ...acc,
      [lang]: prefix ? `${prefix} - ${defaultText}` : defaultText,
    }),
    {},
  );
};

// Yeni öğe oluşturmak için helper
export const createNewTranslatableItem = <T extends Record<string, any>>(
  languages: string[],
  template: {
    [K in keyof T]: T[K] extends { [key: string]: string }
      ? { defaultText: string; prefix?: string }
      : T[K];
  },
): T => {
  const result: any = {};

  for (const [key, value] of Object.entries(template)) {
    if (value && typeof value === "object" && "defaultText" in value) {
      result[key] = createTranslatedField(
        languages,
        value.defaultText,
        value.prefix,
      );
    } else {
      result[key] = value;
    }
  }

  return result;
};
