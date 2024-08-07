import React from "react";
import StatCards from "./stat-cards";
import LeedsBox from "./LeedsBox";
import TopSalesBox from "./TopSalesBox";
import TopProductsBox from "./TopProductsBox";
import RatingBox from "./RatingBox";

const Dashboard = () => {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards className="col-span-full @2xl:grid-cols-3 @6xl:grid-cols-4" />
      </div>


      <article className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-8 w-full items-stretch mt-10">
        <LeedsBox queryStr="" />
        <TopSalesBox queryStr="" />
        <TopProductsBox queryStr="" />
        <RatingBox queryStr="" />
        
      </article>
    </div>
  );
};

export default Dashboard;
