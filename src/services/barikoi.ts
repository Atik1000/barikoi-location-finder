import { getBarikoiConfig } from "@/lib/env";
import type { BarikoiLocation, BarikoiSearchResponse } from "@/types/barikoi";

function normalizeSearchResults(payload: BarikoiSearchResponse): BarikoiLocation[] {
  if (Array.isArray(payload.places)) return payload.places;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
}

export async function searchLocations(
  query: string,
  signal?: AbortSignal,
): Promise<BarikoiLocation[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const { apiKey, baseUrl, searchPath } = getBarikoiConfig();
  const url = new URL(`${baseUrl}${searchPath}`);

  url.searchParams.set("q", trimmedQuery);
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Barikoi request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as BarikoiSearchResponse;
  return normalizeSearchResults(payload);
}