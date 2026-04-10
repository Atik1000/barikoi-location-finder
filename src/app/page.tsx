"use client";

import { useEffect } from "react";

import { LocationMap } from "@/components/location-map";

import { SearchBox } from "@/components/search-box";
import { SearchResults } from "@/components/search-results";
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
import type { BarikoiLocation } from "@/types/barikoi";

import styles from "./page.module.css";

const QUICK_CITIES = ["Dhaka", "Chattogram", "Sylhet", "Khulna"];

export default function Home() {
  const dispatch = useAppDispatch();
  const { query, results, isLoading, errorMessage, selectedLocation } = useAppSelector(
    (state) => state.location,
  );

  const handleQueryChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleSelectLocation = (location: BarikoiLocation) => {
    dispatch(selectLocation(location));
  };

  useEffect(() => {
    const trimmedQuery = query.trim();
    const controller = new AbortController();

    if (!trimmedQuery) {
      dispatch(clearSearchState());
      return () => controller.abort();
    }

    if (trimmedQuery.length < 3) {
      dispatch(clearSearchState());
      return () => controller.abort();
    }

    const timeoutId = setTimeout(async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await fetch(
          `/api/locations?q=${encodeURIComponent(trimmedQuery)}`,
          {
            signal: controller.signal,
          },
        );

        const payload = (await response.json()) as {
          results?: BarikoiLocation[];
          error?: string;
          warning?: string;
        };

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
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [dispatch, query]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.badge}>Barikoi Location Finder</p>
            <h1>Search smarter, locate faster, and explore with confidence.</h1>
            <p>
              Type at least 3 characters to search by location name, area, or city. Results are
              served through a secure server-side API route.
            </p>
            <div className={styles.shortcutRow}>
              {QUICK_CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={styles.shortcutChip}
                  onClick={() => handleQueryChange(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.heroStats}>
            <article className={styles.statCard}>
              <p>Search Mode</p>
              <h3>Live + Fallback</h3>
              <span>Auto fallback keeps demo stable if API key is missing.</span>
            </article>

            <article className={styles.statCard}>
              <p>Result Detail</p>
              <h3>Address + GPS</h3>
              <span>Postcode, coordinates, and map handoff included.</span>
            </article>

            <article className={styles.statCard}>
              <p>Search Trigger</p>
              <h3>3+ Characters</h3>
              <span>Debounced lookups reduce noise and improve quality.</span>
            </article>
          </div>
        </section>

        <div className={styles.panelHeader}>
          <h2>Find Location</h2>
          <span className={styles.liveDot}>Status: Ready</span>
        </div>

        <section className={styles.searchPanel}>
          <SearchBox value={query} onChange={handleQueryChange} />
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            errorMessage={errorMessage}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
          />
        </section>

        <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 md:p-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-800">Map Preview</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              react-bkoi-gl
            </span>
          </div>
          <LocationMap location={selectedLocation} />
        </section>

        <div className={styles.footerNote}>
          Powered by barikoiapis (secure server search), react-bkoi-gl (interactive map), Redux,
          and Tailwind CSS.
        </div>
      </main>
    </div>
  );
}
