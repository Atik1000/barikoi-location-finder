import { createBarikoiClient } from "barikoiapis";

import { getBarikoiConfig } from "@/lib/env";
import type { BarikoiLocation } from "@/types/barikoi";

export async function searchLocations(
  query: string,
  signal?: AbortSignal,
): Promise<BarikoiLocation[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const { apiKey, baseUrl } = getBarikoiConfig();
  const client = createBarikoiClient({ apiKey, baseUrl });

  if (signal?.aborted) {
    return [];
  }

  const result = await client.autocomplete({ q: trimmedQuery, bangla: false });

  if (result.error) {
    throw new Error("Barikoi autocomplete request failed");
  }

  return result.data?.places ?? [];
}