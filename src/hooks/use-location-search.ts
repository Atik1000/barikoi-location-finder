import { useEffect } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { hasValidCoordinates } from "@/lib/location-utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearSearchState,
  selectLocation,
  setError,
  setLoading,
  setQuery,
  setResults,
} from "@/store/slices/location-slice";
import type { LocationSearchApiResponse } from "@/types/api";
import type { BarikoiLocation } from "@/types/barikoi";

export function useLocationSearch() {
  const dispatch = useAppDispatch();
  const locationState = useAppSelector((state) => state.location);
  const debouncedQuery = useDebounce(locationState.query, 450);

  const handleQueryChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleSelectLocation = (location: BarikoiLocation) => {
    dispatch(selectLocation(location));
  };

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    const controller = new AbortController();

    if (!trimmedQuery || trimmedQuery.length < 3) {
      dispatch(clearSearchState());
      return () => controller.abort();
    }

    (async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await fetch(`/api/locations?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
        });

        const payload = (await response.json()) as LocationSearchApiResponse;

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to fetch locations");
        }

        const incomingResults = payload.results ?? [];
        dispatch(setResults(incomingResults));

        const firstMappable = incomingResults.find((item) => hasValidCoordinates(item)) ?? null;
        dispatch(selectLocation(firstMappable));
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Unexpected error during search";
        dispatch(setError(message));
        dispatch(setResults([]));
      } finally {
        if (!controller.signal.aborted) {
          dispatch(setLoading(false));
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, dispatch]);

  return {
    ...locationState,
    handleQueryChange,
    handleSelectLocation,
  };
}
