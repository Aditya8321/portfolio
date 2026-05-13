import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateRange(start: string, end: string, current?: boolean) {
  if (current) return `${start} → Present`;
  return `${start} → ${end}`;
}
