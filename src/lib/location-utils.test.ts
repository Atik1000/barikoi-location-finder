import { getLocationCoordinates, hasValidCoordinates, parseCoordinate } from "@/lib/location-utils";

describe("location-utils", () => {
  test("parseCoordinate handles number and numeric string", () => {
    expect(parseCoordinate(23.81)).toBe(23.81);
    expect(parseCoordinate("90.41")).toBe(90.41);
  });

  test("parseCoordinate returns null for invalid input", () => {
    expect(parseCoordinate("abc")).toBeNull();
    expect(parseCoordinate(undefined)).toBeNull();
    expect(parseCoordinate(null)).toBeNull();
  });

  test("getLocationCoordinates supports alias keys", () => {
    const location = {
      lat: "23.8103",
      lng: "90.4125",
    };

    expect(getLocationCoordinates(location)).toEqual({
      latitude: 23.8103,
      longitude: 90.4125,
    });
  });

  test("hasValidCoordinates returns true only when both coordinates exist", () => {
    expect(
      hasValidCoordinates({
        latitude: 23.81,
        longitude: 90.41,
      }),
    ).toBe(true);

    expect(
      hasValidCoordinates({
        latitude: 23.81,
      }),
    ).toBe(false);
  });
});
