import React from "react";
import StatCards from "./stat-cards";

const Dashboard = () => {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards className="col-span-full @2xl:grid-cols-3 @6xl:grid-cols-4" />
      </div>
    </div>
  );
};

export default Dashboard;
