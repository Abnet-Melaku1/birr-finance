/**
 * Shape & spacing scale (CLAUDE.md §2.4–§2.5). Theme-independent: only colors
 * change between themes, never these. 8px spacing base.
 */
export const radii = {
  card: 20,
  hero: 24,
  sheet: 26, // top corners of bottom sheets
  fab: 20,
  tile: 12, // category/inset tiles
  monogram: 13, // bank avatar
  pill: 999,
} as const;

export const space = {
  base: 8,
  screenX: 16, // screen horizontal padding
  card: 16, // card inner padding
  gap: 12, // gap between stacked cards
  scrollBottom: 96, // clears bottom nav + FAB
} as const;
