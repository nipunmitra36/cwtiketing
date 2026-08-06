let ready = false;
const waiters: Array<() => void> = [];

/**
 * Runs `cb` as soon as the ScrollSmoother instance is live. Child effects
 * (which create ScrollTriggers, especially pinned ones) run before the parent
 * GSAPProvider effect that creates the smoother, so pinned triggers must wait.
 * Returns an unsubscribe function for use in effect cleanup.
 */
export function onSmootherReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  waiters.push(cb);
  return () => {
    const i = waiters.indexOf(cb);
    if (i !== -1) waiters.splice(i, 1);
  };
}

export function markSmootherReady(): void {
  if (ready) return;
  ready = true;
  const pending = waiters.splice(0);
  pending.forEach((cb) => cb());
}

export function resetSmootherReady(): void {
  ready = false;
  waiters.length = 0;
}
