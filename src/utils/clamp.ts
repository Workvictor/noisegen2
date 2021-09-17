export function clamp(delta: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, delta));
}
