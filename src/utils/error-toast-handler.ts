export const handleErrorWithToast = (err: any, toast: any) => {
  if (err?.response?.data?.data?.error) {
    if (typeof err.response?.data?.data?.error === "string") {
      toast.error(err?.response?.data?.data?.error);
    } else if (err?.response?.data?.data?.error?.message?.details) {
      const details = err?.response?.data?.data?.details ?? [];
      let msg = "";

      details.forEach((detail: any) => {
        if (detail?.message) {
          msg +=  " , "+ detail.message;
        }
      });

      toast.error(msg);
    }
  }
};
