"use client";
import BoxHeader from "./BoxHeader";
import GaugeChart from "react-gauge-chart";
import { timeSectionOptions } from "@/constants/form-constants";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";

const ChartColor = ["#FF0036", "#702EC2", "#4771F1", "#55B685", "#E76F00"];
const calculateSatisfactionLevel = (ratingsObj: {
  [key: string]: number;
}): null | number => {
  let totalStars = 0;
  let totalPeople = 0;

  for (let stars in ratingsObj) {
    totalStars += parseInt(stars) * ratingsObj[stars];
    totalPeople += ratingsObj[stars];
  }

  const averageRating = totalStars / totalPeople;

  if (totalPeople === 0) return null;

  if (averageRating < 1.5) {
    return 0.1;
  } else if (averageRating < 2.5) {
    return 0.3;
  } else if (averageRating < 3.5) {
    return 0.5;
  } else if (averageRating < 4.5) {
    return 0.7;
  } else {
    return 0.9;
  }
};

const calculateRatingPercentage = (ratingsObj: {
  [key: string]: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}) => {
  let maxRatingVal = ratingsObj[1];

  Object.keys(ratingsObj).forEach((key) => {
    if (ratingsObj[key] > maxRatingVal) {
      maxRatingVal = ratingsObj[key];
    }
  });
};

const RatingBox = ({ queryStr }: { queryStr: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const ratingsData = useFetchData(
    [queryKeys.getRatingStats],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}${queryStr}/dashboard/rating-graph`,
    headers
  );

  if (ratingsData.isPending || ratingsData.isFetching) {
    return <></>;
  }

  const ratingsObj: {
    [key: string]: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  } = ratingsData.data.data;

  const satisfactionLevel = calculateSatisfactionLevel(ratingsObj);

  return (
    <article className="border border-[#D0D0D0] rounded-lg  pt-6 max-h-[60vh] overflow-hidden relative">
      <div className="px-4">
        <BoxHeader
          title="Customer Satisfaction"
          optionsList={timeSectionOptions}
        />
      </div>

      <section className="bg-[#F8F8F8] h-full ">
        <div className="bg-white h-[300px] max-h-[40vh] max-w-[600px] px-4 relative overflow-hidden">
          {satisfactionLevel ? (
            <GaugeChart
              id="gauge-chart1"
              nrOfLevels={5}
              percent={satisfactionLevel}
              colors={ChartColor}
              arcWidth={0.6}
              arcPadding={0.02}
              style={{ height: "100%" }}
              hideText={true}
              className="self-center pt-[1vh] max-h-[30px]"
            />
          ) : (
            <div className="pt-[15vh] text-xl flex justify-center items-center">
              <p>No ratings yet.</p>
            </div>
          )}
        </div>

        <section className="flex justify-evenly items-center w-full absolute bottom-6">
          <ChartKeys title="Very Dissatisfied" index={0} />
          <ChartKeys title="Dissatisfied" index={1} />
          <ChartKeys title="Neutral" index={2} />
          <ChartKeys title="Satisfied" index={3} />
          <ChartKeys title="Very Satisfied" index={4} />
        </section>
      </section>
    </article>
  );
};

const ChartKeys = ({ title, index }: { title: string; index: number }) => {
  return (
    <section className="flex items-center justify-between mt-8 gap-3">
      <div
        className={`w-2 h-2 bg-black rounded-full`}
        style={{
          backgroundColor: ChartColor[index],
        }}
      />
      <p className="">{title}</p>
    </section>
  );
};

export default RatingBox;
