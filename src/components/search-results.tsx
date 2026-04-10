import type { BarikoiLocation } from "@/types/barikoi";

type SearchResultsProps = {
  results: BarikoiLocation[];
  isLoading: boolean;
  query: string;
  errorMessage: string | null;
};

function getDisplayTitle(location: BarikoiLocation): string {
  const name = typeof location.name === "string" ? location.name.trim() : "";
  const area = typeof location.area === "string" ? location.area.trim() : "";

  if (name) return name;
  if (area) return area;
  return "Unnamed location";
}

function getDisplayAddress(location: BarikoiLocation): string {
  const address = typeof location.address === "string" ? location.address.trim() : "";
  const city = typeof location.city === "string" ? location.city.trim() : "";

  if (address) return address;
  if (city) return city;
  return "No address details available";
}

export function SearchResults({ results, isLoading, query, errorMessage }: SearchResultsProps) {
  if (!query.trim()) {
    return <p className="meta">Type to start searching.</p>;
  }

  if (isLoading) {
    return <p className="meta">Searching locations...</p>;
  }

  if (errorMessage) {
    return <p className="empty">{errorMessage}</p>;
  }

  return (
    <>
      <p className="meta">{results.length} result(s) found</p>
      {results.length > 0 ? (
        <ul className="results">
          {results.map((location, index) => {
            const uniqueKey = `${location.id ?? "location"}-${location.latitude ?? "lat"}-${location.longitude ?? "lng"}-${index}`;

            return (
              <li key={uniqueKey}>
                <h3>{getDisplayTitle(location)}</h3>
                <p>{getDisplayAddress(location)}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="empty">No result found for this query.</p>
      )}
    </>
  );
}
