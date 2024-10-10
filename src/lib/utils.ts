import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseDuration(isoDuration: string): number {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match?.[1] ? parseInt(match[1], 10) : 0;
  const minutes = match?.[2] ? parseInt(match[2], 10) : 0;
  const seconds = match?.[3] ? parseInt(match[3], 10) : 0;

  return hours * 3600 + minutes * 60 + seconds;
}

export function getContentType(duration: string): string {
  const totalSeconds = parseDuration(duration);

  return totalSeconds < 60 ? "Short Form" : "Long Form";
}