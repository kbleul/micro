
// Helper function to extract error messages
const getErrorMessage = (err: any): string => {

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
