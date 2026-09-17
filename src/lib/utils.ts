import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Stellt interne Pfade unter den Vite-Basispfad (z. B. GitHub-Pages-Unterordner).
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL ?? "/";
  return base.replace(/\/$/, "") + path;
}
