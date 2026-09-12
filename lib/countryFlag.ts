import countries from "world-countries";

const ISO2_BY_NAME = new Map(countries.map((c) => [c.name.common, c.cca2.toLowerCase()]));

/** Registered country name (e.g. "Bangladesh") -> lowercase ISO 3166-1 alpha-2 code (e.g. "bd"), or "" if unknown. */
export function iso2ForCountry(name?: string): string {
  if (!name) return "";
  return ISO2_BY_NAME.get(name) || "";
}
