let counter = 1000;

/** Monotonic id for locally-created records (mock/manual entries). */
export function nextId(prefix = 'tx'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
