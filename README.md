# barikoi-location-finder

Location Finder built with Next.js for the Barikoi assignment.

## Live Requirements Coverage

- Uses Next.js + TypeScript
- Uses Redux (`@reduxjs/toolkit` + `react-redux`)
- Uses Tailwind CSS
- Uses Barikoi npm libraries:
	- `barikoiapis` for location search (server-side)
	- `react-bkoi-gl` for in-app interactive map
- User can search locations
- User can view selected location on map
- API key usage is secure for search requests

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Redux Toolkit + React Redux
- Tailwind CSS
- react-bkoi-gl
- barikoiapis

## Setup Instructions

```bash
git clone https://github.com/Atik1000/barikoi-location-finder.git
cd barikoi-location-finder
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` at project root:

```env
# Secure server-side key for API search (required for live data)
BARIKOI_API_KEY=your_server_api_key

# Optional: default is https://barikoi.xyz
BARIKOI_BASE_URL=https://barikoi.xyz

# Optional public map key for react-bkoi-gl map tiles
NEXT_PUBLIC_BARIKOI_MAP_KEY=your_public_map_key
```

Security note:

- `BARIKOI_API_KEY` is read on the server only (inside API route/service).
- The client never calls search APIs with the private key directly.
- `NEXT_PUBLIC_BARIKOI_MAP_KEY` is for map style tiles and should be domain-restricted.

## Architecture Summary

- `src/app/api/locations/route.ts`: server route for secure location search
- `src/services/barikoi.ts`: Barikoi SDK (`barikoiapis`) integration
- `src/store`: Redux store and location slice
- `src/components/location-map.tsx`: interactive map using `react-bkoi-gl`

## Assignment Question 1

What trade-offs did you consciously make due to time constraints?

1. I prioritized a stable, complete feature flow over advanced map interactions (for example clustering, route drawing, and geofence overlays).
2. I used a single-page experience with focused Redux state instead of splitting into multiple routes/modules early.
3. I implemented a practical fallback mode for missing API key so demo/testing remains usable, rather than failing the whole app.
4. I optimized for clarity and reliability first, leaving broader automated test coverage as a next step.

## Assignment Question 2

If this app needed to scale (more data, more features), what would you refactor first?

1. Move from simple API-route fetch to a richer data layer (caching, pagination, stale-while-revalidate).
2. Introduce normalized entity state in Redux for large result sets and better memoized selectors.
3. Split map/search into domain modules with dedicated hooks and feature folders.
4. Add integration tests for API route + state transitions and component tests for search/map behaviors.
5. Add observability (structured logs, request tracing, and error analytics).

## Submission Guidelines

- Public GitHub Repository: https://github.com/Atik1000/barikoi-location-finder
- Setup commands included above (`npm install`, `npm run dev`)
