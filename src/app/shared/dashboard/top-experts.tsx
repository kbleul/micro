import cn from "@/utils/class-names";
import { Title, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ActionIcon } from "@/components/ui/action-icon";
import WidgetCard from "@/components/cards/widget-card";
import CircleProgressBar from "@/components/charts/circle-progressbar";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";

export default function TopExperts({ className }: { className?: string }) {
  return (
    <>
      <WidgetCard
        title={"Top Experts"}
        description={"67 % New Users this month"}
        rounded="lg"
        action={
          <ActionIcon variant="outline" rounded="full">
            <PiSlidersHorizontalDuotone className="h-auto w-5" />
          </ActionIcon>
        }
        descriptionClassName="text-gray-500 mt-1.5"
        className={cn(className)}
      >
        <div className="mt-5 grid w-full grid-cols-1 justify-around gap-6 @container @sm:py-2 @7xl:gap-8">
          <div className="text-center">
            <div className="mx-auto mb-5 mt-2 w-full max-w-[180px] sm:mb-7 xl:mb-8 2xl:mb-10 2xl:mt-4">
              <CircleProgressBar
                percentage={80}
                size={180}
                stroke="#f0f0f0"
                strokeWidth={12}
                progressColor={"#00BA63"}
                label={
                  <Text className="font-lexend text-xl font-bold text-gray-900 @xs:text-2xl">
                    65%
                  </Text>
                }
                strokeClassName="dark:stroke-gray-200"
              />
            </div>
          </div>

          <Button size="lg" color="primary">
            View Details
          </Button>
        </div>
      </WidgetCard>
    </>
  );
}
