import { NextRequest, NextResponse } from "next/server";

import { searchLocations } from "@/services/barikoi";

const DEMO_LOCATIONS = [
  { name: "Banani", city: "Dhaka", address: "Banani, Dhaka", postCode: "1213" },
  { name: "Bashundhara", city: "Dhaka", address: "Bashundhara, Dhaka", postCode: "1229" },
  { name: "Badda", city: "Dhaka", address: "Badda, Dhaka", postCode: "1212" },
  { name: "Barishal Sadar", city: "Barishal", address: "Barishal Sadar, Barishal" },
  { name: "Bangla Motor", city: "Dhaka", address: "Bangla Motor, Dhaka", postCode: "1000" },
];

function searchDemoLocations(query: string) {
  const normalizedQuery = query.toLowerCase();

  return DEMO_LOCATIONS.filter((location) => {
    const values = [location.name, location.city, location.address, location.postCode]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    return values.some((value) => value.includes(normalizedQuery));
  });
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchLocations(query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected search error";

    if (message.includes("Missing Barikoi API key")) {
      return NextResponse.json({
        results: searchDemoLocations(query),
        warning:
          "Barikoi API key is missing, so demo results are being shown instead of live API data.",
      });
    }

    return NextResponse.json({ results: [], error: message }, { status: 500 });
  }
}