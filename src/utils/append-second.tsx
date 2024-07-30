export function appendDefaultSecond(time: string) {
    const parts = time.split(":");
  
    if (parts.length === 2) {
      // Time format: HH:MM, append ":00" for seconds
      return time + ":00";
    }
  
    // Time format already includes seconds
    return time;
  }