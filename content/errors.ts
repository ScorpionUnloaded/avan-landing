import type { Locale } from "@/lib/i18n/config";

/**
 * Copy for the error boundaries. Kept in its own small module because the
 * boundaries are Client Components: importing a whole copy deck there would
 * ship every locale's text to every page. The decks re-export these entries,
 * so the parity and house-voice tests still cover them.
 */
export const errorCopy = {
  en: {
    eyebrow: "INTERRUPTED",
    head: "Something interrupted us.",
    body: "The page could not be shown. Try once more, or return to the house.",
    retry: "Try once more",
    home: "Return to the house",
  },
  fr: {
    eyebrow: "INTERROMPU",
    head: "Quelque chose nous a interrompus.",
    body: "La page n'a pas pu s'afficher. Réessayez, ou revenez à la maison.",
    retry: "Réessayer",
    home: "Revenir à la maison",
  },
} satisfies Record<Locale, Record<string, string>>;
