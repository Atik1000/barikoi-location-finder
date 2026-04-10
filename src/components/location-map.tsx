"use client";

import { Map, Marker, NavigationControl, Popup } from "react-bkoi-gl";
import "react-bkoi-gl/styles";

import { getLocationCoordinates } from "@/lib/location-utils";
import { getPublicMapKey } from "@/lib/public-env";
import type { BarikoiLocation } from "@/types/barikoi";

type LocationMapProps = {
  location: BarikoiLocation | null;
};

const DEFAULT_CENTER = {
  latitude: 23.8103,
  longitude: 90.4125,
};

export function LocationMap({ location }: LocationMapProps) {
  const mapKey = getPublicMapKey();

  if (!mapKey) {
    return (
      <div className="flex min-h-[340px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-600">
        Set NEXT_PUBLIC_BARIKOI_MAP_KEY in .env.local to render the interactive map.
      </div>
    );
  }

  const { latitude, longitude } = location
    ? getLocationCoordinates(location)
    : {
        latitude: DEFAULT_CENTER.latitude,
        longitude: DEFAULT_CENTER.longitude,
      };

  const mapLatitude = latitude ?? DEFAULT_CENTER.latitude;
  const mapLongitude = longitude ?? DEFAULT_CENTER.longitude;

  return (
    <div className="h-[340px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <Map
        mapStyle={`https://map.barikoi.com/styles/osm-liberty/style.json?key=${mapKey}`}
        initialViewState={{
          latitude: mapLatitude,
          longitude: mapLongitude,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {location && latitude !== null && longitude !== null ? (
          <>
            <Marker latitude={latitude} longitude={longitude} color="#0f766e" />
            <Popup latitude={latitude} longitude={longitude} closeButton={false} offset={20}>
              <div className="text-xs font-medium text-slate-700">
                {location.name ?? location.area ?? "Selected location"}
              </div>
            </Popup>
          </>
        ) : null}

        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}
