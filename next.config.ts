import type { NextConfig } from "next";

/**
 * Response headers for every path. The Content-Security-Policy is not here: it
 * carries a per-request nonce, so proxy.ts sets it on each document.
 */
const securityHeaders = [
  // Two years, subdomains included. Not submitted for preload: the production
  // host is a vercel.app subdomain, which the house does not own.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "serial=()",
      "bluetooth=()",
      "browsing-topics=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
