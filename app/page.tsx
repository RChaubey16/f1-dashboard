import StatsCard from "@/components/StatsCard";
import GrandPrixCard from "@/components/GrandPrixCard";
import StandingsTable from "@/components/StandingsTable";
import Tabs from "@/components/TabComponent";
import {
  getConstructorChampion,
  getLastFastestLap,
  getWorldChampion,
} from "@/utils/helpers";

export default async function Home() {
  const tabItems = [
    { label: "Constructors", content: <StandingsTable /> },
    { label: "Drivers", content: <StandingsTable /> },
  ];

  const leadingConstructor = await getConstructorChampion(2025);
  const leadingDriver = await getWorldChampion(2025);
  const fastestLap = await getLastFastestLap(2025);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 ">
        <StatsCard
          cardLabel="Leading Constructor"
          cardTitle={leadingConstructor.team}
          points={leadingConstructor.points}
          logo={leadingConstructor.logo ?? ""}
          logoType={leadingConstructor.logoType}
        />
        <StatsCard
          cardLabel="Leading Driver"
          cardTitle={leadingDriver.driver}
          points={leadingDriver.points}
          logo={leadingDriver.avatar}
          logoType={leadingDriver.logoType}
        />
        <StatsCard
          cardLabel="Last Fastest Lap"
          cardTitle={fastestLap.driver}
          points={fastestLap.time}
          logo={fastestLap.avatar}
          logoType={leadingDriver.logoType}
        />
      </div>

      <div className="w-[665px]">
        <GrandPrixCard
          gpName="Austrian Grand Prix"
          gpDate="May 26, 2025"
          gpTime="5 days, 12 hours"
        />
        <Tabs tabs={tabItems} />
      </div>
    </>
  );
}
