/**
 * Environment configuration — single source of truth for env defaults.
 * Import from here instead of reading process.env directly with inline fallbacks.
 *
 * Client-side code (browser):   uses NEXT_PUBLIC_API_URL  → port 5000 (backend)
 * Server-side proxies (api/):   uses BACKEND_URL          → port 5000 (backend)
 * Both default to http://localhost:5000 so local dev works without any .env file.
 */

/** URL of the backend API — used by client-side fetch calls. */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

/** URL of the backend API — used by Next.js server-side route handlers. */
export const BACKEND_URL =
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

/** Public site base URL — used for canonical links, og:url, etc. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.knacksters.co';
