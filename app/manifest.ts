import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import { palette, roles } from "@/lib/tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: en.site.name,
    short_name: "AVAN",
    description: en.site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: roles.dark["surface-canvas"],
    theme_color: palette["ink-900"].hex,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
