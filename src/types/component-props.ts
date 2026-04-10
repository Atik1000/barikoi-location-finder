import type { ReactNode } from "react";

import type { BarikoiLocation } from "@/types/barikoi";

export type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export type SearchResultsProps = {
  results: BarikoiLocation[];
  isLoading: boolean;
  query: string;
  errorMessage: string | null;
  selectedLocation: BarikoiLocation | null;
  onSelectLocation: (location: BarikoiLocation) => void;
};

export type LocationMapProps = {
  location: BarikoiLocation | null;
};

export type ProvidersProps = {
  children: ReactNode;
};
