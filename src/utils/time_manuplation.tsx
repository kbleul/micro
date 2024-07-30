import moment from "moment";

export const convertDateTimeFormate = (dateTime: string) => {
  const dateTimeString = dateTime;
  const formattedDateTime = moment(dateTimeString).format(
    "hh:mm A, DD/MM/YYYY"
  );

  return formattedDateTime;
};

// export const hasValidGap = (
//   slots: string[],
//   newStart: string,
//   newEnd: string
// ) => {
//   /*
//   Checks if the new time slot has a valid 15-minute gap from existing slots.

//   Args:
//       slots: Array of existing time slots in the format "HH:MM:SS - HH:MM:SS".
//       newStart: Start time of the new slot in the format "HH:MM:SS".
//       newEnd: End time of the new slot in the format "HH:MM:SS".

//   Returns:
//       True if the new slot has a valid gap, False otherwise.

// */

//   // Convert time strings to Date objects for easier manipulation
//   const newStartTime: any = new Date(`1970-01-01T${newStart}:00`);
//   const newEndTime: any = new Date(`1970-01-01T${newEnd}:00`);

//   for (const slot of slots) {
//     const [startStr, endStr] = slot.split(" - ");
//     const startTime: any = new Date(`1970-01-01T${startStr}:00`);
//     const endTime: any = new Date(`1970-01-01T${endStr}:00`);

//     // Check for overlap or gap less than 15 minutes
//     if (
//       (newStartTime <= endTime && newEndTime >= startTime) ||
//       newStartTime - endTime < 15 * 60 * 1000 ||
//       startTime - newEndTime < 15 * 60 * 1000
//     ) {
//       return false;
//     }
//   }

//   return true;
// };

export const isValidTimeStatus = {
  ALLOWED: {
    status: "ALLOWED",
    msg: "This slot is available",
  },
  TAKEN: {
    status: "TAKEN",
    msg: "This slot is already filled.",
  },
  NOGAP: {
    status: "NOGAP",
    msg: "Time slots need to have atleast 15 min gap with the existing slots.",
  },
};

export const isValidTime = (slots: string[], newSlot: string) => {
  if (slots.length === 0) return isValidTimeStatus.ALLOWED;
  // Split the time slots into individual start and end times
  const times = slots.flatMap((slot) => slot.split(" - "));

  // Convert the times to minutes since midnight
  const timesInMinutes = times.map((time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + seconds / 60;
  });

  // Convert the new slot start and end times to minutes since midnight
  const [newSlotStart, newSlotEnd] = newSlot.split(" - ").map((time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + seconds / 60;
  });

  //check if new starting time and end time fall within already taken time slots
  const isBettweenTimeSlots = timesInMinutes.every((time, index) => {
    if (index % 2 !== 0) {
      return true;
    }

    if (
      (time <= newSlotStart && timesInMinutes[index + 1] >= newSlotStart) ||
      (time <= newSlotEnd && timesInMinutes[index + 1] >= newSlotEnd)
    ) {
      return false;
    }
    return true;
  });

  if (!isBettweenTimeSlots) {
    return isValidTimeStatus.TAKEN;
  }
  // Check if the new slot has a 15-minute gap from the closest neighboring time slots
  const hasGap = timesInMinutes.every((time) => {
    const diffStart = Math.abs(time - newSlotStart);
    const diffEnd = Math.abs(time - newSlotEnd);
    return diffStart >= 15 && diffEnd >= 15;
  });

  return hasGap ? isValidTimeStatus.ALLOWED : isValidTimeStatus.NOGAP;
};

export const addHour = (timeString: string, addValue: number) => {
  const timeDate = new Date(`2000-01-01T${timeString}:00`);

  // Add 1 hour to the time
  timeDate.setHours(timeDate.getHours() + addValue);

  // Format the updated time as "HH:mm"
  const newTime = timeDate.toTimeString().slice(0, 5);

  return newTime;
};
