import type { BarikoiLocation } from "@/types/barikoi";

export type LocationState = {
  query: string;
  results: BarikoiLocation[];
  isLoading: boolean;
  errorMessage: string | null;
  selectedLocation: BarikoiLocation | null;
};
