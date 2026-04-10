import { NextRequest, NextResponse } from "next/server";

import { getServerFeatureConfig } from "@/lib/env";
import { searchLocations } from "@/services/barikoi";

export async function GET(request: NextRequest) {
  const { minSearchQueryLength } = getServerFeatureConfig();
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < minSearchQueryLength) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchLocations(query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected search error";

    return NextResponse.json({ results: [], error: message }, { status: 500 });
  }
}