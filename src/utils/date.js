import { format } from "date-fns";
import { ru } from "date-fns/locale";

const nowUtc = new Date();
const offset = 6 * 60;
const yekaterinburgTime = new Date(nowUtc.getTime() + offset * 60 * 1000);

export const minDate = yekaterinburgTime.toISOString().split('T')[0];
export const minDateTime = yekaterinburgTime.toISOString();

export function formatDate(isoString) {
  const date = new Date(isoString);
  return format(date, 'dd.MM.yyyy HH:mm', { locale: ru });
}

export function sortByDate(data) {
  return data.sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));
}