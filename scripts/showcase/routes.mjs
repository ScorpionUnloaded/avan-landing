/**
 * Routes captured for the before/after showcase. Only keys present in both
 * runs are paired; routes that exist only "after" still get captured.
 */
export const BEFORE_ROUTES = [
  { key: "home", path: "/" },
  { key: "pfi", path: "/pfi" },
  { key: "legal", path: "/legal" },
  { key: "privacy", path: "/privacy" },
  { key: "home-fr", path: "/fr" },
  { key: "pfi-fr", path: "/fr/pfi" },
  { key: "legal-fr", path: "/fr/legal" },
  { key: "privacy-fr", path: "/fr/privacy" },
  { key: "404", path: "/this-door-does-not-open" },
];

export const AFTER_ROUTES = [
  ...BEFORE_ROUTES,
  { key: "cookies", path: "/cookies" },
  { key: "finance", path: "/finance" },
  { key: "technology", path: "/technology" },
  { key: "capital", path: "/capital" },
  { key: "culture", path: "/culture" },
  { key: "method", path: "/method" },
  { key: "journal", path: "/journal" },
  { key: "system", path: "/system" },
  { key: "finance-fr", path: "/fr/finance" },
  { key: "method-fr", path: "/fr/method" },
  { key: "journal-fr", path: "/fr/journal" },
];

export const VIEWPORTS = [
  { key: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  {
    key: "mobile",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
];
