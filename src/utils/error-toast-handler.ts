export const handleErrorWithToast = (err: any, toast: any) => {
    console.log("9999999999999999999-----------------",err?.response?.data?.error )

  if (err?.response?.data?.error) {
    console.log("111111111111111111111111")

    if (typeof err.response?.data?.error === "string") {
        console.log("2222222222222222222222")

      toast.error(err?.response?.data?.error);
    } else if (err?.response?.data?.error?.details) {
        console.log("33333333333333333333")
      const details = err?.response?.data?.error?.details ?? [];
      let msg = "";

      details.forEach((detail: any) => {
        if (detail?.message) {
          msg +=   detail.message + ", ";
        }
      });

      toast.error(msg);
    }
  }
};
