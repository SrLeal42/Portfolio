
export function Normalize(value: number, min: number, max: number): number {
  return Math.min(Math.max((value - min) / (max - min), 0), 1);
}
