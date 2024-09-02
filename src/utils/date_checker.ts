
//dateString = "DD-MM-YYYY"
const isFutureDate = (dateString: string ): boolean => {


    const [day, month, year] = dateString.split("-").map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    return inputDate > today;
  };
  
  const isAbove18YearsOld = (dateString: string): boolean => {
    const [day, month, year] = dateString.split("-").map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - inputDate.getFullYear();
    const monthDifference = today.getMonth() - inputDate.getMonth();
    const dayDifference = today.getDate() - inputDate.getDate();
  
    if (age > 18) {
      return true;
    } else if (age === 18) {
      if (monthDifference > 0) {
        return true;
      } else if (monthDifference === 0 && dayDifference >= 0) {
        return true;
      }
    }
    return false;
  };
  
  export const validateDate = (dateString: string): { isFuture: boolean; isAbove18: boolean } => {
   
    return {
      isFuture: isFutureDate(dateString),
      isAbove18: isAbove18YearsOld(dateString),
    };
  };