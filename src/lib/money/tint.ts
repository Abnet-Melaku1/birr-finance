import { formatHex, interpolate } from 'culori';

/**
 * Soft background = `color-mix(in oklch, color pct%, surface)` (docs/theme.md).
 * React Native has no CSS color-mix, so we interpolate in OKLCH via culori and
 * serialize to hex. Used for category/brand chips (~13–16% in light, ~24–26% in
 * dark). Results are memoized — this is called per list row.
 */
const cache = new Map<string, string>();

export function tint(color: string, surface: string, pct: number): string {
  const key = `${color}|${surface}|${pct}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  // interpolate([color, surface]) → color at t=0, surface at t=1.
  // We want pct% of `color`, so sample at t = 1 - pct/100.
  const mix = interpolate([color, surface], 'oklch');
  const result = formatHex(mix(1 - pct / 100)) ?? surface;

  cache.set(key, result);
  return result;
}
