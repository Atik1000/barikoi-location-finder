export function getPublicMapKey(): string | null {
  return process.env.NEXT_PUBLIC_BARIKOI_MAP_KEY ?? null;
}
