import { describe, expect, it } from "vitest";
import { en } from "@/content/en";
import { fr } from "@/content/fr";

type Json = unknown;

/** Every leaf path with its runtime type, e.g. "hero.thesis:string", "rivers.cards:array(4)". */
function shape(value: Json, path = ""): string[] {
  if (Array.isArray(value)) {
    return [`${path}:array(${value.length})`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  }
  return [`${path}:${typeof value}`];
}

function strings(value: Json, path = ""): Array<[string, string]> {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

/**
 * The house voice (brand strategy brief A1.1; build plan §D): "The house states;
 * it does not sell." No exclamation, no hype, no startup vocabulary.
 */
const BANNED = [
  /!/,
  /\brevolution(ise|ize|ary)?\b/i,
  /\bseamless(ly)?\b/i,
  /\bcutting[- ]edge\b/i,
  /\bdisrupt(ion|ive)?\b/i,
  /\bgame[- ]chang(er|ing)\b/i,
  /\bunlock\b/i,
  /\bsupercharge\b/i,
  /\bhustle\b/i,
  /\bgrowth[- ]hack/i,
  /\bworld[- ]class\b/i,
  /\bbest[- ]in[- ]class\b/i,
];

describe("copy deck", () => {
  it("has identical structure in English and French", () => {
    expect(shape(fr)).toEqual(shape(en));
  });

  it("has no empty strings", () => {
    for (const [path, s] of [...strings(en), ...strings(fr)]) {
      expect(s.trim(), path).not.toBe("");
    }
  });

  it.each([
    ["en", en],
    ["fr", fr],
  ])("stays in the house voice (%s)", (_locale, copy) => {
    const offences = strings(copy).flatMap(([path, s]) =>
      BANNED.filter((re) => re.test(s)).map((re) => `${path}: ${re} in "${s}"`),
    );
    expect(offences).toEqual([]);
  });
});
