import { notFound } from "next/navigation";

/**
 * Any path the route table does not know lands here and answers a real 404
 * inside the locale tree, so the not-found page has its language, nav and
 * copy instead of the framework's bare default.
 */
export default function UnknownPath(): never {
  notFound();
}
