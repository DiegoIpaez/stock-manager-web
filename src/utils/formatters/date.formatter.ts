import { DateTime } from "luxon";

export function formatDateToDDMMYYYY(date?: string | null): string {
  if (!date) return "";
  const dateLuxon = DateTime.fromISO(date);
  return dateLuxon.toFormat("dd-MM-yyyy HH:mm");
}
