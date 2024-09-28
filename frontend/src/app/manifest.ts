import { MetadataRoute } from "next";
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: "Menu Arts - Menu Design and Printing",
    start_url: "/",
    // background_color : "#ffffff",
    // theme_color : "#ffffff",
  };
}
