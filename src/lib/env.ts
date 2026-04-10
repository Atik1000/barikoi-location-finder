const DEFAULT_BARIKOI_BASE_URL = "https://barikoi.xyz/v2/api";

export type BarikoiConfig = {
  apiKey: string;
  baseUrl: string;
  searchPath: string;
};

export function getBarikoiConfig(): BarikoiConfig {
  const apiKey = process.env.BARIKOI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing BARIKOI_API_KEY. Add it to .env.local before calling Barikoi services.",
    );
  }

  const baseUrl =
    process.env.BARIKOI_BASE_URL?.replace(/\/$/, "") ?? DEFAULT_BARIKOI_BASE_URL;
  const searchPath = process.env.BARIKOI_SEARCH_PATH ?? "/search/autocomplete/place";

  return {
    apiKey,
    baseUrl,
    searchPath,
  };
}