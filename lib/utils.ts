import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns-jalali";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

export function currentNow() {
  return format(new Date(), "yyyy/MM/dd");
}
