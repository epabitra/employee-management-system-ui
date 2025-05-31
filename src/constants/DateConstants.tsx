import moment from "moment-timezone";

// DATE FORMATE
export const DATE_FORMAT_MM_DD_YYYY_HH_MM_A = "MM-DD-YYYY hh:mm A";
export const DATE_FORMAT_YYYY_MM_DD_HH_MM_SS = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT_YYYY_MM_DD_HH_MM = "YYYY-MM-DD HH:mm";
export const DATE_FORMAT_MMM_DD_YYYY_HH_MM_A = "MMM-DD-YYYY hh:mm A";
export const DATE_FORMAT_DD_MM_YYYY_HH_MM_A = "DD-MM-YYYY hh:mm A";
export const DATE_FORMAT_DD_MM_YYYY = "DD-MM-YYYY";
export const DATE_FORMAT_YYYY_MM_DD = "YYYY-MM-DD";
export const DATE_FORMAT_MM_DD_YYYY = "MM-DD-YYYY";
export const DATE_FORMAT_MMMM_DD_YYYY = "MMMM, dd, yyyy";
export const DATE_FORMAT_YYYY_MM_DD_00_00_00 = "YYYY-MM-DD 00:00:00";
export const DATE_FORMAT_YYYY_MM_DD_T_HH_MM_SS_Z = "YYYY-MM-DDTHH:mm:ss[Z]";
export const DATE_FORMAT_YYYY_MM_DD_T_HH_MM_SS_SSSZ =
  "YYYY-MM-DDTHH:mm:ss.SSSZ";
export const DATE_FORMAT_MMMM_D_YYYY = "MMMM D, YYYY";
export const PLACE_HOLDER_MMMM_DD_YYYY = "Month, Day, Year";
export const DATE_FORMAT_MMMM_D = "MMMM D";
export const DATE_FORMAT_YYYY_MM_DD_T_HH_MM_SS = "YYYY-MM-DD[T]HH:mm:ss";

export const TIME_FORMAT_HH_MM_SS = "HH:MM:SS";
export const TIME_FORMAT_HH_MM = "HH:MM";
export const TIME_FORMAT_HH_SS = "HH:SS";
export const TIME_FORMAT_MM_SS = "MM:SS";
export const TIME_FORMAT_HH = "HH";
export const TIME_FORMAT_MM = "MM";
export const TIME_FORMAT_SS = "SS";
export const APP_TIME_ZONE = "UTC";

export const DEFAULT_TIME_ZONE = "Asia/Kolkata";
export function getUserTimeZoneCode() {
  const timeZone = moment.tz.guess();
  if (timeZone == null || timeZone == "") {
    return DEFAULT_TIME_ZONE;
  }
  return timeZone;
}

export function getUserCurrentDateAsString(format: string) {
  return moment().tz(getUserTimeZoneCode()).format(format);
}

export function getUserTomorrowDateAsString(format: string) {
  return moment().tz(getUserTimeZoneCode()).add(1, "days").format(format);
}

export function converDateAsUTCWithFormat(
  data: string,
  sourceFormat: string,
  targetFormat: string
) {
  const date = moment.utc(data).format(sourceFormat);
  const stillUtc = moment.utc(date).toDate();
  const requestedDate = moment(stillUtc).local().format(targetFormat);
  return requestedDate;
}

export function convertDateTimeWithTimeZoneAndFormat(
  sourceDate: string,
  sourceTimeZone: string,
  targetTimeZone: string,
  sourceFormat: string,
  targetFormat: string
): string {
  if (!sourceDate) return "Invalid date";

  // Parse the date in the given source format and time zone
  const parsedDate = moment.tz(sourceDate, sourceFormat, sourceTimeZone);

  // Convert to the target time zone and format
  return parsedDate.tz(targetTimeZone).format(targetFormat);
}

export function convertDateStringToDateObj(dateStr : string) {
    return moment(dateStr, DATE_FORMAT_DD_MM_YYYY_HH_MM_A).toDate();
}

export function addDays(date: string, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDateForSubmission(date : string) {
    return moment(date).format("YYYY-MM-DD HH:mm");
}