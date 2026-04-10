export function getPublicMapKey(): string | null {
  return process.env.NEXT_PUBLIC_BARIKOI_MAP_KEY ?? null;
}

export function getPublicMapStyleBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BARIKOI_MAP_STYLE_BASE_URL ??
    "https://map.barikoi.com/styles/osm-liberty/style.json"
  );
}

export function getPublicGoogleMapsSearchBaseUrl(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_SEARCH_BASE_URL ?? "https://www.google.com/maps?q=";
}

export function getPublicMinSearchQueryLength(): number {
  const raw = Number(process.env.NEXT_PUBLIC_MIN_SEARCH_QUERY_LENGTH ?? 3);

  if (!Number.isFinite(raw) || raw < 1) {
    return 3;
  }

  return raw;
}
