import dayjs from "dayjs";

export function formatDate(
  date?: Date,
  format: string = "DD MMM, YYYY"
): string {
  if (!date) return "";
  return dayjs(date).format(format);
}


export function secondaryDateFormat(dateObject: Date | undefined) {
  if(!dateObject) return "";
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}

export function getReadableDateTime(dateString: string) {
  const date = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${month} ${day},${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
}
