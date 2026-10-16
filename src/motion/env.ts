export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Per-page teardown registry. Modules push cleanups; main.ts runs them before each swap. */
const cleanups: (() => void)[] = [];
export const onCleanup = (fn: () => void) => cleanups.push(fn);
export const runCleanups = () => {
  while (cleanups.length) {
    try { cleanups.pop()!(); } catch (e) { console.error(e); }
  }
};
