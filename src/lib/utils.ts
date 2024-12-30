import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateWithHour(targetDate: Date) {
  return format(targetDate, "do MMM yyyy • h:mm a", { locale: enUS });
}
