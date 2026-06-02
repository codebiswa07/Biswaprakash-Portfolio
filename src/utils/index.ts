export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

export function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
