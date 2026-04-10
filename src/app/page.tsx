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
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const controller = new AbortController();

    if (!trimmedQuery) {
      setResults([]);
      setErrorMessage(null);
      setWarningMessage(null);
      setIsLoading(false);
      return () => controller.abort();
    }

    if (trimmedQuery.length < 3) {
      setResults([]);
      setErrorMessage(null);
      setWarningMessage(null);
      setIsLoading(false);
      return () => controller.abort();
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        setWarningMessage(null);

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

        setResults(payload.results ?? []);
        setWarningMessage(payload.warning ?? null);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Unexpected error during search";
        setErrorMessage(message);
        setResults([]);
        setWarningMessage(null);
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
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.badge}>Barikoi Location Finder</p>
            <h1>Search smarter, locate faster, and explore with confidence.</h1>
            <p>
              Type at least 3 characters to search by location name, area, or city. Results are
              served through a secure server-side API route.
            </p>
            <div className={styles.shortcutRow}>
              <span className={styles.shortcutChip}>Dhaka</span>
              <span className={styles.shortcutChip}>Chattogram</span>
              <span className={styles.shortcutChip}>Sylhet</span>
              <span className={styles.shortcutChip}>Khulna</span>
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
          <SearchBox value={query} onChange={setQuery} />
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            errorMessage={errorMessage}
            warningMessage={warningMessage}
          />
        </section>

        <div className={styles.footerNote}>
          Powered by server-side Barikoi integration through Next.js API routes.
        </div>
      </main>
    </div>
  );
}
