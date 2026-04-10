"use client";

import { useEffect, useState } from "react";

import { SearchBox } from "@/components/search-box";
import { SearchResults } from "@/components/search-results";
import type { BarikoiLocation } from "@/types/barikoi";

import styles from "./page.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BarikoiLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const controller = new AbortController();

    if (!trimmedQuery) {
      setResults([]);
      setErrorMessage(null);
      setIsLoading(false);
      return () => controller.abort();
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `/api/locations?q=${encodeURIComponent(trimmedQuery)}`,
          {
            signal: controller.signal,
          },
        );

        const payload = (await response.json()) as {
          results?: BarikoiLocation[];
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to fetch locations");
        }

        setResults(payload.results ?? []);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Unexpected error during search";
        setErrorMessage(message);
        setResults([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <p className={styles.badge}>Barikoi Location Finder</p>
          <h1>Search for places across Bangladesh in one quick flow.</h1>
          <p>
            Start typing a location name, area, or city. This first version uses local sample
            matching and is ready for API wiring in the next step.
          </p>
        </div>

        <section className={styles.searchPanel}>
          <SearchBox value={query} onChange={setQuery} />
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            errorMessage={errorMessage}
          />
        </section>

        <div className={styles.footerNote}>
          Powered by server-side Barikoi integration through Next.js API routes.
        </div>
      </main>
    </div>
  );
}
