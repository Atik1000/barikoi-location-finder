# barikoi-location-finder

A professional Next.js location finder project for the Barikoi assignment.

## Overview

This repository contains a modern web application built with Next.js (App Router) and TypeScript. The project is designed to evolve into a production-quality location search experience backed by Barikoi APIs.

## Current Status

- Project scaffold initialized with Next.js, TypeScript, and ESLint
- Base application structure is ready for feature development
- README prepared with implementation and deployment guidance

## Planned Features

- Search locations by keyword
- Show location suggestions and result lists
- Display important location details (address, coordinates, type)
- Add loading, empty, and error states for robust UX
- Keep architecture modular for easy scaling

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- ESLint
- Barikoi Location API (integration step)

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/Atik1000/barikoi-location-finder.git
cd barikoi-location-finder
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Environment Variables

Create a file named `.env.local` in the project root.

Example:

```env
NEXT_PUBLIC_BARIKOI_API_KEY=your_api_key_here
NEXT_PUBLIC_BARIKOI_BASE_URL=https://barikoi.xyz/v2/api
```

Notes:

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
- Never commit real API secrets to source control.

## Project Structure

```text
barikoi-location-finder/
|- public/
|- src/
|  |- app/
|  |  |- layout.tsx
|  |  |- page.tsx
|  |  |- globals.css
|- package.json
|- tsconfig.json
|- next.config.ts
|- README.md
```

As features are added, recommended folders include:

- src/components
- src/services
- src/types
- src/utils

## API Integration Plan

1. Create a dedicated API service module under src/services
2. Add typed request and response models in src/types
3. Use a client-side search workflow with debouncing
4. Handle API errors and fallbacks gracefully

## Deployment

Recommended deployment platform: Vercel.

High-level steps:

1. Push repository to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Trigger production deployment

## Contribution

For assignment-style collaboration:

1. Create a new branch
2. Commit changes with clear messages
3. Open a pull request

## License

This project is intended for educational and assignment purposes.

## Author

Maintained by Atik1000.
