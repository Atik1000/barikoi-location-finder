const DEFAULT_BARIKOI_BASE_URL = "https://barikoi.xyz";

export type BarikoiConfig = {
  apiKey: string;
  baseUrl: string;
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

  return {
    apiKey,
    baseUrl,
  };
}