// export const handleErrorWithToast = (err: any, toast: any) => {

//   if (err?.response?.data?.error) {

//     if (typeof err.response?.data?.error === "string") {

//       toast.error(err?.response?.data?.error);
//     } else if (err?.response?.data?.error?.details) {

//       if (err?.response?.data?.error?.details?.message) {
//         toast.error(err?.response?.data?.error?.details?.message);
//         return
//       }
//       const details = err?.response?.data?.error?.details ?? [];
//       let msg = "";

//       details.forEach((detail: any) => {
//         if (detail?.message) {
//           msg += detail.message + ", ";
//         }
//       });

//       toast.error(msg);
//     }
//   }
// };

// Helper function to extract error messages
const getErrorMessage = (err: any): string => {
  console.log(err?.response?.data?.message);

  if (err?.response?.data?.message) {
    return err?.response?.data?.message;
  }

  if (!err?.response?.data?.error) {
    return "An unknown error occurred";
  }

  const error = err.response.data.error;

  if (typeof error === "string") {
    return error;
  }

  if (error.details?.message) {
    return error.details.message;
  }

  if (Array.isArray(error.details)) {
    return error.details
      .map((detail: any) => detail?.message)
      .filter(Boolean)
      .join(", ");
  }

  return "An unknown error occurred";
};

// Main function to handle errors and display toast notifications
export const handleErrorWithToast = (err: any, toast: any) => {
  const errorMessage = getErrorMessage(err);
  toast.error(errorMessage);
};
