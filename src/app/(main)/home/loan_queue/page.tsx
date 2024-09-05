import QueueList from "@/app/shared/admin/queue/QueueList";
import { metaObject } from "@/config/site.config";
import React from "react";

export const metadata = {
  ...metaObject("Loan Queue"),
};

const page = () => {
  return <QueueList />;
};

export default page;
