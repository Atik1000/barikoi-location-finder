import type { BarikoiLocation } from "@/types/barikoi";

export function parseCoordinate(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function getLocationCoordinates(location: BarikoiLocation): {
  latitude: number | null;
  longitude: number | null;
} {
  const latitude = parseCoordinate(location.latitude ?? location["lat"]);
  const longitude = parseCoordinate(
    location.longitude ?? location["lng"] ?? location["lon"],
  );

  return {
    latitude,
    longitude,
  };
}

export function hasValidCoordinates(location: BarikoiLocation): boolean {
  const { latitude, longitude } = getLocationCoordinates(location);
  return latitude !== null && longitude !== null;
}
