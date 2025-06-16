import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const testResultColors = {
  critical: {
    pale: '#FFEEEC',
    medium: '#F01919',
    dark: '#960000',
  },
  moderate: {
    pale: '#FFF5B1',
    medium: '#FCE02C',
    dark: '#685C00',
  },
  optimal: {
    pale: '#DCF0DC',
    medium: '#14BE1B',
    dark: '#015605',
  }
}
