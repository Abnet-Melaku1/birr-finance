import { createMockRepo, type DataRepo } from './repo';
import { createSqliteRepo } from './sqlite/sqliteRepo';

let cached: DataRepo | null = null;

/**
 * The active repo: SQLite when the native module is available (dev build),
 * otherwise the in-memory mock (Expo Go, tests, web). Cached so the whole app
 * shares one instance.
 */
export function createRepo(): DataRepo {
  if (cached) return cached;
  try {
    cached = createSqliteRepo();
  } catch {
    cached = createMockRepo();
  }
  return cached;
}
