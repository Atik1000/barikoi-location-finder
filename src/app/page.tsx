"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

const SAMPLE_LOCATIONS = [
  { name: "Banani", city: "Dhaka", address: "Banani, Dhaka" },
  { name: "Dhanmondi", city: "Dhaka", address: "Dhanmondi, Dhaka" },
  { name: "GEC Circle", city: "Chattogram", address: "GEC Circle, Chattogram" },
  { name: "Zindabazar", city: "Sylhet", address: "Zindabazar, Sylhet" },
  { name: "Shibbari", city: "Khulna", address: "Shibbari, Khulna" },
];

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return [];
    }

    return SAMPLE_LOCATIONS.filter((location) => {
      return (
        location.name.toLowerCase().includes(trimmedQuery) ||
        location.city.toLowerCase().includes(trimmedQuery) ||
        location.address.toLowerCase().includes(trimmedQuery)
      );
    });
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
          <label htmlFor="location-query">Location query</label>
          <input
            id="location-query"
            placeholder="Try Banani, Dhanmondi, Sylhet..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          {query.trim() ? (
            <p className={styles.meta}>{filteredResults.length} result(s) found</p>
          ) : (
            <p className={styles.meta}>Type to start searching.</p>
          )}

          <ul className={styles.results}>
            {filteredResults.map((location) => (
              <li key={`${location.name}-${location.city}`}>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
              </li>
            ))}
          </ul>

          {query.trim() && filteredResults.length === 0 ? (
            <p className={styles.empty}>No local sample match found for this query.</p>
          ) : null}
        </section>

        <div className={styles.footerNote}>
          Next step will replace local matching with live Barikoi API search.
        </div>
      </main>
    </div>
  );
}
