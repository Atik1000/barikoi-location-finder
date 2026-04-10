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

## Docker

### Build and run with Docker

```bash
docker build -t barikoi-location-finder .
docker run --rm -p 3000:3000 --env-file .env.local barikoi-location-finder
```

### Run with Docker Compose

```bash
docker compose up --build
```

The app will be available at `http://localhost:3000`.

## Environment Variables

Create `.env.local` at project root:

```env
# Secure server-side key for API search (required for live data)
BARIKOI_API_KEY=your_server_api_key

# Optional: default is https://barikoi.xyz
BARIKOI_BASE_URL=https://barikoi.xyz

# Optional: request timeout for server-side Barikoi SDK calls
BARIKOI_API_TIMEOUT_MS=10000

# Optional secure server-side feature flags
BARIKOI_MIN_SEARCH_QUERY_LENGTH=3

# Optional public map key for react-bkoi-gl map tiles
NEXT_PUBLIC_BARIKOI_MAP_KEY=your_public_map_key

# Optional public map style base URL
NEXT_PUBLIC_BARIKOI_MAP_STYLE_BASE_URL=https://map.barikoi.com/styles/barikoi-light/style.json

# Optional public external links base URL for map handoff
NEXT_PUBLIC_GOOGLE_MAPS_SEARCH_BASE_URL=https://www.google.com/maps?q=

# Optional public minimum query length for client-side UX messaging and behavior
NEXT_PUBLIC_MIN_SEARCH_QUERY_LENGTH=3
```

Security note:

- `BARIKOI_API_KEY` is read on the server only (inside API route/service).
- The client never calls search APIs with the private key directly.
- `BARIKOI_MIN_SEARCH_QUERY_LENGTH` controls server-side query-threshold behavior securely.
- `NEXT_PUBLIC_BARIKOI_MAP_KEY` is for map style tiles and should be domain-restricted.

## Local Environment Setup (Step by Step)

Follow these steps on your local machine:

1. Copy the example env file:

	cp .env.example .env.local

2. Open `.env.local` and set your real keys:

	BARIKOI_API_KEY=your_real_server_key
	NEXT_PUBLIC_BARIKOI_MAP_KEY=your_public_map_key

3. Keep these defaults unless you need to change them:

	BARIKOI_BASE_URL=https://barikoi.xyz
	BARIKOI_API_TIMEOUT_MS=10000
	BARIKOI_MIN_SEARCH_QUERY_LENGTH=3
	NEXT_PUBLIC_BARIKOI_MAP_STYLE_BASE_URL=https://map.barikoi.com/styles/osm-liberty/style.json
	NEXT_PUBLIC_GOOGLE_MAPS_SEARCH_BASE_URL=https://www.google.com/maps?q=
	NEXT_PUBLIC_MIN_SEARCH_QUERY_LENGTH=3

4. Restart the app after any env change:

	npm run dev

5. Verify the setup:

	- Search for a location with 3+ characters.
	- Confirm result list shows live data.
	- Select a result and confirm map renders marker/popup.

Common mistakes to avoid:

- Do not add quotes around key values unless required.
- Do not leave spaces around equals sign.
- Do not commit `.env.local` to git.
- If values change but app behavior does not, stop and restart the dev server.

## Architecture Summary

- `src/app/api/locations/route.ts`: server route for secure location search
- `src/services/barikoi.ts`: Barikoi SDK (`barikoiapis`) integration
- `src/store`: Redux store and location slice
- `src/components/location-map.tsx`: interactive map using `react-bkoi-gl`


## Q1 — What trade-offs did you consciously make due to time constraints?

### 1. Feature completeness over advanced map interactions
I deliberately prioritized delivering a stable, end-to-end working feature flow rather than layering in advanced map capabilities such as marker clustering for dense data sets, polyline route drawing, or geofence/radius overlays. These are high-value UX additions, but they carry non-trivial implementation complexity and testing overhead. Getting the core search-to-map feedback loop working reliably was a better investment of the available time.

### 2. Single-page architecture over premature modularization
Rather than splitting the application into multiple routes or feature modules from the outset, I kept the experience as a focused single-page flow backed by a deliberately scoped Redux store. Early over-engineering of routing and module boundaries introduces coordination overhead before the product shape is even settled. A clean, readable single-page implementation is easier to reason about, demo, and extend than a prematurely fragmented one.

### 3. Clarity and reliability over broad test coverage
I optimized for code that is straightforward to read and that behaves predictably under normal usage, accepting that automated test coverage — particularly integration and edge-case tests — is a gap to be closed in a follow-up iteration. Writing tests for code whose shape is still evolving often produces brittle specs that need rewriting anyway, so deferring broader coverage until the architecture stabilized was a conscious, pragmatic call.

---

## Q2 — If this app needed to scale (more data, more features), what would you refactor first?

### 1. Introduce a proper data-fetching layer
The current direct API-route fetch pattern works fine at small scale but does not handle caching, deduplication, or background revalidation. I would replace it with a dedicated data-fetching strategy — either a library like React Query / SWR or a custom caching middleware — to support pagination, stale-while-revalidate semantics, and request deduplication. This single change has the highest leverage because it improves perceived performance, reduces server load, and decouples UI state from network state cleanly.

### 2. Normalize Redux entity state and introduce memoized selectors
As result sets grow, storing raw arrays in Redux leads to O(n) lookup costs and redundant re-renders across components. I would migrate to a normalized entity map (keyed by ID) using a pattern like Redux Toolkit's `createEntityAdapter`, paired with fine-grained memoized selectors via `createSelector`. This makes updates surgical, keeps derived data consistent, and significantly improves rendering performance for large data volumes.

### 3. Decompose into domain-driven feature modules
The map and search concerns would be split into dedicated feature folders, each owning its own Redux slice, custom hooks, API service, and component subtree. This co-location of related code makes each domain independently navigable, testable, and deployable — and it scales naturally as new domains (e.g. user preferences, saved locations, history) are introduced without inflating a monolithic state or component tree.

### 4. Build out a meaningful test pyramid
With a stable architecture in place, I would invest in integration tests covering the full API route → Redux state transition path, and component-level tests for the search interaction and map rendering behaviors. The goal is a test suite that catches regressions at the boundary where most real bugs live, without over-testing implementation details.

### 5. Add production observability
At scale, silent failures and slow requests become invisible without instrumentation. I would introduce structured logging (with request IDs threaded through the call chain), distributed request tracing, and a front-end error analytics pipeline. This gives the team the feedback loop needed to prioritize performance work and diagnose production issues before users report them.