import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateWithHour(targetDate: Date) {
  return format(targetDate, "do MMM yyyy • h:mm a", { locale: enUS });
}

const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});
export function formatCompactNumber(num: number) {
  return compactNumberFormatter.format(num);
}

export function formatRelativeDate(targetDate: Date) {
  return formatDistanceToNow(targetDate, { addSuffix: true });
}

export function formatDateWithDay(targetDate: Date) {
  return format(targetDate, "eeee, MMMM d, yyyy");
}
