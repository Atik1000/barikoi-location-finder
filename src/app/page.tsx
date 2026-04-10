"use client";

import { LocationMap } from "@/components/location-map";
import { useLocationSearch } from "@/hooks/use-location-search";
import { SearchBox } from "@/components/search-box";
import { SearchResults } from "@/components/search-results";

import styles from "./page.module.css";

const QUICK_CITIES = ["Dhaka", "Chattogram", "Sylhet", "Khulna"];

export default function Home() {
  const {
    query,
    results,
    isLoading,
    errorMessage,
    selectedLocation,
    handleQueryChange,
    handleSelectLocation,
  } = useLocationSearch();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.badge}>Barikoi Location Finder</p>
            <h1>Search smarter, locate faster, and explore with confidence.</h1>
            <p>
              Type at least 3 characters to search by location name, area, or city.
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
      </main>
    </div>
  );
}
