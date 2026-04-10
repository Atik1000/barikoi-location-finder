import type { BarikoiLocation } from "@/types/barikoi";

type SearchResultsProps = {
  results: BarikoiLocation[];
  isLoading: boolean;
  query: string;
  errorMessage: string | null;
};

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function getCoordinate(location: BarikoiLocation, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = location[key];
    const parsed = toNumber(value);
    if (parsed !== undefined) {
      return parsed;
    }
  }

  return undefined;
}

function getPostCode(location: BarikoiLocation): string | undefined {
  const keys = ["postCode", "postcode", "post_code"];

  for (const key of keys) {
    const value = location[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

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

function getMapLink(location: BarikoiLocation): string | null {
  const latitude = getCoordinate(location, ["latitude", "lat"]);
  const longitude = getCoordinate(location, ["longitude", "lng", "lon", "long"]);

  if (latitude !== undefined && longitude !== undefined) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }

  const label = `${getDisplayTitle(location)} ${getDisplayAddress(location)}`.trim();
  if (!label) {
    return null;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(label)}`;
}

export function SearchResults({
  results,
  isLoading,
  query,
  errorMessage,
}: SearchResultsProps) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return <p className="meta">Type to start searching.</p>;
  }

  if (trimmedQuery.length < 3) {
    return <p className="meta">Type at least 3 characters to search.</p>;
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
            const latitude = getCoordinate(location, ["latitude", "lat"]);
            const longitude = getCoordinate(location, ["longitude", "lng", "lon", "long"]);
            const postCode = getPostCode(location);
            const mapLink = getMapLink(location);

            return (
              <li key={uniqueKey}>
                <h3>{getDisplayTitle(location)}</h3>
                <p>{getDisplayAddress(location)}</p>
                <div className="resultMeta">
                  <span>
                    Postcode: <strong>{postCode ?? "N/A"}</strong>
                  </span>
                  <span>
                    Coordinates:{" "}
                    <strong>
                      {latitude !== undefined && longitude !== undefined
                        ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                        : "N/A"}
                    </strong>
                  </span>
                </div>
                {mapLink ? (
                  <a
                    className="resultLink"
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps
                  </a>
                ) : null}
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
