import type { BarikoiLocation } from "@/types/barikoi";

export type LocationSearchApiResponse = {
  results?: BarikoiLocation[];
  error?: string;
  warning?: string;
};
