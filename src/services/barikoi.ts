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

  const { apiKey, baseUrl, timeoutMs } = getBarikoiConfig();
  const client = createBarikoiClient({ apiKey, baseUrl, timeout: timeoutMs });

  if (signal?.aborted) {
    return [];
  }

  const result = await client.autocomplete({ q: trimmedQuery, bangla: false });

  if (result.error) {
    const apiMessage =
      typeof result.error === "object" && result.error !== null && "message" in result.error
        ? String(result.error.message)
        : "Barikoi autocomplete request failed";
    throw new Error(apiMessage);
  }

  return result.data?.places ?? [];
}