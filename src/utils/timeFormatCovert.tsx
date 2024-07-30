export const convertTo24hFormat = (timeStr: string): string | null => {
  // Split the time string using destructuring
  const [hours, minutes, indicator] = timeStr.split(":");

  // Convert minutes and hours to integers
  const minutesInt = parseInt(minutes);
  const hoursInt = parseInt(hours);

  // Validate input format and handle AM/PM cases
  if (
    isNaN(minutesInt) ||
    isNaN(hoursInt) ||
    (indicator !== "PM" && indicator !== "AM")
  ) {
    return null; // Invalid input format
  }

  // Adjust hours for PM and midnight
  let adjustedHours = hoursInt;
  if (indicator === "PM" && adjustedHours !== 12) {
    adjustedHours += 12;
  } else if (indicator === "AM" && adjustedHours === 12) {
    adjustedHours = 0;
  }

  // Return formatted time string with leading zeros and seconds set to 00
  return `${adjustedHours.toString().padStart(2, "0")}:${minutesInt
    .toString()
    .padStart(2, "0")}:00`;
};
