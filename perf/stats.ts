export function median(values: number[]): number {
  const v = values.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return NaN;
  const mid = v.length >> 1;
  return v.length % 2 ? v[mid]! : (v[mid - 1]! + v[mid]!) / 2;
}

export function medianBy<T extends Record<string, number>>(rows: T[]): T {
  const out = {} as Record<string, number>;
  for (const k of Object.keys(rows[0] ?? {})) out[k] = median(rows.map((r) => r[k] as number));
  return out as T;
}

/** `--name value` / `--flag` argv parser. */
export function args(argv = process.argv.slice(2)): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (!a.startsWith("--")) continue;
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[a.slice(2)] = "true";
    else (out[a.slice(2)] = next), i++;
  }
  return out;
}

/**
 * Devtools-throttled Lighthouse runs sometimes paint at a fixed ~2.67 s instead of ~1.3 s whatever the build (see
 * perf/README.md). A run whose FCP lands at or after this is "stalled" and is reported separately.
 */
export const STALL_FCP_MS = 2600;
export const isStalled = (r: { fcp: number }) => r.fcp >= STALL_FCP_MS;

export function unstalledMedian<T extends { fcp: number } & Record<string, number>>(rows: T[]): { median: T | null; stalled: number; kept: number } {
  const kept = rows.filter((r) => !isStalled(r));
  return { median: kept.length ? medianBy(kept) : null, stalled: rows.length - kept.length, kept: kept.length };
}
