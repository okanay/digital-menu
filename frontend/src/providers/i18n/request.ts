import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) locale = "en";

  try {
    return {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    };
  } catch (error) {
    return {
      messages: (await import("../../../messages/en.json")).default,
    };
  }
});
