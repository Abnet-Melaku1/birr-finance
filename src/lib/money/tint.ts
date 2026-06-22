import { formatHex, interpolate } from 'culori';

const cache = new Map<string, string>();

/** Soft fill: mix `pct`% of `color` into `surface`, in OKLCH. Memoized. */
export function tint(color: string, surface: string, pct: number): string {
  const key = `${color}|${surface}|${pct}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const mix = interpolate([color, surface], 'oklch');
  const result = formatHex(mix(1 - pct / 100)) ?? surface;

  cache.set(key, result);
  return result;
}
