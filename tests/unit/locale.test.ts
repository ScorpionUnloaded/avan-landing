import { describe, expect, it } from "vitest";
import { homeAnchor, homePath, isLocale, localeHref } from "@/lib/locale";

describe("locale helpers", () => {
  it("recognises only supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("keeps English canonical at the root and prefixes French", () => {
    expect(homePath("en")).toBe("/");
    expect(homePath("fr")).toBe("/fr");
    expect(localeHref("en", "/pfi")).toBe("/pfi");
    expect(localeHref("fr", "/pfi")).toBe("/fr/pfi");
    expect(homeAnchor("fr", "#rivers")).toBe("/fr#rivers");
  });
});
