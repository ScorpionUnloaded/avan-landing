/**
 * Runs inline in <head>, before first paint, so the page never flashes the
 * wrong theme. An explicit choice ("light" | "dark") is stored in localStorage;
 * "system" (or no choice) leaves data-theme unset and the CSS follows
 * prefers-color-scheme (see tokens.generated.css).
 *
 * Kept as a plain string so its SHA-256 can be allow-listed by the CSP.
 */
export const THEME_STORAGE_KEY = "avan-theme";

export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}document.documentElement.dataset.js="";})();`;
