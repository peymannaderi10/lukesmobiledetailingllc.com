// Server-only — never import this from client components
import { SquareClient, SquareEnvironment } from 'square';

export const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN ?? '',
  environment:
    process.env.SQUARE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export const SERVICE_MAP: Record<string, string> = {
  signature:    process.env.SERVICE_ID_SIGNATURE    ?? '',
  diamond:      process.env.SERVICE_ID_DIAMOND      ?? '',
  basic:        process.env.SERVICE_ID_BASIC        ?? '',
  fullinterior: process.env.SERVICE_ID_FULL_INTERIOR ?? '',
  fullexterior: process.env.SERVICE_ID_FULL_EXTERIOR ?? '',
};

/** Recursively convert BigInt values to strings so the object is JSON-safe. */
export function serializeBigInts(obj: unknown): unknown {
  if (typeof obj === 'bigint') return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInts);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, serializeBigInts(v)]),
    );
  }
  return obj;
}
