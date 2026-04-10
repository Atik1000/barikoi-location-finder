import { NextRequest, NextResponse } from "next/server";

import { searchLocations } from "@/services/barikoi";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
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