const DEFAULT_BARIKOI_BASE_URL = "https://barikoi.xyz";
const DEFAULT_BARIKOI_API_TIMEOUT_MS = 10000;
const DEFAULT_MIN_SEARCH_QUERY_LENGTH = 3;

export type BarikoiConfig = {
  apiKey: string;
  baseUrl: string;
  timeoutMs: number;
};

export type ServerFeatureConfig = {
  minSearchQueryLength: number;
};

export function getBarikoiConfig(): BarikoiConfig {
  const apiKey = process.env.BARIKOI_API_KEY ?? process.env.NEXT_PUBLIC_BARIKOI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Barikoi API key. Add BARIKOI_API_KEY (preferred) or NEXT_PUBLIC_BARIKOI_API_KEY in .env.local.",
    );
  }

  const rawBaseUrl =
    (process.env.BARIKOI_BASE_URL ?? process.env.NEXT_PUBLIC_BARIKOI_BASE_URL)?.replace(
      /\/$/,
      "",
    ) ?? DEFAULT_BARIKOI_BASE_URL;

  // barikoiapis expects root domain base URL, not /v2/api prefix.
  const baseUrl = rawBaseUrl.replace(/\/v2\/api$/i, "");
  const timeoutMs = Number(process.env.BARIKOI_API_TIMEOUT_MS ?? DEFAULT_BARIKOI_API_TIMEOUT_MS);

  return {
    apiKey,
    baseUrl,
    timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : DEFAULT_BARIKOI_API_TIMEOUT_MS,
  };
}

export function getServerFeatureConfig(): ServerFeatureConfig {
  const minQueryLength = Number(
    process.env.BARIKOI_MIN_SEARCH_QUERY_LENGTH ?? DEFAULT_MIN_SEARCH_QUERY_LENGTH,
  );

  return {
    minSearchQueryLength:
      Number.isFinite(minQueryLength) && minQueryLength > 0
        ? minQueryLength
        : DEFAULT_MIN_SEARCH_QUERY_LENGTH,
  };
}