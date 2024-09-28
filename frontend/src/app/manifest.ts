import { MetadataRoute } from "next";
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: "Menu Arts - QR Menu Design and Production",
    short_name: "Menu Arts",
    description: "Create your own QR menu and easily promote your business.",
    display: "standalone",
    start_url: "/",
  };
}
